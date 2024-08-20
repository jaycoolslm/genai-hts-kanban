# genai-hts-kanban

## local set up

### Kanban 3.0 Fullstack app

`cd planka-hcs`

update env vars in line 86 - 88

NOTE: currently the app has testnet private keys in the client side. THIS IS NOT SAFE and is known - the risk has been flagged up in our deck with a respective mitigation. Any production application following this hackathon would of course not be configured as such

`docker compose -f docker-compose-dev.yml up` (this may take a while!)

### HCS Listener

open new terminal

`cd hcs-listener`

create .env file from example - add your own keys and topic id (the topic id MUST match the topic id in the planka-hcs env file

`npm i`

`node .`

### NestJS GenAI Microservice

open new terminal

`cd nest-ai-microservice`

create .env file from example - add your own OpenAI API key

`pnpm i`

`pnpm run start:dev`

### Test app

Head over to http://localhost:3000 (it may take a while to load in first time)

## 'Prod' use

head over to https://kanban3.xyz

email: demo@demo.demo

pw: demo
