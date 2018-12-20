const { FlowInfo } = require('./model/flow/flowInfo');
const { BotInfo } = require('./model/bot/botInfo');

const message = 'a';

const findFlow = async (message) => {
    let myFlow = await FlowInfo.findOne({
        triggerKeyword: { 
            $in: [message]
            }
    });

    myFlow = await BotInfo.find();

    consoele.log('Flow: ');
    console.log(myFlow);
};

console.log('Flow method invoking');

findFlow(message);