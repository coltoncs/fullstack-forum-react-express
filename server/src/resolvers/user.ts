import { User } from '../entities/User';
import { MyContext } from 'src/types';
import { Resolver, Arg, Ctx, Field, Mutation, ObjectType, Query, FieldResolver, Root } from 'type-graphql';
import argon2 from 'argon2';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';
import { getConnection } from 'typeorm';

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]

  @Field(() => User, {nullable: true})
  user?: User
}

@Resolver(User)
export class UserResolver {
  @FieldResolver(() => String)
  email(@Root() user: User, @Ctx() { req }: MyContext) {
    if (req.session.userId === user.id) {
      return user.email;
    }

    return '';
  }

  // Provided a forgot-password token, allow the autenticated
  // user to change their password. Token is returned from the
  // forgotPassword mutation below.
  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('newPassword') newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    if (newPassword.length <= 2) {
      return { 
        errors: [
          {
            field: 'newPassword',
            message: 'length must be greater than 2'
          }
        ]
      };
    }

    const key = FORGET_PASSWORD_PREFIX+token;
    const userId = await redis.get(key);
    if (!userId) {
      return { 
        errors: [
          {
            field: 'token',
            message: 'token expired'
          }
        ]
      };
    };

    const userIdNum = parseInt(userId);
    const user = await User.findOne(userIdNum)
    if (!user) {
      return { 
        errors: [
          {
            field: 'token',
            message: 'user no longer exists'
          }
        ]
      };
    };

    await User.update(
      { 
        id: userIdNum, 
      }, 
      {
        password: await argon2.hash(newPassword),
      }
    );

    await redis.del(key);

    // log user in after change password
    req.session.userId = user.id;

    return { user };
  }

  // Initiates a forgot-password flow where the server
  // invalidates the users password and sends an email
  // for the user to reset the password (see 
  // changePassword mutation above)
  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis } : MyContext
  ) {
    const user = await User.findOne({where: { email }})
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    );
    
    sendEmail(
      email, 
      `<a href="${process.env.CORS_ORIGIN}/change-password/${token}">reset password</a>`
    );
    return true;
  }

  // Query the currently authenticated user (if there is one)
  @Query(() => User, {nullable: true})
  me(
    @Ctx() { req }: MyContext
  ) {
    if (!req.session.userId) {
      console.log('uh oh!')
      return null
    }

    return User.findOne({where: { id: req.session.userId }});
  }

  // Query list of all users on the forum
  @Query(() => [User])
  users() {
    return User.find({});
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(User)
      .values({
        username: options.username,
        email: options.email,
        password: hashedPassword,
      })
      .returning("*")
      .execute();
      user = result.raw[0];
    } catch(err) {
      if (err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: 'username',
              message: 'username already taken'
            }
          ]
        }
      }
    }

    req.session!.userId = user.id;

    return { user };
  }

  // Attempt to authenticate with the provided username (or email)
  // and password provided to the server. Verifies password with argon2.
  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@') ? {where: { email: usernameOrEmail }} : {where: { username: usernameOrEmail }}
    )
    if (!user) {
      return {
        errors: [{
          field: 'usernameOrEmail',
          message: 'username does not exist',
        }],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [{
          field: 'password',
          message: 'incorrect password',
        }],
      };
    }

    req.session!.userId = user.id;

    return {
      user
    };
  }

  // Attempts to logout the currently authenticated user
  @Mutation(() => Boolean)
  logout(
    @Ctx() { req, res }: MyContext
  ) {
    return new Promise(resolve => req.session.destroy(err => {
      if (err) {
        console.log(err);
        resolve(false);
        return;
      }

      res.clearCookie(COOKIE_NAME);
      resolve(true);
    }));
  }
}