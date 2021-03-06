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

const putIntent = () => {
  var params = {
    botName: "FISBotTest",
    botAlias: "FISBOTnode",
    name: "DocOrderPizza",
    conclusionStatement: {
      messages: [
        {
          content:
            "All right, I ordered  you a {Crust} crust {Type} pizza with {Sauce} sauce.",
          contentType: "PlainText",
        },
        {
          content:
            "OK, your {Crust} crust {Type} pizza with {Sauce} sauce is on the way.",
          contentType: "PlainText",
        },
      ],
      responseCard: "foo",
    },
    confirmationPrompt: {
      maxAttempts: 1,
      messages: [
        {
          content:
            "Should I order  your {Crust} crust {Type} pizza with {Sauce} sauce?",
          contentType: "PlainText",
        },
      ],
    },
    description: "Order a pizza from a local pizzeria.",
    fulfillmentActivity: {
      type: "ReturnIntent",
    },
    rejectionStatement: {
      messages: [
        {
          content: "Ok, I'll cancel your order.",
          contentType: "PlainText",
        },
        {
          content: "I cancelled your order.",
          contentType: "PlainText",
        },
      ],
    },
    sampleUtterances: [
      "Order me a pizza.",
      "Order me a {Type} pizza.",
      "I want a {Crust} crust {Type} pizza",
      "I want a {Crust} crust {Type} pizza with {Sauce} sauce.",
    ],
    slots: [
      {
        name: "Type",
        description: "The type of pizza to order.",
        priority: 1,
        sampleUtterances: [
          "Get me a {Type} pizza.",
          "A {Type} pizza please.",
          "I'd like a {Type} pizza.",
        ],
        slotConstraint: "Required",
        slotType: "AMAZON.Food",
        //slotTypeVersion: "$LATEST",
        valueElicitationPrompt: {
          maxAttempts: 1,
          messages: [
            {
              content: "What type of pizza would you like?",
              contentType: "PlainText",
            },
            {
              content: "Vegie or cheese pizza?",
              contentType: "PlainText",
            },
            {
              content: "I can get you a vegie or a cheese pizza.",
              contentType: "PlainText",
            },
          ],
        },
      },
      {
        name: "Crust",
        description: "The type of pizza crust to order.",
        priority: 2,
        sampleUtterances: [
          "Make it a {Crust} crust.",
          "I'd like a {Crust} crust.",
        ],
        slotConstraint: "Required",
        slotType: "AMAZON.Food",
        //slotTypeVersion: "$LATEST",
        valueElicitationPrompt: {
          maxAttempts: 1,
          messages: [
            {
              content: "What type of crust would you like?",
              contentType: "PlainText",
            },
            {
              content: "Thick or thin crust?",
              contentType: "PlainText",
            },
          ],
        },
      },
      {
        name: "Sauce",
        description: "The type of sauce to use on the pizza.",
        priority: 3,
        sampleUtterances: ["Make it {Sauce} sauce.", "I'd like {Sauce} sauce."],
        slotConstraint: "Required",
        slotType: "AMAZON.Food",
        //slotTypeVersion: "$LATEST",
        valueElicitationPrompt: {
          maxAttempts: 1,
          messages: [
            {
              content: "White or red sauce?",
              contentType: "PlainText",
            },
            {
              content: "Garlic or tomato sauce?",
              contentType: "PlainText",
            },
          ],
        },
      },
    ],
  };

  client
    .putIntent(params)
    .then((data) => {
      console.log("data: " + JSON.stringify(data)); // successful response
    })
    .catch((error) => {
      console.log("error: ", error.stack);
    });

  //response

  // {
  //   "$metadata": {
  //     "httpStatusCode": 200,
  //     "requestId": "3403cd38-451b-4250-9bf1-6c7667f303c0",
  //     "attempts": 1,
  //     "totalRetryDelay": 0
  //   },
  //   "checksum": "4ce2c140-6eb1-4f53-80b1-70785f83b819",
  //   "conclusionStatement": {
  //     "messages": [
  //       {
  //         "content": "All right, I ordered  you a {Crust} crust {Type} pizza with {Sauce} sauce.",
  //         "contentType": "PlainText"
  //       },
  //       {
  //         "content": "OK, your {Crust} crust {Type} pizza with {Sauce} sauce is on the way.",
  //         "contentType": "PlainText"
  //       }
  //     ],
  //     "responseCard": "foo"
  //   },
  //   "confirmationPrompt": {
  //     "maxAttempts": 1,
  //     "messages": [
  //       {
  //         "content": "Should I order  your {Crust} crust {Type} pizza with {Sauce} sauce?",
  //         "contentType": "PlainText"
  //       }
  //     ]
  //   },
  //   "createVersion": false,
  //   "createdDate": "2022-06-20T17:49:27.621Z",
  //   "description": "Order a pizza from a local pizzeria.",
  //   "fulfillmentActivity": { "type": "ReturnIntent" },
  //   "lastUpdatedDate": "2022-06-20T17:49:27.621Z",
  //   "name": "DocOrderPizza",
  //   "rejectionStatement": {
  //     "messages": [
  //       { "content": "Ok, I'll cancel your order.", "contentType": "PlainText" },
  //       { "content": "I cancelled your order.", "contentType": "PlainText" }
  //     ]
  //   },
  //   "sampleUtterances": [
  //     "Order me a pizza.",
  //     "Order me a {Type} pizza.",
  //     "I want a {Crust} crust {Type} pizza",
  //     "I want a {Crust} crust {Type} pizza with {Sauce} sauce."
  //   ],
  //   "slots": [
  //     {
  //       "description": "The type of sauce to use on the pizza.",
  //       "name": "Sauce",
  //       "obfuscationSetting": "NONE",
  //       "priority": 3,
  //       "sampleUtterances": ["Make it {Sauce} sauce.", "I'd like {Sauce} sauce."],
  //       "slotConstraint": "Required",
  //       "slotType": "AMAZON.Food",
  //       "valueElicitationPrompt": {
  //         "maxAttempts": 1,
  //         "messages": [
  //           { "content": "White or red sauce?", "contentType": "PlainText" },
  //           { "content": "Garlic or tomato sauce?", "contentType": "PlainText" }
  //         ]
  //       }
  //     },
  //     {
  //       "description": "The type of pizza to order.",
  //       "name": "Type",
  //       "obfuscationSetting": "NONE",
  //       "priority": 1,
  //       "sampleUtterances": [
  //         "Get me a {Type} pizza.",
  //         "A {Type} pizza please.",
  //         "I'd like a {Type} pizza."
  //       ],
  //       "slotConstraint": "Required",
  //       "slotType": "AMAZON.Food",
  //       "valueElicitationPrompt": {
  //         "maxAttempts": 1,
  //         "messages": [
  //           {
  //             "content": "What type of pizza would you like?",
  //             "contentType": "PlainText"
  //           },
  //           { "content": "Vegie or cheese pizza?", "contentType": "PlainText" },
  //           {
  //             "content": "I can get you a vegie or a cheese pizza.",
  //             "contentType": "PlainText"
  //           }
  //         ]
  //       }
  //     },
  //     {
  //       "description": "The type of pizza crust to order.",
  //       "name": "Crust",
  //       "obfuscationSetting": "NONE",
  //       "priority": 2,
  //       "sampleUtterances": [
  //         "Make it a {Crust} crust.",
  //         "I'd like a {Crust} crust."
  //       ],
  //       "slotConstraint": "Required",
  //       "slotType": "AMAZON.Food",
  //       "valueElicitationPrompt": {
  //         "maxAttempts": 1,
  //         "messages": [
  //           {
  //             "content": "What type of crust would you like?",
  //             "contentType": "PlainText"
  //           },
  //           { "content": "Thick or thin crust?", "contentType": "PlainText" }
  //         ]
  //       }
  //     }
  //   ],
  //   "version": "$LATEST"
  // }
};

const putBot = () => {
  var params = {
    name: "APITest",
    abortStatement: {
      messages: [
        {
          content: "I don't understand. Can you try again?",
          contentType: "PlainText",
        },
        {
          content: "I'm sorry, I don't understand.",
          contentType: "PlainText",
        },
      ],
    },
    childDirected: true,
    clarificationPrompt: {
      maxAttempts: 1,
      messages: [
        {
          content:
            "I'm sorry, I didn't hear that. Can you repeat what you just said?",
          contentType: "PlainText",
        },
        {
          content: "Can you say that again?",
          contentType: "PlainText",
        },
      ],
    },
    description: "Test updating bot from node.",
    idleSessionTTLInSeconds: 300,
    intents: [
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
    ],
    locale: "en-US",
    processBehavior: "SAVE",
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

//putBot();
