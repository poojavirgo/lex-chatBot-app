import { useState } from 'react';
import { sendMessageToLex } from '../utils/lex';

type Message = {
    text: string;
    sender: 'user' | 'bot';
};

export const useLexChat = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    const sendMessage = async (text: string) => {
        setLoading(true);
        setMessages((prev) => [...prev, { text, sender: 'user' }]);

        try {
            const response = await sendMessageToLex(text);
            setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
        } catch (err) {
            setMessages((prev) => [...prev, { text: 'Error sending message.', sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    return { messages, sendMessage, loading };
};
