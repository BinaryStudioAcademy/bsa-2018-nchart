FROM node:10.8.0

ENV APP_ROOT /app

RUN mkdir $APP_ROOT
WORKDIR $APP_ROOT

COPY ./* $APP_ROOT/
COPY client $APP_ROOT/client
WORKDIR $APP_ROOT/client

RUN npm i -g @angular/cli \
    && npm i -g typescript \
    && npm i \
    && npm run build

WORKDIR $APP_ROOT

COPY ./client/dist $APP_ROOT/client/dist

RUN npm i

EXPOSE $PORT

CMD ["node", "bin/www"]