import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

function Habits({ theme, addNewHabit }:{ theme:boolean, addNewHabit:() => void }) {

    const handleNewHabit = () => {
        addNewHabit();
        console.log('handle new habit');
    }

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Button
            disableElevation
            variant="contained"
            onClick={handleNewHabit}>Add New Habit</Button>

        <Stack spacing={1} sx={{
            border: theme ? '1px solid white' : '1px solid black',
            borderRadius: '8px',
            width:'500px',
            height:'500px'
        }}>

        </Stack>
    </Box>
}

export default Habits