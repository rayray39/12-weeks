import Box from "@mui/material/Box"

function Habits({ theme }:{ theme:boolean }) {

    return <Box sx={{
        border: theme ? '1px solid white' : '1px solid black',
        borderRadius: '8px',
        width:'300px',
        height:'300px'
    }}>

    </Box>
}

export default Habits