import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Alert,
    Paper
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginUser } from '../services/authService';

export default function LoginPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setServerError('');
        try {
            const res = await loginUser({
                email: data.email,
                password: data.password,
            });

            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));

            navigate('/dashboard');
        } catch (error) {
            const message =
                error?.response?.data?.message || error.message || 'Login failed';
            setServerError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" className="login-container">
            <Paper elevation={4} className="login-paper">
                <Box mt={4} mb={2}>
                    <Typography variant="h4" align="center" className="login-title">
                        Sign In
                    </Typography>
                    <Typography variant="body2" align="center" className="login-subtitle">
                        Enter your credentials to continue
                    </Typography>
                </Box>

                {serverError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        required
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        {...register('password', { required: 'Password is required' })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}
