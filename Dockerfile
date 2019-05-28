FROM node:10


#RUN npm install

RUN npm -v
RUN node -v

RUN npm install -g create-react-app

RUN npm install -g firebase-tools 

RUN npm install -g gulp 

RUN npm install -g sw-precache

