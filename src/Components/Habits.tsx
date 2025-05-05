import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Habit } from "../Types/types"
import Button from "@mui/material/Button"
import { useState } from "react"

// main display area for all the habits
function Habits({ theme, habits }:{ theme:boolean, habits:Habit[] }) {
    const [displayedHabit, setDisplayedHabit] = useState<Habit>();

    const handleSelectHabit = (index:number) => {
        console.log(`habit ${index} is being displayed`);
        setDisplayedHabit(habits[index]);
    }

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Box sx={{
            border: theme ? '1px solid white' : '1px solid black',
            borderRadius: '8px',
            width:'800px',
            height:'400px',
            display:'flex',
            justifyContent:'center'
        }}>
            <Box sx={{
                // border:'1px solid black',
                padding:'20px',
                width:'600px'
            }}>{displayedHabit ? displayedHabit.title : 'main area'}</Box>
           
            <Stack spacing={1} sx={{
                // border:'1px solid black',
                padding:'20px',
                marginLeft:'20px'
            }}>
                {
                    habits.map((habit, index) => (
                        <Button key={index}
                            onClick={() => handleSelectHabit(index)} 
                            disableElevation 
                            variant="contained">
                                {habit.title}
                        </Button>
                    ))
                }
            </Stack>
        </Box>
    </Box>
}

export default Habits