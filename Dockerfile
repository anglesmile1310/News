FROM node:12.13
ENV DB_USER=''
ENV DB='users'
ENV DB_PASS=''
ENV DB_REPLS=''
ENV DB_SERVERS='192.168.1.13'
# ENV DB_SERVERS='172.17.0.1'
# Create app directory
WORKDIR .
# Bundle app src
COPY . .
# Install app dependencies
RUN npm install
EXPOSE 3001
CMD [ "npm", "start" ]