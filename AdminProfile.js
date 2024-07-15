import React, { Fragment, useEffect, useState } from 'react';
import { deleteBooking, getAdminById } from '../api-helpers/api-helpers';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const AdminProfile = () => {
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const adminData = await getAdminById();
                setAdmin(adminData.admin);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        console.log(`Attempting to delete booking with id: ${id}`); // Log the ID being passed
        try {
            await deleteBooking(id);
            console.log('Booking deleted successfully');
            setAdmin(prevAdmin => ({
                ...prevAdmin,
                addedPackages: prevAdmin.addedPackages.filter(pkg => pkg._id !== id)
            }));
        } catch (err) {
            console.error('Error deleting booking:', err);
        }
    };

    return (
        <Box width="100%" display="flex">
            {admin && (
                <Fragment>
                    <Box flexDirection="column" justifyContent="center" alignItems="center" width="30%" padding={3}>
                        <AccountCircleIcon sx={{ fontSize: "10rem", textAlign: 'center', ml: 3 }} />
                        <Typography mt={1} padding={1} width="auto" textAlign="center" border="1px solid #ccc" borderRadius={6}>
                            Email: {admin.email}
                        </Typography>
                    </Box>

                    {admin.addedPackages && admin.addedPackages.length > 0 && (
                        <Box width="70%" display="flex" flexDirection="column">
                            <Typography variant="h3" fontFamily="verdana" textAlign="center" padding={2}>Added Packages</Typography>
                            <Box margin="auto" display="flex" flexDirection="column" width="80%">
                                <List>
                                    {admin.addedPackages.map((pkg, index) => (
                                        <ListItem key={index} sx={{ bgcolor: "#00d386", color: "white", textAlign: 'center', margin: 1 }}>
                                            <ListItemText sx={{ margin: 1, width: 'auto', textAlign: 'left' }}>
                                                Package: {pkg.title || 'Loading...'} {/* Assuming you have title in Package model */}
                                            </ListItemText>
                                            
                                            <DeleteForeverIcon onClick={() => handleDelete(pkg._id)} color="error" />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    )}
                </Fragment>
            )}
        </Box>
    );
};

export default AdminProfile;
