import { Outlet } from 'react-router-dom'
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import './App.css';

function App() {
  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');
  const [menuOpen, setMenuOpen] = useState(false);
  const [chat, setChat] = useState(() => {
    const savedChat = localStorage.getItem('chat');
    return savedChat ? JSON.parse(savedChat) : [];
  });

  // Theme creation
  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  // Save theme mode
  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  // Persist single session chat & allChats
  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(chat));

    const existingChats = JSON.parse(localStorage.getItem("allChats")) || [];
    if (chat.length > 0) {
      const lastSaved = existingChats[existingChats.length - 1];
      if (!lastSaved || JSON.stringify(lastSaved.chat) !== JSON.stringify(chat)) {
        const newChat = {
          datetime: new Date().toISOString(),
          chat: chat,
        };
        const updated = [...existingChats.slice(0, -1), newChat];
        localStorage.setItem("allChats", JSON.stringify(updated));
      }
    }
  }, [chat]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="layout-container">
          <div className="sidebar">
            <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
          </div>
          <div className="main-content">
            <Outlet context={{ chat, setChat, handleMobileMenu: setMenuOpen }} />
          </div>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;