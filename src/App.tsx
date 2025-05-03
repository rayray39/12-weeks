import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react"
import { createTheme, ThemeProvider, useColorScheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

function MyApp() {
    // theme selected by the user from the switch component
    const [theme, setTheme] = useState<boolean>(false);

    // the color mode for material ui, based on selected theme
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }

    const handleNewTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTheme(event.target.checked);

        if (event.target.checked) {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    return <Box sx={{
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center'
    }}>
        <FormControl>
            <FormControlLabel 
                control={<Switch value={theme} onChange={handleNewTheme} color="default"></Switch>} label='🌗'/>
        </FormControl>

    </Box>
}

const theme = createTheme({
    colorSchemes: {
      dark: true,
    },
    typography:{
        fontFamily: `'Roboto', 'Arial', sans-serif`,
    }
});

function App() {
    return <ThemeProvider theme={theme}>
        <CssBaseline/>
        <MyApp />
    </ThemeProvider>
}

export default App