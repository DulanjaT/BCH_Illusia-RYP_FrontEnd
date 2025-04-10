import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    TextField,
    Typography,
    Container,
    Box,
    Alert
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { registerUser } from '../services/authService';

export default function RegisterPage() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        watch,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setServerError('');

        try {
            await registerUser({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
            });

            navigate('/login');
        } catch (error) {
            const message =
                error?.response?.data?.message || error.message || 'Registration failed';
            setServerError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={8}>
                <Typography variant="h4" align="center" gutterBottom>
                    Register
                </Typography>

                {serverError && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {serverError}
                    </Alert>
                )}

                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="First Name"
                        fullWidth
                        margin="normal"
                        required
                        {...register('firstName', { required: 'First name is required' })}
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                    />

                    <TextField
                        label="Last Name"
                        fullWidth
                        margin="normal"
                        required
                        {...register('lastName', { required: 'Last name is required' })}
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                    />

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

                    <TextField
                        label="Confirm Password"
                        fullWidth
                        margin="normal"
                        required
                        type="password"
                        {...register('confirmPassword', {
                            validate: (value) =>
                                value === watch('password') || 'Passwords do not match',
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating account...' : 'Create Account'}
                    </Button>

                    <Box mt={2} textAlign="center">
                        <Typography variant="body2" color="textSecondary">
                            OR
                        </Typography>

                        <Button
                            variant="text"
                            onClick={() => navigate('/login')}
                            sx={{ mt: 1 }}
                        >
                            Login here
                        </Button>
                    </Box>
                </form>
            </Box>
        </Container>
    );
}
