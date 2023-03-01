import { FC } from "react";
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material";

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

type PropsTypes = {
    children: React.ReactNode
}

const Theme:FC<PropsTypes> = ({ children }) => {
    const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

    const colorMode = React.useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        },
      }),
      [],
    );
  
    const theme = React.useMemo(
      () =>
        createTheme({
          palette: {
            mode,
          },
        }),
      [mode],
    );
  
    return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    );
  }

  export default Theme;