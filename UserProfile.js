import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getUserBooking, getAllPackages } from '../api-helpers/api-helpers';
import { Box, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const UserProfile = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [packagesMap, setPackagesMap] = useState({});

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const res = await getUserBooking();
                if (res.user && res.user.bookings) {
                    setBookings(res.user.bookings);
                    setUser(res.user);
                } else {
                    setBookings([]);
                }
            } catch (err) {
                console.error('Error fetching user bookings:', err);
            }
        };

        const fetchPackages = async () => {
            try {
                const res = await getAllPackages();
                const packagesMap = res.reduce((acc, pkg) => {
                    acc[pkg._id] = pkg.title;
                    return acc;
                }, {});
                setPackagesMap(packagesMap);
            } catch (err) {
                console.error('Error fetching packages:', err);
            }
        };

        fetchUserBookings();
        fetchPackages();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteBooking(id);
            const updatedBookings = bookings.filter(booking => booking._id !== id);
            setBookings(updatedBookings);
            console.log('Booking deleted successfully');
        } catch (err) {
            console.error('Error deleting booking:', err);
        }
    };

    return (
        <Box width="100%" display="flex">
            {user && (
                <Fragment>
                    <Box flexDirection="column" justifyContent="center" alignItems="center" width="30%" padding={3}>
                        <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: 'center', ml: 3 }} />
                        <Typography padding={1} width="auto" textAlign="center" border="1px solid #ccc" borderRadius={6}>
                            Name: {user.name}
                        </Typography>
                        <Typography mt={1} padding={1} width="auto" textAlign="center" border="1px solid #ccc" borderRadius={6}>
                            Email: {user.email}
                        </Typography>
                    </Box>
                    <Box width="70%" display="flex" flexDirection="column">
                        <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>Bookings</Typography>
                        <Box margin="auto" display="flex" flexDirection="column" width="80%">
                            <List>
                                {bookings.map((booking, index) => (
                                    <ListItem key={index} sx={{ bgcolor: "#00d386", color: "white", textAlign: 'center', margin: 1 }}>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>
                                            Package: {packagesMap[booking.packages] || 'Loading...'}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>
                                            Number of Guests: {booking.packageNumber}
                                        </ListItemText>
                                        <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>
                                            Date of Package: {new Date(booking.date).toDateString()}
                                        </ListItemText>
                                        <IconButton onClick={() => handleDelete(booking._id)} color="error">
                                            <DeleteForeverIcon />
                                        </IconButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Fragment>
            )}
        </Box>
    );
};

export default UserProfile;
