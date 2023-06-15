import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import {getUserById} from "../../BackEnd/Classes/UserClass";
import {Box, Button} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import theme from "../../Theme/Theme";






function showMyProfile(user) {
    return (<div>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.palette.primary.main,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    borderRadius: '8px',
                }}
            >
                <Avatar
                    src={user.get_pic()}
                    sx={{ width: 100, height: 100 }}
                />
                <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                    <Button variant="contained" color="secondary">
                        Edit Profile
                    </Button>
                    <Button variant="contained" color="secondary">
                        Add Friends
                    </Button>
                </Box>
            </Box>
        </Box>
        Ma profile mate {user.getUserName()}
        <p>

        </p>
    </div>);
}

function showProfile(user) {
    return (<div>
        {(user === null) ? (<div> Loading... </div>) :
            (<div>
                Welcome to {user.getUserName()} profile!
            </div>)
        }
    </div>)
}

function ProfilePageComponent() {


    const location = useLocation()
    const check_null = location.state === null;
    let {from} = (check_null === true) ? null : location.state;
    let [user, setUser] = useState(null);
    useEffect(() => {
        if (check_null !== true) {
            onAuthStateChanged(auth, (user_) => {
                if (user_) {
                    getUserById(from).then((user__) => {
                        setUser(user__);
                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });
        }

    }, []);
    return (
        <div>
            {
                (check_null === true) ?
                    (<div>Profile!</div>)
                    :
                    (
                        <div>
                            {
                                (user && (user?.getUserId() === auth?.currentUser?.uid)) ?
                                    (<div>{showMyProfile(user)}</div>) :
                                    (<div>{showProfile(user)}</div>)
                            }

                        </div>)
            }
        </div>
    );

}

export default ProfilePageComponent;
