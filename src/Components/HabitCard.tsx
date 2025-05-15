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
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import Typography from "@mui/material/Typography";
import { forwardRef, useState } from "react";

const NUM_OF_WEEKS = 12;
const DAYS_PER_WEEK = 7;
  
const getColor = (level: number) => {
    // returns the color based on the intensity level of the contribution graph
    if (level < 0) {
        level = 0;
    }
    if (level > 4) {
        level = 4;
    }
    const colors = ['#2F2F2F', '#a6d4fa', '#7cc0f5', '#52acef', '#2898ea'];
    return colors[level];
};

const Transition = forwardRef(function Transition(
    // transition for dialog
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function HabitCard({ idOfCard, title, desc, startDate, endDate, habitContribution, darkTheme, onDeleteHabit, handleEditHabit }:{ idOfCard:number, title:string, desc:string, startDate:string, endDate:string, habitContribution:number[], darkTheme:boolean, onDeleteHabit:(id:number)=>void, handleEditHabit:()=>void }) {

    // opens the diaplog to confirm commit to habit for today
    const [openCommitDialog, setOpenCommitDialog] = useState<boolean>(false);

    // opens the dialog to confirm deletion of habit
    const [openDeleteHabitDialog, setOpenDeleteHabitDialog] = useState<boolean>(false);

    // opens the dialog to edit the title and description
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);

    const getTodayIndex = () => {
        // returns the index in habitContribution, based on today's date from the startDate
        const [day, month, year] = startDate.split('-').map(Number);
        const startDateObject = new Date(year, month - 1, day);

        const today = new Date();

        // Clear time for both dates to ensure whole-day difference
        startDateObject.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffInMs = today.getTime() - startDateObject.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays < 0 || diffInDays >= NUM_OF_WEEKS * DAYS_PER_WEEK) {
            return null; // out of range
        }

        return diffInDays;
    };

    const handleCommit = () => {
        // opens the dialog to confirm user's commit to the habit for today
        console.log('commiting today...');
        setOpenCommitDialog(true);
    }

    const updateCommitOfHabit = async (newHabitContribution:number[], idOfHabitCard:number) => {
        const response = await fetch(`http://localhost:5000/update-habit-contribution/${idOfHabitCard}`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                newHabitContribution: newHabitContribution
            })
        })

        if (!response.ok) {
            console.log("Error in updating commit of habit.");
            return;
        }

        const data = await response.json();
        console.log(data.message);
    }

    const handleConfirmCommitDialog = () => {
        // closes the dialog to confirm user's commit to the habit
        setOpenCommitDialog(false);

        const index = getTodayIndex();
        console.log(`the index is ${index}`);

        if (index !== null) {
            // updates the intensity level of the habitContribution to display appropriate color
            habitContribution[index] = Math.min(habitContribution[index] + 1, 4) // max out at intensity level 4

            // TODO: update the commit of the habit
            updateCommitOfHabit(habitContribution, idOfCard);
        }
    }

    const handleCancelCommitDialog = () => {
        // closes the dialog if the user cancels the commit to the habit today
        setOpenCommitDialog(false);
        console.log('cancelling commit to habit...');
    }

    const handleOpenDeleteDialog = () => {
        // opens the dialog to ask user for confirmation on deleting habit
        console.log('deleting habit...');
        setOpenDeleteHabitDialog(true);
    }

    const handleCancelDelete = () => {
        // closes the dialog if the user cancels the commit to be deleted
        setOpenDeleteHabitDialog(false);
        console.log('cancelling deletion of habit...');
    }

    const handleConfirmDelete = () => {
        // deletes the habit from the database once the confirm button is clicked on
        console.log(`deleting habit, id = ${idOfCard}`);
        deleteHabit();
        setOpenDeleteHabitDialog(false);
    }

    // deletes the habit from the database
    const deleteHabit = async () => {
        const response = await fetch(`http://localhost:5000/delete-habit/${idOfCard}`, {
            method:'DELETE',
            headers:{'Content-Type':'application/json'}
        })

        if (!response.ok){
            console.log('Error occurred, failed to delete habit.');
            return;
        }

        const data = await response.json();
        console.log(data.message);
        onDeleteHabit(idOfCard);
    }

    // opens the dialog for editing habit details
    const editHabit = () => {
        console.log(`editing habit id = ${idOfCard}`);
        setOpenEditDialog(true);
    }

    // closes the edit habit dialog, when the cancel button in the dialog is clicked on
    const closeEditDialog = () => {
        console.log('cancelling edit habit...');
        setOpenEditDialog(false);
    }

    // submits the new title and description, closes the dialog
    const confirmEditHabit = async (newTitle:string, newDesc:string) => {
        console.log('confirm edit habit...');

        const response = await fetch(`http://localhost:5000/edit-habit/${idOfCard}`, {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({
                editTitle: newTitle,
                editDesc: newDesc
            })
        })

        if (!response.ok) {
            console.log('Error in editing habit title or description');
            return;
        }

        const data = await response.json();
        console.log(data.message);

        handleEditHabit();  // fetch all the habits in the database (in App.tsx) to update the frontend
        setOpenEditDialog(false);
    }

    return <Card variant="outlined" sx={{
        bgcolor: darkTheme ? '#4D4D4D' : '#E6E6E6'
    }}>
        <CardContent>
            <Box sx={{
                display:'flex',
                justifyContent:'space-between'
            }}>
                <Box>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {`${startDate} - ${endDate}`}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {desc}
                    </Typography>
                </Box>

                <Button sx={{
                    maxHeight:'40px'
                }} onClick={editHabit}>edit</Button>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${NUM_OF_WEEKS}, 1fr)`,
                    gridTemplateRows: `repeat(${DAYS_PER_WEEK}, 1fr)`,
                    gap: 0.5,
                    width: '100%',
                    marginBottom: '20px',
                    marginTop: '20px'
                }}
            >
                {
                    habitContribution.map((intensityLevel, index) => (
                        <Box key={index} sx={{
                            width:'100%',
                            aspectRatio: '1/1',
                            bgcolor: getColor(intensityLevel),
                            borderRadius: '4px',
                        }}></Box>
                    ))
                }
            </Box>

            <Box sx={{
                display:'flex',
                justifyContent:'space-between'
            }}>
                <Button variant="contained" disableElevation onClick={handleCommit}>Commit Today</Button>

                <Button disableElevation onClick={handleOpenDeleteDialog}>Delete</Button>
            </Box>

            {/* dialog opens for habit commit */}
            <Dialog
                open={openCommitDialog}
                onClose={handleCancelCommitDialog}
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
                    <Button onClick={handleCancelCommitDialog}>Cancel</Button>
                    <Button onClick={handleConfirmCommitDialog} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            {/* dialog opens for deleting habit */}
            <Dialog
                open={openDeleteHabitDialog}
                onClose={handleCancelDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                slots={{transition:Transition}}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to delete this habit?"}
                </DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openEditDialog}
                onClose={closeEditDialog}
                slots={{transition: Transition}}
                slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const title = formJson.editTitle;
                        const desc = formJson.editDesc;
                        console.log(`edited title = ${title}`);
                        console.log(`edited desc = ${desc}`);
                        confirmEditHabit(title, desc);
                    },
                },
                }}
            >
                <DialogTitle>Edit habit details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Existing Title
                    </DialogContentText>
                    <TextField
                        id="edit-habit-title"
                        name="editTitle"
                        defaultValue={title}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>

                <DialogContent>
                    <DialogContentText>
                        Existing Description
                    </DialogContentText>
                    <TextField
                        id="edit-habit-desc"
                        name="editDesc"
                        defaultValue={desc}
                        fullWidth
                        variant="outlined"
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={closeEditDialog}>Cancel</Button>
                    <Button type="submit">Confirm</Button>
                </DialogActions>
            </Dialog>

      </CardContent>
    </Card>
}

export default HabitCard