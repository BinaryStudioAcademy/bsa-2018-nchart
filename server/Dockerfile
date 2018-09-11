FROM node:10.8.0

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

RUN npm i -g pm2 \
    && npm i

EXPOSE 9000

CMD ["pm2", "start", "bin/www"]