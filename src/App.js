import { Outlet } from 'react-router-dom'
import { ThemeContext } from './theme/ThemeContext';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { getThemePallete } from './theme/ThemePallete';
import { Grid } from '@mui/material'

function App() {

  const [mode, setMode] = useState(localStorage.getItem('theme') || 'light')
  const [chat, setChat] = useState([])
  const [menuOpen, setMenuOpen] = useState(false)

  //create theme
  const theme = React.useMemo(() => createTheme(getThemePallete(mode)), [mode]);

  //save theme mode in localstorage
  useEffect(() => {

    localStorage.setItem('theme', mode)

  }, [mode])

 return (
  <ThemeContext.Provider value={{ mode: mode, setMode: setMode }}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="layout-container">
        <div className="sidebar">
          <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
        </div>
        <div className="main-content">
          <Outlet context={{ chat: chat, setChat: setChat, handleMobileMenu: setMenuOpen }} />
        </div>
      </div>
    </ThemeProvider>
  </ThemeContext.Provider>
);
}

export default App;