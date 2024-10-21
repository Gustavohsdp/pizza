#!/bin/sh

./wait-for-it.sh mysql:3306 --timeout=30 -- npx prisma db seed

npm run start:prod
