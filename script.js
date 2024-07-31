import { config } from "dotenv"
config()


//if you want to use the modules inside node, you have to set type as module
//dotenv package loads the environment variables from a .env file to process.env file
import { OpenAI } from "openai";
import readline from "readline";

//to check if API key works
// console.log(process.env.API_KEY)

// Create an instance of OpenAI with the API key
const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function main() {
    const userInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      //to suppress deprecation warning 
      process.noDeprecation = true;

   // Ask the user for input
    userInterface.question('Please enter your prompt:' , async (input) => {
        try {
            const completion = await openai.chat.completions.create({
                messages: [{ role: "user", content: input }],
                model: "gpt-4o-mini",
                max_tokens:5,
              });
              console.log(completion.choices[0].message.content.trim());
        } catch (error) {
            if(error.response) {
                console.error('Error with OpenAI API:', error.response.data);
            } else {
                console.error('Error', error.message);
            }
        } finally {
            userInterface.close();
        }
    });

}

// If the user quota is completely used, here is a fallback mechanism
// if (error.response) {
//     if (error.response.status === 429) {
//         console.error('You have exceeded your current quota. Please check your plan and billing details.');
//     } else {
//         console.error('Error with OpenAI API:', error.response.data);
//     }
// } else {
//     console.error('Error', error.message);
// }





main();