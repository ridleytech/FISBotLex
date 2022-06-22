/* This example shows how to create an intent for ordering pizzas. */

//import { lexClient } from "./libs/lex.js";
import * as AWS from "@aws-sdk/client-lex-model-building-service";
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

const REGION = "us-west-2";
const IDENTITY_POOL_ID = "us-west-2:9b983de2-c098-41ff-a7ef-ec4facd24e5a"; // An Amazon Cognito Identity Pool ID.

const client = new AWS.LexModelBuildingService({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

var botName = "APITest";

const updateBot = () => {
  var intents = [
    {
      intentName: "BookCar",
      intentVersion: "$LATEST",
    },
    {
      intentName: "BookHotel",
      intentVersion: "$LATEST",
    },
    {
      intentName: "HowToCreate",
      intentVersion: "$LATEST",
    },
  ];

  var params = {
    name: botName,
    version: "$LATEST",
    abortStatement: {
      messages: [
        {
          content: "Sorry, I am not able to assist at this time",
          contentType: "PlainText",
        },
      ],
    },
    checksum: "708582a4-c5d3-4e3f-aad6-8250a8c2867f",
    childDirected: false,
    clarificationPrompt: {
      maxAttempts: 2,
      messages: [
        {
          content: "Sorry, what can I help you with?",
          contentType: "PlainText",
        },
      ],
    },
    description: "Test updating bot from node.",
    detectSentiment: true,
    enableModelImprovements: true,
    idleSessionTTLInSeconds: 600,
    intents: intents,
    locale: "en-US",
    voiceId: "Salli",
  };

  client
    .putBot(params)
    .then((data) => {
      console.log("putBot data: " + JSON.stringify(data)); // successful response
    })
    .catch((error) => {
      console.log("putBot error: ", error.stack);
    });

  /*
        data = {
          version: "$LATEST", 
          name: "DocOrderPizzaBot", 
          abortStatement: {
          messages: [
              {
            content: "I don't understand. Can you try again?", 
            contentType: "PlainText"
            }, 
              {
            content: "I'm sorry, I don't understand.", 
            contentType: "PlainText"
            }
          ]
          }, 
          checksum: "20172ee3-fa06-49b2-bbc5-667c090303e9", 
          childDirected: true, 
          clarificationPrompt: {
          maxAttempts: 1, 
          messages: [
              {
            content: "I'm sorry, I didn't hear that. Can you repeate what you just said?", 
            contentType: "PlainText"
            }, 
              {
            content: "Can you say that again?", 
            contentType: "PlainText"
            }
          ]
          }, 
          createdDate: <Date Representation>, 
          description: "Orders a pizza from a local pizzeria.", 
          idleSessionTTLInSeconds: 300, 
          intents: [
            {
            intentName: "DocOrderPizza", 
            intentVersion: "$LATEST"
          }
          ], 
          lastUpdatedDate: <Date Representation>, 
          locale: "en-US", 
          status: "NOT_BUILT"
        }
        */
};

const getBot = (_botName) => {
  botName = _botName;

  var params = {
    name: botName,
    versionOrAlias: "$LATEST",
  };

  client
    .getBot(params)
    .then((data) => {
      console.log("getBot data: " + JSON.stringify(data)); // successful response

      //   var response = {
      //     $metadata: {
      //       httpStatusCode: 200,
      //       requestId: "632dcaed-42f0-4f60-830f-9aa1afdda0c8",
      //       attempts: 1,
      //       totalRetryDelay: 0,
      //     },
      //     abortStatement: {
      //       messages: [
      //         {
      //           content: "Sorry, I am not able to assist at this time",
      //           contentType: "PlainText",
      //         },
      //       ],
      //     },
      //     checksum: "778b632a-d585-49a9-8017-e18b5c83a156",
      //     childDirected: false,
      //     clarificationPrompt: {
      //       maxAttempts: 2,
      //       messages: [
      //         {
      //           content: "Sorry, what can I help you with?",
      //           contentType: "PlainText",
      //         },
      //       ],
      //     },
      //     createdDate: "2022-06-21T19:41:50.157Z",
      //     description: "Test updating bot from node.",
      //     detectSentiment: true,
      //     enableModelImprovements: true,
      //     idleSessionTTLInSeconds: 600,
      //     intents: [
      //       { intentName: "BookCar", intentVersion: "$LATEST" },
      //       { intentName: "HowToCreate", intentVersion: "$LATEST" },
      //       { intentName: "BookHotel", intentVersion: "$LATEST" },
      //     ],
      //     lastUpdatedDate: "2022-06-21T20:27:27.475Z",
      //     locale: "en-US",
      //     name: "APITest",
      //     status: "READY",
      //     version: "$LATEST",
      //   };
    })
    .catch((error) => {
      console.log("getBot error: ", error.stack);
    });
};

//updateBot();
getBot("APITest");
