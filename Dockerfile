FROM node:15
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
RUN npm install yarn
RUN yarn
COPY . .
EXPOSE 3000
CMD [ "yarn" , "test" ]