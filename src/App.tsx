import Box from "@mui/material/Box"
import Switch from "@mui/material/Switch"
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useEffect, useState } from "react"
import { createTheme, ThemeProvider, useColorScheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import Habits from "./Components/Habits";
import NewHabitDialog from "./Components/NewHabitDialog";
import { Habit } from "./Types/types";

const NUM_OF_WEEKS = 12;
const DAYS_PER_WEEK = 7;

function MyApp() {
    // theme selected by the user from the switch component, true = dark, false = light
    const [darkTheme, setDarkTheme] = useState<boolean>(false);

    // control the dialog's state to add a new habit
    const [openNewHabitDialog, setOpenNewHabitDialog] = useState<boolean>(false);

    // fetch all the habits from the database and assign them to habits array
    const [habits, setHabits] = useState<Habit[]>([]);

    const [latestHabitId, setLatestHabitId] = useState<number>(1);

    // get all the habits from the database on mounting
    const fetchAllHabits = async () => {
        const response = await fetch('http://localhost:5000/get-all-habits', {
            method:'GET',
            headers:{'Content-Type': 'application/json'}
        })

        if (!response.ok) {
            console.log("Error fetching all habits from database.");
            return;
        }

        const data = await response.json();
        console.log(data.message);
        setHabits(data.allHabits);
    }

    useEffect(() => {
        fetchAllHabits();
    }, [])

    // the color mode for material ui, based on selected theme
    const { mode, setMode } = useColorScheme();
    if (!mode) {
        return null;
    }

    const handleNewTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
        // changes the mode of the app
        setDarkTheme(event.target.checked);

        if (event.target.checked) {
            setMode('dark');
        } else {
            setMode('light');
        }
    }

    // add new habit into habits table in database
    const addNewHabitToDatabase = async (newTitle:string, newDesc:string, newStartDate:string, newEndDate:string, newHabitContribution:number[]) => {
        const response = await fetch('http://localhost:5000/add-new-habit', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                title: newTitle,
                description: newDesc,
                startDate: newStartDate,
                endDate: newEndDate,
                habitContribution: newHabitContribution,
            })
        })

        if (!response.ok) {
            console.log('Error adding new habit to database.');
            return;
        }

        const data = await response.json();
        console.log(data.message);
    }

    const handleCloseNewHabitDialog = (newTitle:string, newDesc:string, newStartDate:string, newEndDate:string) => {
        // close the dialog for adding new habit
        console.log('closing new habit dialog')
        setOpenNewHabitDialog(false);

        if (newTitle && newDesc && newStartDate && newEndDate) {
            // take the new habit's title and description from the dialog
            console.log(`new habit title = ${newTitle}`);
            console.log(`new habit desc = ${newDesc}`);
            console.log(`new habit starts on = ${newStartDate}`);
            console.log(`new habit ends on = ${newEndDate}`);

            // github style contribution graph, each element has a default value of 0
            const newHabitContribution = new Array(NUM_OF_WEEKS * DAYS_PER_WEEK).fill(0);

            // create new habit object and add to list
            const newHabit:Habit = {
                id: latestHabitId,
                title: newTitle,
                desc: newDesc,
                startDate: newStartDate,
                endDate: newEndDate,
                habitContribution: newHabitContribution
            }
            setHabits((prev) => [...prev, newHabit]);
            
            setLatestHabitId(prev => (prev + 1));

            // add call to server to add new habit into habits table
            addNewHabitToDatabase(newTitle, newDesc, newStartDate, newEndDate, newHabitContribution);

            console.log('new habit successfully added to list');
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
                control={<Switch value={darkTheme} onChange={handleNewTheme} color="default"></Switch>} label='🌗'/>
        </FormControl>

        <NewHabitDialog open={openNewHabitDialog} handleOpen={addNewHabit} handleClose={handleCloseNewHabitDialog} />

        <Habits darkTheme={darkTheme} habits={habits} />
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