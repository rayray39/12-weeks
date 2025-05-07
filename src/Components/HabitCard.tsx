import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const NUM_OF_WEEKS = 12;
const DAYS_PER_WEEK = 7;

const generateDummyData = () => {
    return Array.from({ length: NUM_OF_WEEKS * DAYS_PER_WEEK }, () =>
        Math.floor(Math.random() * 5)
    );
};
  
const getColor = (level: number, dark: boolean) => {
    const lightShades = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127'];
    const darkShades = ['#2d2d2d', '#406e2f', '#2e924c', '#2aa356', '#33ff88'];
    return dark ? darkShades[level] : lightShades[level];
};

function HabitCard({ title, desc, darkTheme }:{ title:string, desc:string, darkTheme:boolean }) {
    const activity = generateDummyData();

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
                    width: 'fit-content',
                }}
            >
                {activity.map((level, i) => (
                    <Box
                    key={i}
                    sx={{
                        width: 24,
                        height: 24,
                        bgcolor: getColor(level, darkTheme),
                        borderRadius: '2px',
                    }}
                    />
                ))}
            </Box>
      </CardContent>
    </Card>
}

export default HabitCard