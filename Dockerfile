#############################################################################################
##                                          BUILD                                          ##
#############################################################################################
FROM node:16-alpine as build

WORKDIR /app

# COPY APPLICATION FILES
COPY package.json ./
COPY . ./

# INSTALL DEPENDENCIES
RUN yarn install --ignore-engines

# BUILD APPLICATION
RUN yarn build --mode production

#############################################################################################
##                                         DEPOLOY                                         ##
#############################################################################################
FROM nginx:1.21.6 as deploy

# SETUP NGINX CONFIG
COPY ./docker/config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

# CLEAR NGINX
RUN rm -rf ./*

# COPY APPLICATION TO NGINX
COPY --from=build /app/dist .

# RUN NGINX
ENTRYPOINT ["nginx", "-g", "daemon off;"]