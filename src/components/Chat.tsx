import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
} from '@mui/material';
import { useLexChat } from '../hooks/useLexChat';

const Chat: React.FC = () => {
    const [input, setInput] = useState('');
    const { sendMessage, messages, loading } = useLexChat();

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                💬 Chat with Support Bot
            </Typography>
            <Paper sx={{ height: 300, overflowY: 'auto', p: 2, mb: 2 }}>
                <List>
                    {messages.map((msg, index) => (
                        <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                            <ListItemText
                                primary={msg.text}
                                sx={{
                                    bgcolor: msg.sender === 'user' ? '#cfe8fc' : '#e0e0e0',
                                    p: 1.5,
                                    borderRadius: 2,
                                    maxWidth: '75%',
                                }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button variant="contained" onClick={handleSend} disabled={loading}>
                    Send
                </Button>
            </Box>
        </Box>
    );
};

export default Chat;
