/* This example shows how to create an intent for ordering pizzas. */

//import { lexClient } from "./libs/lex.js";
import * as AWS from "@aws-sdk/client-lex-model-building-service";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";

var params = {
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
      slotType: "DocPizzaType",
      slotTypeVersion: "$LATEST",
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
      slotType: "DocPizzaCrustType",
      slotTypeVersion: "$LATEST",
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
      slotType: "DocPizzaSauceType",
      slotTypeVersion: "$LATEST",
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
const REGION = "us-west-2";
const IDENTITY_POOL_ID = "us-west-2:9b983de2-c098-41ff-a7ef-ec4facd24e5a"; // An Amazon Cognito Identity Pool ID.

const client = new AWS.LexModelBuildingService({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: IDENTITY_POOL_ID,
  }),
});

// async/await.
// try {
//   const data = await client.createBotVersion(params);

//   console.log(data); // successful response
//   // process data.
// } catch (error) {
//   // error handling.
//   console.log(err, err.stack);
// }

// Promises.
client
  .putIntent(params)
  .then((data) => {
    // process data.

    console.log("data: " + JSON.stringify(data)); // successful response
  })
  .catch((error) => {
    // error handling.

    console.log("error: ", error.stack);
  });

// callbacks.
// client.createBotVersion(params, (err, data) => {
//   // process err and data.
// });

return;

lexClient.putIntent(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else console.log(data); // successful response
  /*
     data = {
      version: "$LATEST", 
      name: "DocOrderPizza", 
      checksum: "ca9bc13d-afc8-4706-bbaf-091f7a5935d6", 
      conclusionStatement: {
       messages: [
          {
         content: "All right, I ordered  you a {Crust} crust {Type} pizza with {Sauce} sauce.", 
         contentType: "PlainText"
        }, 
          {
         content: "OK, your {Crust} crust {Type} pizza with {Sauce} sauce is on the way.", 
         contentType: "PlainText"
        }
       ], 
       responseCard: "foo"
      }, 
      confirmationPrompt: {
       maxAttempts: 1, 
       messages: [
          {
         content: "Should I order  your {Crust} crust {Type} pizza with {Sauce} sauce?", 
         contentType: "PlainText"
        }
       ]
      }, 
      createdDate: <Date Representation>, 
      description: "Order a pizza from a local pizzeria.", 
      fulfillmentActivity: {
       type: "ReturnIntent"
      }, 
      lastUpdatedDate: <Date Representation>, 
      rejectionStatement: {
       messages: [
          {
         content: "Ok, I'll cancel your order.", 
         contentType: "PlainText"
        }, 
          {
         content: "I cancelled your order.", 
         contentType: "PlainText"
        }
       ]
      }, 
      sampleUtterances: [
         "Order me a pizza.", 
         "Order me a {Type} pizza.", 
         "I want a {Crust} crust {Type} pizza", 
         "I want a {Crust} crust {Type} pizza with {Sauce} sauce."
      ], 
      slots: [
         {
        name: "Sauce", 
        description: "The type of sauce to use on the pizza.", 
        priority: 3, 
        sampleUtterances: [
           "Make it {Sauce} sauce.", 
           "I'd like {Sauce} sauce."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaSauceType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "White or red sauce?", 
           contentType: "PlainText"
          }, 
            {
           content: "Garlic or tomato sauce?", 
           contentType: "PlainText"
          }
         ]
        }
       }, 
         {
        name: "Type", 
        description: "The type of pizza to order.", 
        priority: 1, 
        sampleUtterances: [
           "Get me a {Type} pizza.", 
           "A {Type} pizza please.", 
           "I'd like a {Type} pizza."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "What type of pizza would you like?", 
           contentType: "PlainText"
          }, 
            {
           content: "Vegie or cheese pizza?", 
           contentType: "PlainText"
          }, 
            {
           content: "I can get you a vegie or a cheese pizza.", 
           contentType: "PlainText"
          }
         ]
        }
       }, 
         {
        name: "Crust", 
        description: "The type of pizza crust to order.", 
        priority: 2, 
        sampleUtterances: [
           "Make it a {Crust} crust.", 
           "I'd like a {Crust} crust."
        ], 
        slotConstraint: "Required", 
        slotType: "DocPizzaCrustType", 
        slotTypeVersion: "$LATEST", 
        valueElicitationPrompt: {
         maxAttempts: 1, 
         messages: [
            {
           content: "What type of crust would you like?", 
           contentType: "PlainText"
          }, 
            {
           content: "Thick or thin crust?", 
           contentType: "PlainText"
          }
         ]
        }
       }
      ]
     }
     */
});
