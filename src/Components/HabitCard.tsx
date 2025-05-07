import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const NUM_OF_WEEKS = 12;
const DAYS_PER_WEEK = 7;
  
const getColor = (level: number, dark: boolean) => {
    if (level < 0) {
        level = 0;
    }
    if (level > 4) {
        level = 4;
    }
    const lightShades = ['#ebf4ff', '#bee3f8', '#90cdf4', '#63b3ed', '#4299e1'];
    const darkShades = ['#1A202C', '#2C5282', '#2B6CB0', '#3182CE', '#63B3ED'];
    return dark ? darkShades[level] : lightShades[level];
};

function HabitCard({ title, desc, darkTheme }:{ title:string, desc:string, darkTheme:boolean }) {
    const [habitContribution, setHabitContribution] = useState<number[]>(new Array(NUM_OF_WEEKS * DAYS_PER_WEEK).fill(0))

    const handleCommit = () => {
        console.log('commiting today...');
    }

    return <Card sx={{
        bgcolor: darkTheme ? '#4D4D4D' : '#E6E6E6'
    }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {desc}
            </Typography>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${NUM_OF_WEEKS}, 1fr)`,
                    gridTemplateRows: `repeat(${DAYS_PER_WEEK}, 1fr)`,
                    gap: 0.5,
                    width: '100%',
                }}
            >
                {
                    habitContribution.map((_, index) => (
                        <Box key={index} sx={{
                            width:'100%',
                            aspectRatio: '1/1',
                            bgcolor: '#2F2F2F',
                            borderRadius: '4px'
                        }}></Box>
                    ))
                }
            </Box>

            <Button variant="contained" disableElevation onClick={handleCommit}>Commit Today</Button>
      </CardContent>
    </Card>
}

export default HabitCard