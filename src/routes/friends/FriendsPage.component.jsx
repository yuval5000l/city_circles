import React, {useEffect, useState} from 'react';
import {List, ListItem, Box, TextField, Typography} from '@mui/material';
import StyledFriend from "../../Components/Styled Components/StyledFriend";
import theme from "../../Theme/Theme";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../BackEnd/config/firebase";
import User from "../../BackEnd/Classes/UserClass";

const FriendsPageComponent = () => {

    const [searchText, setSearchText] = useState('');
    // const friends = [
    //     { id: 1, name: 'Yuvie Laval', circles: ['Huji', 'Gavram','Matar'] },
    //     { id: 2, name: 'Gold Guystien', circles: ['Huji','Gavram','Matar'] },
    //     { id: 3, name: 'Pele Dila', circles: ['Huji','Harhats','Matar'] },
    // ];
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
        <Box sx={{width: '100%', bgcolor: 'background.paper', paddingTop: '0.37rem'}}>
            <TextField
                label="Search Friends"
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
            />
            <Typography variant="h6" sx={{color: theme.palette.primary.main}}>
                {filteredFriends.length} Friends
            </Typography>
            <List>
                {filteredFriends.map((friend) => (
                    <ListItem key={friend.id}>
                        <StyledFriend user_id={friend.getUserId()} user_name={friend.getUserName()}
                                      circles={friend.getCircles()}/>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FriendsPageComponent;
