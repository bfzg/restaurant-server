FROM node:18.16.1

RUN yarn install

EXPOSE 8008

CMD ["yarn","start"]