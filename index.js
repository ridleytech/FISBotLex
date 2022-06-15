/*

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3. This example is in the
'AWS SDK for JavaScript v3 Developer Guide' at https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/lex-bot-example.html.

Purpose:
index.js is part of a tutorial demonstrating how to build and deploy an Amazon Lex chatbot
within a web application to engage your web site visitors. To run the full tutorial, see
https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/lex-bot-example.html.

*/

// snippet-start:[cross-service.JavaScript.lex-app.backendV3]

//    "StackId": "arn:aws:cloudformation:us-west-2:521503643683:stack/LEXTEST/7e3ffab0-ec25-11ec-9503-06305ef04965"

import { DetectDominantLanguageCommand } from "@aws-sdk/client-comprehend";
import { TranslateTextCommand } from "@aws-sdk/client-translate";
import { PostTextCommand } from "@aws-sdk/client-lex-runtime-service";
import { lexClient } from "./libs/lex.js";
import { translateClient } from "./libs/translate.js";
import { comprehendClient } from "./libs/comp.js";

var g_text = "";
// Set the focus to the input box.
document.getElementById("wisdom").focus();

function showRequest(_theText) {
  var conversationDiv = document.getElementById("conversation");
  var requestPara = document.createElement("P");
  requestPara.className = "userRequest";
  requestPara.appendChild(document.createTextNode(_theText));
  conversationDiv.appendChild(requestPara);
  conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function showResponse(lexResponse) {
  var wisdomText = document.getElementById("wisdom");

  wisdomText.value = "";
  wisdomText.locked = false;

  var conversationDiv = document.getElementById("conversation");
  var responsePara = document.createElement("P");
  responsePara.className = "lexResponse";

  var lexTextResponse = lexResponse;

  responsePara.appendChild(document.createTextNode(lexTextResponse));
  responsePara.appendChild(document.createElement("br"));
  conversationDiv.appendChild(responsePara);
  conversationDiv.scrollTop = conversationDiv.scrollHeight;
}

function handletext(text) {
  g_text = text;
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", loadNewItems, false);
  xhr.open("POST", "../text", true); // A Spring MVC controller
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //necessary
  xhr.send("text=" + text);
}

function loadNewItems(event) {
  var msg = event.target.responseText;
  showRequest();

  // Re-enable input.
  var wisdomText = document.getElementById("wisdom");
  wisdomText.value = "";
  wisdomText.locked = false;
}

const createResponse = async () => {
  // Confirm there is text to submit.
  var wisdomText = document.getElementById("wisdom");
  if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {
    showRequest(wisdomText.value);

    // Disable input to show it is being sent.
    var wisdom = wisdomText.value.trim();
    wisdomText.value = "...";
    wisdomText.locked = true;

    //handletext(wisdom);

    var theText = wisdom;

    const lexParams = {
      botName: "FISBotTest",
      botAlias: "FISBOTnode",
      inputText: theText,
      userId: "chatbot-demo", // For example, 'chatbot-demo'.
    };
    try {
      const data = await lexClient.send(new PostTextCommand(lexParams));
      console.log("Success. Response is: ", data.message);
      var msg = data.message;
      showResponse(msg);
    } catch (err) {
      console.log("Error responding to message. ", err);
    }
  }
};

// Respond to user's input.
const createResponseTranslate = async () => {
  // Confirm there is text to submit.
  var wisdomText = document.getElementById("wisdom");
  if (wisdomText && wisdomText.value && wisdomText.value.trim().length > 0) {
    // Disable input to show it is being sent.
    var wisdom = wisdomText.value.trim();
    wisdomText.value = "...";
    wisdomText.locked = true;

    showRequest(wisdom);

    //handletext(wisdom);

    //crear po a partir de la solicitud
    //create PO from requisition

    const comprehendParams = {
      Text: wisdom,
    };
    try {
      const data = await comprehendClient.send(
        new DetectDominantLanguageCommand(comprehendParams)
      );

      //console.log("comprehend data: ", JSON.stringify(data));

      //{"$metadata":{"httpStatusCode":200,"requestId":"9c0f6051-ae80-44d1-86f8-b65db241881f","attempts":1,"totalRetryDelay":0},"Languages":[{"LanguageCode":"en","Score":0.9663455486297607}]}

      var language = data.Languages[0].LanguageCode;
      console.log("Success. The language code is: ", language);

      const translateParams = {
        SourceLanguageCode: language,
        TargetLanguageCode: "en",
        Text: wisdom,
      };
      try {
        const data = await translateClient.send(
          new TranslateTextCommand(translateParams)
        );
        var theText = data.TranslatedText;
        console.log("Success. Translated text: ", theText);

        if (language != "en") {
          showRequest("Translated: " + theText);
        }

        const lexParams = {
          botName: "FISBotTest",
          botAlias: "FISBOTnode",
          inputText: theText,
          userId: "chatbot-demo", // For example, 'chatbot-demo'.
        };
        try {
          const data = await lexClient.send(new PostTextCommand(lexParams));
          console.log("Success. Response is: ", data.message);
          var msg = data.message;
          showResponse(msg);
        } catch (err) {
          console.log("Error responding to message. ", err);
        }
      } catch (err) {
        console.log("Error translating text. ", err);
      }
    } catch (err) {
      console.log("Error identifying language. ", err);
    }
  }
};

// Make the functions available to the browser.
window.createResponse = createResponse;
window.createResponseTranslate = createResponseTranslate;

// snippet-end:[cross-service.JavaScript.lex-app.backendV3]
