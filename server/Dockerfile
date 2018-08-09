FROM node:10.8.0

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

RUN npm i -g nodemon \
    && npm i

EXPOSE 9000

CMD ["nodemon", "bin/www"]