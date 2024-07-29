import { config } from "dotenv"
config()
//if you want to use the modules inside node, you have to set type as module
//dotenv package loads the environment variables from a .env file to process.env file

console.log(process.env.API_KEY)