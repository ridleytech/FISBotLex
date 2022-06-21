const dispatcher = (event) => {
  let response = {
    sessionAttributes: event.sessionAttributes,
    dialogAction: {
      type: "Close",
      fulfillmentState: "",
      message: {
        contentType: "PlainText",
        content: "",
      },
    },
  };
  switch (event.currentIntent.name) {
    case "HowToCreate":
      response.dialogAction.fulfillmentState = "Fulfilled";
      response.dialogAction.message.content = "(RID239)";
      break;
    case "FullNameIntent":
      response.dialogAction.fulfillmentState = "Fulfilled";
      response.dialogAction.message.content =
        "Hello " + event.currentIntent.slots.FullName + "!";
      break;
    default:
      response.dialogAction.fulfillmentState = "Failed";
      response.dialogAction.message.content =
        "I don't know what you're asking...";
      break;
  }
  return response;
};

exports.handler = async (event) => {
  return dispatcher(event);
};
