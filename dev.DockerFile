FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd ./angular
RUN npm install -g @angular/cli 
RUN npm install
RUN cd ../
EXPOSE 3000
CMD ["npm", "run", "dev"]