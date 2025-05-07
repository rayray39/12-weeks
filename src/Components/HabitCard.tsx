import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { forwardRef, useState } from "react";

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

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HabitCard({ title, desc, darkTheme }:{ title:string, desc:string, darkTheme:boolean }) {
    const [habitContribution, setHabitContribution] = useState<number[]>(new Array(NUM_OF_WEEKS * DAYS_PER_WEEK).fill(0))

    const [openCommitDialog, setOpenCommitDialog] = useState<boolean>(false);

    const handleCommit = () => {
        console.log('commiting today...');
        setOpenCommitDialog(true);
    }

    const handleCloseCommitDialog = () => {
        setOpenCommitDialog(false);
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

            <Dialog
                open={openCommitDialog}
                onClose={handleCloseCommitDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                slots={{transition:Transition}}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Commit to habit today?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Keep track of your habit's progress by making a commit today.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCommitDialog}>Cancel</Button>
                    <Button onClick={handleCloseCommitDialog} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

      </CardContent>
    </Card>
}

export default HabitCard