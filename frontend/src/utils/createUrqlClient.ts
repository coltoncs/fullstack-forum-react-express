import { dedupExchange, Exchange, fetchExchange } from "urql";
import { DeletePostMutationVariables, LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation, VoteMutationVariables } from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import { cacheExchange, Resolver } from '@urql/exchange-graphcache';
import { stringifyVariables } from '@urql/core';
import { pipe, tap } from 'wonka';
import Router from "next/router";
import gql from 'graphql-tag';
import { isServer } from "./isServer";

type MergeMode = 'before' | 'after';

export const errorExchange: Exchange = ({ forward }) => ops$ => {
  return pipe(
    forward(ops$),
    tap(({error}) => {
      if (error?.message.includes('not authenticated')) {
        Router.replace('/')
      }
    })
  );
};

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter(info => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const isCached = cache.resolve(entityKey, `${fieldName}(${stringifyVariables(fieldArgs)})`)
    info.partial = !isCached;

    let results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach(fi => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string; 
      const data = cache.resolve(key, 'posts') as string[];
      const _hasMore = cache.resolve(key, 'hasMore');
      if (!_hasMore) hasMore = _hasMore as boolean;
      results.push(...data);
    })

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results
    };
  }
};

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = '';
  
  if (isServer()){
    cookie = ctx?.req?.headers?.userId;
  }

  return {
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie ? {
        cookie,
      } : undefined
    },
    exchanges: [
      dedupExchange, 
      cacheExchange(
        {
          keys: {
            PaginatedPosts: () => null,  
          },
          resolvers: {
            Query: {
              posts: cursorPagination(),
            }
          },
          updates: {
            Mutation: {
              deletePost: (result, args, cache, info) => {
                cache.invalidate({
                  __typename: "Post", 
                  id: (args as DeletePostMutationVariables).id
                });
              },
              vote: (result, args, cache, info) => {
                const {postId, value} = args as VoteMutationVariables;
                const data = cache.readFragment(
                  gql`
                    fragment _ on Post {
                      id
                      points
                      voteStatus
                    }
                  `,
                  { id: postId } as any
                );

                if (data) {
                  if (data.voteStatus === value) {
                    return;
                  }
                  const newPoints = (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
                  cache.writeFragment(
                    gql`
                      fragment __ on Post {
                        points
                        voteStatus
                      }
                    `,
                    { id: postId, points: newPoints, voteStatus: value }
                  )
                }
              },
              
              createPost: (result, args, cache, info) => {
                const allFields = cache.inspectFields('Query');
                const fieldInfos = allFields.filter(info => info.fieldName === 'posts');
                fieldInfos.forEach(fi => {
                  cache.invalidate('Query', 'posts', fi.arguments || {})
                })
              },

              logout: (result, args, cache, info) => {
                betterUpdateQuery<LogoutMutation, MeQuery>(
                  cache,
                  { query: MeDocument },
                  result,
                  () => ({ me: null })
                )
              },

              login: (result, args, cache, info) => {
                betterUpdateQuery<LoginMutation, MeQuery>(
                  cache, 
                  {query: MeDocument}, 
                  result,
                  (res, query) => {
                    if (res.login.errors) {
                      return query
                    } else {
                      return {
                        me: res.login.user
                      }
                    }
                  }
                )
              },

              register: (result, args, cache, info) => {
                betterUpdateQuery<RegisterMutation, MeQuery>(
                  cache, 
                  {query: MeDocument}, 
                  result,
                  (res, query) => {
                    if (res.register.errors) {
                      return query
                    } else {
                      return {
                        me: res.register.user
                      }
                    }
                  }
                )
              }
            }
          }
        }
      ), 
      errorExchange,
      ssrExchange,
      fetchExchange
    ]
  }
}
