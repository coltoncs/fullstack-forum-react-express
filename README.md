# The Community Forum
An online forum built with React.js, Express.js, and GraphQL. Client-side caching with URQL and server-side GraphQL API with Apollo.

## Features
- React + Chakra frontend
- Express + PostgreSQL + Redis backend
- Apollo for the GraphQL server
- Type-GraphQL for API resolvers
- Full stack written in TypeScript
- Formik for forms and validation
- URQL for client-side caching

## System Dependencies
- PostgreSQL v14
- Redis v6.0.16

To get the application working for your machine, you'll have to download the above servers and get them up and running locally. Start with PostgreSQL. Once Postgres is downloaded, be sure to set the password for user `postgres` to `postgres` in order for the site to authenticate properly (see `server/src/index.ts`'s `createConnection` for more information).

To get Redis working on Windows machines, you'll need to get WSL up and running with an Ubuntu instance that has Redis downloaded on it. Running the WSL instance and instantiating the redis server with `redis-server` will get this going on your Windows machines. Installing Redis on Ubuntu natively is much more straightforward. 
- Windows 10: https://ubuntu.com/tutorials/install-ubuntu-on-wsl2-on-windows-10#1-overview and https://redis.com/blog/redis-on-windows-10/
- Ubuntu 22: https://computingforgeeks.com/how-to-install-redis-on-ubuntu/
- MacOS: https://redis.io/docs/getting-started/installation/install-redis-on-mac-os/


## Get Started / Development
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

## Deployment
Deployment is broken out into two steps. The server is deployed to a Digital Ocean droplet running Ubuntu 20.04 with Dokku installed. The frontend is deployed to a Vercel instance and configured with a custom domain.

Deploying the backend will require a running Docker daemon.
- Windows 10: https://docs.docker.com/desktop/windows/install/
- Ubuntu 22: https://docs.docker.com/desktop/linux/install/ubuntu/
- MacOS: https://docs.docker.com/desktop/mac/install/

Configure the DigitalOcean droplet: https://marketplace.digitalocean.com/apps/dokku

### Deploy the Backend
1. `cd server` and customize the `.env.production` file for your domain
2. Configure the `deploy.sh` file to fit your Docker Hub username/repository, add your DigitalOcean droplet username & IP here as well
3. Before deploying, run `docker login` to login to your Docker Hub account
4. `chmod -x ./deploy.sh` for Linux/MacOS or in an Ubuntu WSL2 environment (Windows)
5. Deploy to the server outlined in `deploy.sh` with `./deploy`

## Deploy the Frontend
1. Install Vercel `npm i -g vercel`
2. `cd frontend && vercel login` (Only if you haven't logged into Vercel through the CLI, yet)
3. `vercel --prod` to deploy to a Vercel instance