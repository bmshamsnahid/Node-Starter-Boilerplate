const { FlowInfo } = require('./model/flow/flowInfo');
const { BotInfo } = require('./model/bot/botInfo');

const message = 'a';

const findFlow = async (message) => {
    console.log('In method');
    const myFlow = await FlowInfo.findOne({
        triggerKeyword: { 
            $in: [message]
         }
    });

    const myFlow = await BotInfo.find();

    consoele.log('Flow: ');
    console.log(myFlow);
};

console.log('Flow method invoking');

findFlow(message);