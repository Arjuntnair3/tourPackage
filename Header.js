import React, { useEffect, useState } from 'react';
import { AppBar, Autocomplete, IconButton, Tab, Tabs, TextField, Toolbar } from '@mui/material';
import LuggageIcon from '@mui/icons-material/Luggage';
import { Box } from "@mui/system";
import { getAllPackages } from '../api-helpers/api-helpers';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, userActions } from '../store';

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [value, setValue] = useState(0);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    getAllPackages()
      .then((data) => {
        if (data) setPackages(data);
      })
      .catch(err => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const selectedPackage = packages.find((pkg) => pkg.title === val); // Renamed 'package' to 'pkg' or 'selectedPackage'
    if (isUserLoggedIn && selectedPackage) {
      navigate(`/booking/${selectedPackage._id}`);
    } else {
      console.log(`Package with title '${val}' not found.`);
      // Optionally, handle the case where selectedPackage is undefined
      // For example, display a message to the user or handle it differently based on your application logic.
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={'20%'}>
          <IconButton component={Link} to='/'>
            <LuggageIcon />
          </IconButton>
        </Box>
        <Box width={'30%'} margin="auto">
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={packages.map(pkg => pkg.title)}
            renderInput={(params) => <TextField sx={{ input: { color: "white" }}} variant='standard' {...params} placeholder="Search Across Packages" />}
          />
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Tabs textColor="inherit" indicatorColor="secondary" value={value} onChange={(e, val) => setValue(val)}>
            <Tab label="Packages" component={Link} to="/packages" />
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab label="Admin" component={Link} to="/admin" />
            )}
            {!isAdminLoggedIn && !isUserLoggedIn && (
              <Tab label="Auth" component={Link} to="/auth" />
            )}
            {isUserLoggedIn && (
              <>
                <Tab label="Profile" component={Link} to="/user" />
                <Tab onClick={() => logout(false)} label="Logout" component={Link} to="/" />
              </>
            )}
            {isAdminLoggedIn && (
              <>
                <Tab label="Add Package" component={Link} to="/add" />
                <Tab label="Profile" component={Link} to="/user-admin" />
                <Tab onClick={() => logout(true)} label="Logout" component={Link} to="/" />
              </>
            )}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
