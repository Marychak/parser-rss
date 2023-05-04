import React from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';
import { fetchAuth } from '../../redux/slices/auth';
import {useNavigate} from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm();

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (!data.payload) {
            return alert('Не удалось авторизоваться!');
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token);
            navigate('/')
        }
    };

    return (
        <Paper classes={{ root: styles.root }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-Mail"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    type="email"
                    {...register('email', { required: 'Enter your email' })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Пароль"
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', { required: 'Enter a password' })}
                    fullWidth
                />
                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Log in
                </Button>
            </form>
        </Paper>
    );
};