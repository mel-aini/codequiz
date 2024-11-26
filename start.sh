#!/usr/bin/env bash

npm i

npm run build

npm run db:migrate

npm run seed

npm run start
