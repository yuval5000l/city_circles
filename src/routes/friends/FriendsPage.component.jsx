import React, { useState } from 'react';
import { List, ListItem, Box, TextField, Typography } from '@mui/material';
import StyledFriend from "../../Components/Styled Components/StyledFriend";
import theme from "../../Theme/Theme";
const FriendsPageComponent = () => {
    const [searchText, setSearchText] = useState('');
    const friends = [
        { id: 1, name: 'Yuvie Laval', circles: ['Huji', 'Gavram','Matar'] },
        { id: 2, name: 'Gold Guystien', circles: ['Huji','Gavram','Matar'] },
        { id: 3, name: 'Pele Dila', circles: ['Huji','Harhats','Matar'] },
    ];

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredFriends = friends.filter((friend) =>
        friend.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper', paddingTop: '0.37rem' }}>
            <TextField
                label="Search Friends"
                value={searchText}
                onChange={handleSearchChange}
                fullWidth
            />
            <Typography variant="h6" sx={{color: theme.palette.primary.main}} >
                {filteredFriends.length} Friends
            </Typography>
            <List>
                {filteredFriends.map((friend) => (
                    <ListItem key={friend.id}>
                        <StyledFriend user_id={friend.id} user_name={friend.name} circles={friend.circles} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default FriendsPageComponent;
