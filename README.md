# The Community Forum
An online forum built with React.js, Express.js, and GraphQL. Client-side caching with URQL and server-side GraphQL API with Apollo.

## Features
- React + Chakra frontend
- Express + GraphQL + TypeORM backend
- Apollo for the GraphQL server
- Type-GraphQL for API resolvers
- Full stack written in TypeScript
- Formik for forms and validation
- URQL for client-side caching

## System Dependencies
- PostgreSQL v14
- Redis v6.0.16

I've been developing this application on two different machines, a host Windows 10 machine and a guest Ubuntu 22.04 machine. In order to get the application working for your machine, you'll have to download the above servers and get them up and running locally. Once Postgres is downloaded, be sure to set the password for user `postgres` to `postgres` in order for the site to authenticate properly (see `server/src/index.ts`'s `createConnection` for more information).

On Windows machines, you'll need to get WSL up and running with an Ubuntu instance that has Redis downloaded on it. Running the WSL instance and instantiating the redis server with `redis-server` will get this going on your Windows machines. Installing Redis on Ubuntu natively is much more straightforward. 
- Windows 10: https://redis.com/blog/redis-on-windows-10/
- Ubuntu 22: https://computingforgeeks.com/how-to-install-redis-on-ubuntu/


## Get Started
1. Clone repo to local filesystem
2. `cd frontend && yarn install`
3. `cd ../server && yarn install`
4. Ensure redis-server and Postgres servers are both running
4. Open three terminals of your choice in the root directory
5. Terminal 1: `cd frontend && yarn dev`
6. Terminal 2: `cd server && yarn watch`
7. Terminal 3: `cd server && yarn dev`
8. Visit http://localhost:3000 for frontend
9. Visit http://localhost:4000/graphql for backend playground
10. On frontend, create a new user using the Register page
11. In `server/src/index.ts` uncomment line 29 to load database with test posts (requires a user with id=1 to be present, see step 10)