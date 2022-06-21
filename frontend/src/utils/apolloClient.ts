import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { PaginatedPosts } from "../generated/graphql";
import { setContext } from '@apollo/client/link/context';

const httpLink: HttpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL as string, // Server URL (must be absolute)
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`
})

const authLink = setContext((request, { headers }) => {
  const cookieHeader = (typeof window === "undefined" ? request.context?.cookie : undefined) || "";
  return {
    headers: {
      ...headers,
      cookie: cookieHeader,
    }
  }
});

const memCache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        posts: {
          keyArgs: [],
          merge(
            existing: PaginatedPosts | undefined,
            incoming: PaginatedPosts
          ): PaginatedPosts {
            return {
              ...incoming,
              posts: [...(existing?.posts || []), ...incoming.posts],
            };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  ssrMode: true,
  link: authLink.concat(httpLink),
  cache: memCache,
});