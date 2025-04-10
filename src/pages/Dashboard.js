import React from 'react';
import {
    Typography,
    Container,
    Box,
    Card,
    CardContent,
    CardActionArea,
} from '@mui/material';
import { useNavigate, Outlet } from 'react-router-dom';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="lg" className="dashboard-container">
            <Box mt={5}>
                <Typography variant="h3" className="dashboard-heading" gutterBottom>
                    Welcome to Illusia ry
                </Typography>
                <Typography variant="subtitle1" className="dashboard-subheading" gutterBottom>
                    Browse storage items, make bookings, and manage your reservations.
                </Typography>

                <Box className="card-grid">
                    <Card className="dashboard-card">
                        <CardActionArea onClick={() => navigate('/dashboard/items')}>
                            <CardContent>
                                <Typography variant="h6" className="card-title">Browse Items</Typography>
                                <Typography variant="body2" className="card-text">
                                    View all available storage items
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>

                    <Card className="dashboard-card">
                        <CardContent>
                            <Typography variant="h6" className="card-title">Make a Booking</Typography>
                            <Typography variant="body2" className="card-text">
                                Add items to your cart and select dates
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card className="dashboard-card">
                        <CardContent>
                            <Typography variant="h6" className="card-title">My Bookings</Typography>
                            <Typography variant="body2" className="card-text">
                                View and manage your own reservations
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>

                <Outlet />
            </Box>
        </Container>
    );
}
