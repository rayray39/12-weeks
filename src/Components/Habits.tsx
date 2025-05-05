import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Habit } from "../Types/types"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"

// main display area for all the habits
function Habits({ theme, habits }:{ theme:boolean, habits:Habit[] }) {
    const [displayedHabit, setDisplayedHabit] = useState<Habit>();

    useEffect(() => {
        // the first habit is displayed as soon as it is added into the habits array
        if (habits.length > 0 && !displayedHabit) {
            setDisplayedHabit(habits[0]);
        }
    }, [habits])

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
            }}>{
                displayedHabit ?
                    <HabitCard title={displayedHabit.title} desc={displayedHabit.desc} /> :
                    'no habits'
                }
            </Box>
           
            <Stack spacing={1} sx={{
                // border:'1px solid black',
                padding:'20px',
                marginLeft:'20px',
                maxHeight: '400px', // Adjust to fit your layout
                overflowY: 'auto',
            }}>
                {
                    habits.map((habit, index) => (
                        <Button key={index}
                            sx={{
                                maxHeight:'40px'
                            }}
                            onClick={() => handleSelectHabit(index)} 
                            disableElevation 
                            variant="contained">
                                {habit.title.length > 10 ? `${habit.title.slice(0, 10)}...` : habit.title}
                        </Button>
                    ))
                }
            </Stack>
        </Box>
    </Box>
}

function HabitCard({ title, desc }:{ title:string, desc:string }) {
    return <Card>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {desc}
            </Typography>
      </CardContent>
    </Card>
}

export default Habits