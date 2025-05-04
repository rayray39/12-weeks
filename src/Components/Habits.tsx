import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Habit } from "../Types/types"

function Habits({ theme, habits }:{ theme:boolean, habits:Habit[] }) {

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
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