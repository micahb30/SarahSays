var restify = require('restify');
var builder = require('botbuilder');

// selecting a random array item
var selectGreeting = ["Hey Dude", "Hola Amigo", "Salut!", "SUUUUUH"];
var pickAGreeting = function () {
    var thisGreeting = selectGreeting[Math.floor(Math.random() * 4)];
    return thisGreeting;
};

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
    console.log('%s listening to %s', server.name, server.url)
    });

//Create chat bot 

var connector = new builder.ChatConnector({ // This lets us connect our bot to the bot framework portal for deployment 
    appId: 'd9f4ea21-40cd-4986-8ba4-42f770697d88',
    appPassword: 'MWJ4td0QWcmGLoUmOhqSqep'
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//Bot Dialogs

// Bot builder breaks fown conversations into components called dialogs. 
bot.dialog('/', function (session) { //Bot builder tracks which dialog is currently active and will automatically route the incomeing message to the active dialog
    session.send(pickAGreeting()); // This is a single root '/' dialog that responds to any message with "Hello World"
});

