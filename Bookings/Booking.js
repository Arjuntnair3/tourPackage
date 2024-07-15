
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPackageDetails, newBooking } from "../../api-helpers/api-helpers";
import { Box, Button, FormLabel, TextField, Typography } from '@mui/material';

const Booking = () => {
    const [pkg, setPackage] = useState(null); // Initialize with null
    const [inputs, setInputs] = useState({ packageNumber: "", date: "" });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getPackageDetails(id);
                if (res && res.packagess) {
                    setPackage(res.packagess); // Update state with package details
                } else {
                    console.log("Package details not found");
                }
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        newBooking({ ...inputs, packages: pkg._id }).then((res) => console.log(res)).catch(err => console.log(err));
    };

    return (
        <div>
            {pkg && (
                <div>
                    <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>
                        Book Tickets of Package: {pkg.title}
                    </Typography>
                    <Box display={'flex'} justifyContent={"center"}>
                        <Box display={'flex'} flexDirection="column" paddingTop={3} width="50%" marginRight={"auto"}>
                            <img width="80%" height={"300px"} src={pkg.posterUrl} alt={pkg.title} />
                            <Box width={"80%"} marginTop={3} padding={2}>
                                <Typography padding={3} fontFamily="fantasy" variant='h4' textAlign={"center"}>{pkg.description}</Typography>
                                <Typography fontFamily="fantasy" variant='h6' textAlign={"center"}>Most Loved Places: {pkg.places}</Typography>
                                <Typography fontWeight={'bold'} marginTop={1}>
                                    Package Date: {new Date(pkg.packageDate).toDateString()}
                                </Typography>
                            </Box>
                        </Box>
                        <Box width={"50%"} paddingTop={3}>
                            <form onSubmit={handleSubmit}>
                                <Box padding={5} margin={'auto'} display="flex" flexDirection={"column"}>
                                    <FormLabel>Number of Guests</FormLabel>
                                    <TextField
                                        value={inputs.packageNumber}
                                        onChange={handleChange}
                                        name="packageNumber"
                                        type="number"
                                        margin="normal"
                                        variant="standard"
                                    />
                                    <FormLabel>Booking Date</FormLabel>
                                    <TextField
                                        name="date"
                                        type="date"
                                        margin="normal"
                                        variant="standard"
                                        value={inputs.date}
                                        onChange={handleChange}
                                    />
                                    <Button type="submit" sx={{ mt: 3 }}>Book Now</Button>
                                </Box>
                            </form>
                        </Box>
                    </Box>
                </div>
            )}
        </div>
    );
};

export default Booking;


