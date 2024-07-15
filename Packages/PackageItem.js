// PackageItem.js
import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const PackageItem = ({ id, title, packageDate, posterUrl }) => {
    return (
        <Card sx={{ margin: 2, width: 250, height: 300, borderRadius: 5 }}>
            <img src={posterUrl} alt={title} style={{ height: '50%', width: '100%' }} />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(packageDate).toDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" fullWidth component={Link} to={`/booking/${id}`} sx={{margin:"auto",bgcolor:"#2b2d42",
                     ":hover": {
                        bgcolor: "#121217",
                      }
                    }} size="small">Book</Button>
            </CardActions>
        </Card>
    );
}

export default PackageItem;
