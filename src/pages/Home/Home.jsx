import { Stack } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ChattingCard from '../components/ChattingCard/ChattingCard';
import InitialChat from '../components/InitialChat/InitialChat';
import ChatInput from '../components/ChatInput/ChatInput';

const Home = () => {
  const { chat, setChat } = useOutletContext();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const listRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const generateResponse = (question) => {
    // your AI static response logic
  };

  return (
    <Stack sx={{ height: '100vh' }}>
      <Stack
        height={1}
        flexGrow={0}
        p={{ xs: 2, md: 3 }}
        spacing={{ xs: 2, md: 3 }}
        sx={{
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(151, 133, 186,0.4)',
            borderRadius: '8px',
          },
        }}
        ref={listRef}
      >
        {chat.length === 0 ? (
          <InitialChat generateResponse={generateResponse} />
        ) : (
          chat.map((item, index) => (
            <ChattingCard
              details={item}
              key={index}
              updateChat={setChat}
              setSelectedChatId={setSelectedChatId}
              showFeedbackModal={() => setShowModal(true)}
            />
          ))
        )}
      </Stack>
      <ChatInput
        setChat={setChat}
        clearChat={() => {
          const existingChats = JSON.parse(localStorage.getItem("allChats")) || [];
          if (chat.length > 0) {
            const newChat = {
              datetime: new Date().toISOString(),
              chat: chat,
            };
            existingChats.push(newChat);
            localStorage.setItem("allChats", JSON.stringify(existingChats));
          }
          setChat([]);
          localStorage.removeItem("chat");
        }}
        generateResponse={generateResponse}
        chat={chat}
      />
    </Stack>
  );
};

export default Home;
