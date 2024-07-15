import React, { useState } from 'react';
import { Box, Button, Checkbox, FormLabel, TextField, Typography } from '@mui/material';
import { addPackage } from '../../api-helpers/api-helpers'; // Adjust according to your actual project structure

const labelProps = {
  mt: 1,
};

const AddPackage = () => {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    posterUrl: '',
    packageDate: '',
    featured: false,
  });
  const [places, setPlaces] = useState([]);
  const [place, setPlace] = useState('');

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlaceChange = (e) => {
    setPlace(e.target.value);
  };

  const addPlace = () => {
    if (place.trim()) {
      setPlaces([...places, place.trim()]);
      setPlace('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(inputs, places);
      const res = await addPackage({ ...inputs, places });
      console.log(res); // Log the response if needed
    } catch (err) {
      console.error("Error adding package:", err);
      // Handle errors or show user-friendly messages
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          width={'50%'}
          padding={10}
          margin="auto"
          display={'flex'}
          flexDirection="column"
          boxShadow={'10px 10px 20px #ccc'}
        >
          <Typography textAlign={'center'} variant="h5" fontFamily={"verdana"}>
            Add New Package
          </Typography>
          <FormLabel sx={labelProps}>Title</FormLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            name="title"
            variant="standard"
            margin="normal"
          />

          <FormLabel sx={labelProps}>Description</FormLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            name="description"
            variant="standard"
            margin="normal"
          />

          <FormLabel sx={labelProps}>Poster URL</FormLabel>
          <TextField
            value={inputs.posterUrl}
            onChange={handleChange}
            name="posterUrl"
            variant="standard"
            margin="normal"
          />

          <FormLabel sx={labelProps}>Package Date</FormLabel>
          <TextField
            type={"date"}
            value={inputs.packageDate}
            onChange={handleChange}
            name="packageDate"
            variant="standard"
            margin="normal"
          />

          <FormLabel sx={labelProps}>Places</FormLabel>
          <Box display={"flex"}>
            <TextField
              name="place"
              value={place}
              onChange={handlePlaceChange}
              variant="standard"
              margin="normal"
            />
            <Button onClick={addPlace}>Add</Button>
          </Box>
          <Box>
            {places.map((place, index) => (
              <Typography key={index}>{place}</Typography>
            ))}
          </Box>

          <FormLabel>Featured</FormLabel>
          <Checkbox
            name="featured"
            checked={inputs.featured}
            onClick={(e) =>
              setInputs((prevState) => ({
                ...prevState,
                featured: e.target.checked,
              }))
            }
            sx={{ mr: "auto" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: "30%",
              margin: 'auto',
              bgcolor: '#2b2d42',
              ":hover": {
                bgcolor: "#121217",
              },
            }}
          >
            Add New Package
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddPackage;
