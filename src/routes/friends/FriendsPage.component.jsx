import React, {useEffect, useState} from 'react';
import {List, ListItem, Box, TextField, Typography} from '@mui/material';
import StyledFriend from "../../Components/Styled Components/StyledFriend";
import theme from "../../Theme/Theme";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import User from "../../BackEnd/Classes/UserClass";

const FriendsPageComponent = ({setValue}) => {

    const [searchText, setSearchText] = useState('');
    let [friends, setFriends] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                User.getAllUsers().then((user_) => {
                    setFriends(user_)
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }, []);

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredFriends = friends.filter((friend) =>
        {
            if (friend.getUserId() === auth?.currentUser?.uid)
            {
                return false;
            }
            return friend.getUserName().toLowerCase().includes(searchText.toLowerCase());

        }
    );

    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper', paddingTop: '0.1rem',
            paddingBottom: '0.4rem'}}>
            <TextField
                label="Search Friends"
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
            />
            <Typography variant="h4" sx={{color: theme.palette.primary.main, paddingBottom: "0.4rem",paddingTop: "0.4rem" }}>
                {filteredFriends.length} Friends
            </Typography>
            <List width="100%"  >
                {filteredFriends.map((friend) => (
                    <ListItem
                        sx={{paddingLeft:"0px", paddingRight:"0px", paddingTop: "0px",paddingBottom: "0px",}}
                        width="100%" key={friend.getUserId()}>
                        <StyledFriend user_id={friend.getUserId()} user_name={friend.getUserName()}
                                      profile_photo_url={friend.getPic()} circles={friend.getCircles()} setValueFunc={setValue}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FriendsPageComponent;
