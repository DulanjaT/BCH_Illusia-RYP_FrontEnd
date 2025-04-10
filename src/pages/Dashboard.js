import React from 'react';
import './Dashboard.css';
import { Button, TextField, Typography, Container, Box, Card, CardContent } from '@mui/material';
export default function Dashboard() {
    return (
        <Container maxWidth="lg">
            <Box mt={5}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Illusia ry's Booking System
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Browse storage items, make bookings, and manage your reservations.
                </Typography>

                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr 1fr' }} gap={3} mt={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Browse Items</Typography>
                            <Typography variant="body2">View all available storage items</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Make a Booking</Typography>
                            <Typography variant="body2">Add items to your cart and select dates</Typography>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">My Bookings</Typography>
                            <Typography variant="body2">View and manage your own reservations</Typography>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
}