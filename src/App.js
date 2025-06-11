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

      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div
  style={{
    width: '250px',
    backgroundColor: theme.palette.primary.light,
    transition: 'transform 0.4s ease',
    transform:
      window.innerWidth < 800
        ? menuOpen
          ? 'translateX(0)'
          : 'translateX(-100%)'
        : 'translateX(0)',
    position: window.innerWidth < 800 ? 'fixed' : 'relative',
    zIndex: window.innerWidth < 800 ? 9999 : 1,
    height: '100vh',
  }}
>

          <Sidebar setChat={setChat} closeMenu={() => setMenuOpen(false)} />
        </div>

        {/* Main content */}
        <div style={{ flexGrow: 1, padding: '1rem' }}>
          <Outlet context={{ chat: chat, setChat: setChat, handleMobileMenu: setMenuOpen }} />
        </div>
      </div>
    </ThemeProvider>
  </ThemeContext.Provider>
);
}

export default App;