import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Registration.module.scss';
import { fetchAuth, fetchRegister, selectIsAuth } from '../../redux/slices/auth';

export const Registration = () => {
    const isAuth = useSelector(selectIsAuth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values));

        if (!data.payload) {
            return alert('Не удалось регистрироваться!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Create a new account
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Enter full name' })}
                    className={styles.field}
                    label="Full name"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    type="email"
                    {...register('email', { required: 'Enter your email' })}
                    className={styles.field}
                    label="E-Mail"
                    fullWidth
                />
                <TextField
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    type="password"
                    {...register('password', { required: 'Enter a password' })}
                    className={styles.field}
                    label="Password"
                    fullWidth
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Sing up
                </Button>
            </form>
        </Paper>
    );
};