import React, { useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PackageItem from './Packages/PackageItem';
import { getAllPackages } from '../api-helpers/api-helpers';


const HomePage = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => { 
    getAllPackages()
      .then((data) => {
        if (data) setPackages(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin="auto" width="80%" height="40vh" padding={2}>
        <img 
          src="https://media.istockphoto.com/id/1155225100/photo/boat-in-dal-lake.webp?b=1&s=170667a&w=0&k=20&c=qVMJ-HFWIqmsAP-dXUDWA3g1aohgGkgBoYJhHSdgA7o=" 
          alt="srinagar" 
          width={'100%'}
          height={'100%'}
          style={{ objectFit: 'cover' }}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>Latest Packages</Typography>
      </Box>
      <Box margin={"auto"} display="flex" width="80%" justifyContent="space-between" alignItems="center" flexWrap="nowrap">
        {packages && packages.slice(0,4).map((pkg, index) => (
          <PackageItem 
            key={index} 
            title={pkg.title} 
            posterUrl={pkg.posterUrl} 
            packageDate={pkg.packageDate} 
          />
        ))}
      </Box>
      <Box display="flex" padding={5} margin="auto" justifyContent="center">
        <Button component={Link} to="/packages" variant="outlined" sx={{ color: "#2b2d42" }}>
          View All Packages
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
