import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from "react"
import { createTheme, ThemeProvider, useColorScheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Habits from "./Components/Habits";
import NewHabitDialog from "./Components/NewHabitDialog";

function MyApp() {
    // theme selected by the user from the switch component, true = dark, false = light
    const [theme, setTheme] = useState<boolean>(false);

    // control the dialog's state to add a new habit
    const [openNewHabitDialog, setOpenNewHabitDialog] = useState<boolean>(false);

    const [newHabitTitle, setNewHabitTitle] = useState<string>('');
    const [newHabitDesc, setNewHabitDesc] = useState<string>('');

    // the color mode for material ui, based on selected theme
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }

    const handleNewTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        // changes the mode of the app
        setTheme(event.target.checked);

        if (event.target.checked) {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    const handleCloseNewHabitDialog = (title:string, desc:string) => {
        // close the dialog for adding new habit
        console.log('closing new habit dialog')
        setOpenNewHabitDialog(false);

        if (title && desc) {
            // take the new habit's title and description from the dialog
            setNewHabitTitle(title);
            setNewHabitDesc(desc);
            console.log(`new habit title = ${title}`);
            console.log(`new habit desc = ${desc}`);
        } else {
            console.log('title or desc is empty');
        }
    }

    const addNewHabit = () => {
        // open the dialog to create a new habit
        console.log('adding new habit');
        setOpenNewHabitDialog(true);
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

        <NewHabitDialog open={openNewHabitDialog} handleClose={handleCloseNewHabitDialog} />

        <Habits theme={theme} addNewHabit={addNewHabit}/>
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