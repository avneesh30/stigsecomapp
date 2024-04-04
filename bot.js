const { ActivityHandler, MessageFactory } = require('botbuilder');
const {  ActionTypes, ActivityTypes, CardFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `You said : ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            // const membersAdded = context.activity.membersAdded;
            // const welcomeText = 'Hello and welcome! Synaptical Chat Bot. Type anything to get started.';
            // for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
            //     if (membersAdded[cnt].id !== context.activity.recipient.id) {
            //         await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
            //     }
            // }
            // By calling next() you ensure that the next BotHandler is run.
            await this.sendWelcomeMessage(context)
            await next();
        });
    }

    // create send a welcome message
    async sendWelcomeMessage(context) {

        const {activity} = context;
        const welcomeText = 'Welcome! Synaptical Chat Bot.';
        for (let cnt = 0; cnt < activity.membersAdded.length; ++cnt) {
            if (activity.membersAdded[cnt].id !== activity.recipient.id) {
                await context.sendActivity(welcomeText);
                await this.sendSuggestedActions(context);
            }
        }
    }

    // create send a suggested method
    async sendSuggestedActions(context) {
        const reply = MessageFactory.suggestedActions(['Yes', 'No'], 'Do you want to continue?');
        await context.sendActivity(reply);
    }
}

module.exports.EchoBot = EchoBot;
