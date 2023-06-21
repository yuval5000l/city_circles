// import React, { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import StyledFriend from "../../Components/Styled Components/StyledFriend";
// function TabPanel({ children, value, index }) {
//     return (
//         <Typography component="div" role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
//             {value === index && (
//                 <Box p={0} sx={{ width: '100%' }}>
//                     {children}
//                 </Box>
//             )}
//         </Typography>
//     );
// }
// export default function StyledFriendsTabs({ friends, users }) {
//     const [value, setValue] = useState(0);
//
//     const handleChange = (event, newValue) => {
//         setValue(newValue);
//     };
//
//     return (
//         <Box sx={{ width: '100%', bgcolor: 'background.paper'}}>
//             <Tabs value={value} onChange={handleChange} aria-label="tabs" variant="fullWidth">
//                 <Tab label="Friends" id="tab-0" />
//                 <Tab label="All Users" id="tab-1" />
//             </Tabs>
//
//             <TabPanel value={value} index={0}>
//                 <List>
//                     {friends.map((friend) => (
//                         <ListItem key={friend.id}>
//                             <StyledFriend user_id={friend.id} user_name={friend.name} circles={friend.circles} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </TabPanel>
//
//             <TabPanel value={value} index={1}>
//                 <List>
//                     {users.map((user) => (
//                         <ListItem key={user.id}>
//                             <StyledFriend user_id={user.id} user_name={user.name} circles={user.circles} />
//                         </ListItem>
//                     ))}
//                 </List>
//             </TabPanel>
//         </Box>
//     );
// }
//
//
