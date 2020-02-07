docker build --rm -f Dockerfile -t news-user .
# docker run --name news-user -l=apiRouter='/api/v1/user' -p 3001:3001 --env-file ./.env -d news-user
docker run -l=apiRouter='/api/v1/user' -d --restart=always -p 3002:3001 news-user
# docker run --name news-user -l=apiRouter='/api/v1/user' -p 3001:3001 -d news-user