import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import { Habit } from "../Types/types"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import HabitCard from "./HabitCard.tsx"

// main display area for all the habits
function Habits({ darkTheme, habits, onDeleteHabit, handleEditHabit }:{ darkTheme:boolean, habits:Habit[], onDeleteHabit:(id:number) => void, handleEditHabit:() => void }) {
    const [displayedHabit, setDisplayedHabit] = useState<Habit>();

    useEffect(() => {
        // the first habit is displayed as soon as it is added into the habits array
        if (habits.length > 0) {
            setDisplayedHabit(habits[0]);
        }
    }, [habits])

    const handleSelectHabit = (id:number) => {
        console.log(`habit id = ${id} is being displayed`);
        const selectedHabit = habits.filter((habit) => habit.id === id)[0];
        setDisplayedHabit(selectedHabit);
    }

    return <Box sx={{
                borderRadius: '8px',
                width:'800px',
                height:'640px',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
            }}>
                <Box sx={{
                    height:'520px',
                    width:'600px',
                    overflowY:'auto',
                    margin:'20px'
                }}>
                    {
                        displayedHabit ?
                            <HabitCard
                                idOfCard={displayedHabit.id}
                                title={displayedHabit.title} 
                                desc={displayedHabit.desc}
                                startDate={displayedHabit.startDate}
                                endDate={displayedHabit.endDate}
                                habitContribution={displayedHabit.habitContribution}
                                darkTheme={darkTheme} 
                                onDeleteHabit={onDeleteHabit}
                                handleEditHabit={handleEditHabit}
                            /> :
                        'no habits'
                    }
                </Box>

                {
                    habits.length > 0 && <Stack spacing={1} sx={{
                        padding:'20px',
                        height:'520px',
                        overflowY: 'auto',
                        bgcolor: darkTheme ? '#4D4D4D' : '#E6E6E6',
                        borderRadius: '4px',
                        width:'180px',
                    }}>
                        {
                            habits.map((habit, index) => (
                                <Button key={index}
                                    sx={{
                                        maxHeight:'40px'
                                    }}
                                    onClick={() => handleSelectHabit(habit.id)} 
                                    disableElevation 
                                    variant="contained">
                                        {habit.title.length > 10 ? `${habit.title.slice(0, 10)}...` : habit.title}
                                </Button>
                            ))
                        }
                    </Stack>
                }
            </Box>
}

export default Habits