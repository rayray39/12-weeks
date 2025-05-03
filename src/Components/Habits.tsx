import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

function Habits({ theme }:{ theme:boolean }) {

    return <Box sx={{
        border: theme ? '1px solid white' : '1px solid black',
        borderRadius: '8px',
        width:'500px',
        height:'500px'
    }}>
        <Stack spacing={1}>
            <Button disableElevation variant="contained">Habit 1</Button>
            <Button disableElevation variant="contained">Habit 2</Button>
            <Button disableElevation variant="contained">Habit 3</Button>
        </Stack>
    </Box>
}

export default Habits