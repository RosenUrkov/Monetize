FROM node

WORKDIR "/app"

COPY ./package.json ./
RUN npm install --legacy-peer-deps

RUN npm run prebuild
RUN npm run build

ADD ./dist ./dist

CMD ["npm", "run", "start:prod"]