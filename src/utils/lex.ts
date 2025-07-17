import AWS from 'aws-sdk';

AWS.config.update({
    region: process.env.REACT_APP_AWS_REGION!,
    credentials: new AWS.Credentials({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    }),
});

const lex = new AWS.LexRuntimeV2();

export const sendMessageToLex = async (message: string, sessionId = 'user-session') => {
    const params = {
        botId: process.env.REACT_APP_BOT_ID!,
        botAliasId: process.env.REACT_APP_BOT_ALIAS_ID!,
        localeId: process.env.REACT_APP_AWS_LEX_LOCALE || 'en_US',
        sessionId,
        text: message,
    };

    return new Promise<string>((resolve, reject) => {
        lex.recognizeText(params, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const botResponse = data.messages?.[0]?.content || 'No response';
                resolve(botResponse);
            }
        });
    });
};
