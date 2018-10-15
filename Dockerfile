#
# build:
#   docker build --force-rm -t ary-user-api .
# run:
#   docker run --rm --env-file=./.env -it -p 3456:3456 --name ary-user ary-user-api
#

### BASE
FROM node:8.12.0-alpine AS base
LABEL maintainer "songlairui"
# Set the working directory
WORKDIR /app
# Copy project specification and dependencies lock files
COPY package.json yarn.lock ./

### RELEASE
FROM base AS release
# Copy production dependencies
RUN yarn --production && mkdir /agent
# Install Node.js dependencies (only production)
COPY . .
# Run
CMD ["node", "app"]