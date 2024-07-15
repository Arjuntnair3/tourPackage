import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { getAllPackages } from '../../api-helpers/api-helpers'; 
import PackageItem from './PackageItem';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    getAllPackages()
      .then((data) => {
        if (data && data.length > 0) {
          setPackages(data); // Set the fetched packages correctly
        }
        setLoading(false); // Turn off loading state after fetching data
      })
      .catch((err) => {
        console.error("Error fetching packages:", err);
        setLoading(false); // Ensure loading state is turned off in case of error
      });
  }, []); // Empty dependency array means this effect runs once, similar to componentDidMount

  if (loading) {
    return <Typography>Loading...</Typography>; // Display a loading indicator
  }

  return (
    <Box margin={'auto'} marginTop={4}>
      <Typography margin={'auto'} variant='h4' padding={2} width="40%" bgcolor={"#900C3F"} color="white" textAlign="center">
        All Packages
      </Typography>
      <Box width={'100%'} margin="auto" marginTop={5} display={'flex'} justifyContent="flex-start" flexWrap={"wrap"}>
        {packages.map((pkg) => (
          <PackageItem 
            key={pkg._id} // Ensure you're using _id if that's the correct identifier
            id={pkg._id} 
            posterUrl={pkg.posterUrl} 
            packageDate={pkg.packageDate} 
            title={pkg.title} 
          />
        ))}
      </Box>
    </Box>
  );
}

export default Packages;
