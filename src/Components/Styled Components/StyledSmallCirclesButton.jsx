import {
    StyledDialogTitle,
    StyledSmallCirclesButton, StyledCirclesIcon
} from "./styledComponents";
import Dialog from "@mui/material/Dialog";
import {useEffect, useState} from "react";
import {getUserCircles} from "../../BackEnd/Classes/UserClass";
import Box from "@mui/material/Box";
import {DialogContent, Stack} from "@mui/material";
import theme from "../../Theme/Theme";

export default function StyledSmallCircleButton({userID, circles_ = []}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (circles !== []) {
            setCircles(circles_);
        } else {
            getUserCirclesHelper(userID)
        }
    }, [])

    const [circles, setCircles] = useState(circles_);

    const getUserCirclesHelper = (id) => {
        getUserCircles(id).then((lst) => {
            setCircles(lst);
        }).catch((error) => {
            console.error(error);
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <StyledSmallCirclesButton onClick={handleClickOpen}/>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{
                    backgroundColor: `${theme.palette.primary.main}`,
                    border: `0.2rem solid ${theme.palette.secondary.main}`
                }}>
                    <Stack direction="column" spacing={2} alignItems="flex-start">
                        {(circles === []) ?
                            (<div> Error Loading the circles </div>) :
                            (<Stack direction="column" alignItems="flex-start">
                                    {circles.map((circle) =>
                                        <box key={circle}>
                                            <Stack direction="row"
                                                   justifyContent="center"
                                                   alignItems="center"
                                                   spacing={1}>
                                                <StyledCirclesIcon sx={{color: "white"}}/>
                                                <StyledDialogTitle>{circle}</StyledDialogTitle>
                                            </Stack>
                                        </box>)}
                                </Stack>
                            )
                        }
                    </Stack>
                </DialogContent>
            </Dialog>
        </>
    )
}