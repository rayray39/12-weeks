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

function NewHabitDialog({ open, handleOpen, handleClose }:{ open:boolean, handleOpen:() => void, handleClose:(title:string, desc:string) => void }) {

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Button
            disableElevation
            variant="contained"
            onClick={handleOpen}>Add New Habit</Button>

        <Dialog
        open={open}
        onClose={() => handleClose('', '')}
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
                handleClose(title, desc);
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
        <DialogActions>
          <Button onClick={() => handleClose('', '')}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
}

export default NewHabitDialog