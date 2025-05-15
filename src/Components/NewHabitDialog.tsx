import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
    ) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function formatDate(date: Date): string {
    // returns the date object in the format, dd-MM-yyyy
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

// opens up the dialog to add a new habit (title, description)
function NewHabitDialog({ open, handleOpen, handleClose }:{ open:boolean, handleOpen:() => void, handleClose:(title:string, desc:string, startDate:string, endDate:string) => void }) {
    const todayDate = new Date();
    const startDateFormatted = formatDate(todayDate);

    const endDate = new Date();
    endDate.setDate(todayDate.getDate() + 7 * 12);
    const endDateFormatted = formatDate(endDate);

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Button sx={{
            marginTop:'20px'
        }}
            disableElevation
            variant="contained"
            onClick={handleOpen}>Add New Habit</Button>

        <Dialog
        open={open}
        onClose={() => handleClose('', '', '', '')}
        slots={{transition: Transition}}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                const title = formJson.title;
                const desc = formJson.description;
                // console.log(`title = ${title}`);
                // console.log(`desc = ${desc}`);
                handleClose(title, desc, startDateFormatted, endDateFormatted);
            },
          },
        }}
      >
        <DialogTitle>Add a new habit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the title for your new habit
          </DialogContentText>
          <TextField
            autoFocus
            required
            id="new-habit-title"
            name="title"
            label="Title"
            fullWidth
            variant="outlined"
          />
        </DialogContent>

        <DialogContent>
          <DialogContentText>
            Enter a description for your new habit
          </DialogContentText>
          <TextField
            required
            id="new-habit-description"
            name="description"
            label="Description"
            fullWidth
            variant="outlined"
          />
        </DialogContent>

        <DialogContent>
            <TextField
                id="new-habit-start-date"
                name="start-date"
                label='Starting Date'
                defaultValue={startDateFormatted}
                fullWidth
                variant="outlined"
                slotProps={{
                    input: {
                      readOnly: true,
                    },
                }}
            />
        </DialogContent>

        <DialogContent>
            <TextField
                id="new-habit-end-date"
                name="end-date"
                label='Ending Date'
                defaultValue={endDateFormatted}
                fullWidth
                variant="outlined"
                slotProps={{
                    input: {
                      readOnly: true,
                    },
                }}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('', '', '', '')}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
}

export default NewHabitDialog