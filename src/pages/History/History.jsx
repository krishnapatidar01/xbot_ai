import { useEffect, useState } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import ChatHistoryCard from '../components/ChatHistoryCard/ChatHistoryCard';

export default function History() {
  const [chats, setAllChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);

  useEffect(() => {
    const storedChats = JSON.parse(localStorage.getItem('allChats')) || [];
    setAllChats(storedChats);
    setFilteredChats(storedChats);
  }, []);

  return (
    <Box>
      <Typography variant="h2">Past Conversations</Typography>
      <Stack spacing={2} mt={2}>
        {filteredChats.map((chat, index) => (
          <ChatHistoryCard key={index} details={chat} />
        ))}
      </Stack>
    </Box>
  );
}
