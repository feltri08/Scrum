import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSingup, setIsSingup] = useState(true);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        const URL = 'http://164.90.246.219:5001/auth';

        const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSingup ? 'signup' : 'login'}`, {
            username, password, fullName: form.fullName, phoneNumber, avatarURL,
        });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userId', userId);

        if(isSingup) {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('avatarURL', avatarURL);
            cookies.set('hashedPassword', hashedPassword);
        }

        window.location.reload();
    }

    const switchMode = () => {
        setIsSingup((prevIsSingup) => !prevIsSingup)
    }

    return (
        <div className = "auth__form-container">
            <div className = "auth__form-container_fields">
                <div className = "auth__form-container_fields-content">
                    <p> {isSingup ? 'Sign Up' : 'Sign In'} </p>
                    <form onSubmit={handleSubmit}>
                        {isSingup && (
                            <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "fullName"> Nombre completo </label>
                                <input
                                    name = "fullName" 
                                    type = "text"
                                    placeholder = "Nombre Completo"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "username"> Usuario </label>
                                <input
                                    name = "username" 
                                    type = "text"
                                    placeholder = "Usuario"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSingup && (
                            <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "phoneNumber"> Teléfono </label>
                                <input
                                    name = "phoneNumber" 
                                    type = "text"
                                    placeholder = "Teléfono"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {isSingup && (
                            <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "avatarURL"> Avatar URL </label>
                                <input
                                    name = "avatarURL" 
                                    type = "text"
                                    placeholder = "Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "password"> Contraseña </label>
                                <input
                                    name = "password" 
                                    type = "password"
                                    placeholder = "Contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        {isSingup && (
                            <div className = "auth__form-container_fields-content_input">
                                <label htmlFor = "confirmPassword"> Confirmar Contraseña </label>
                                <input
                                    name = "confirmPassword" 
                                    type = "password"
                                    placeholder = "Confirmar Contraseña"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className = "auth__form-container_fields-account_button">
                            <button> {isSingup ? "Sign Up" : "Sing In"} </button>
                        </div>
                    </form>
                    <div className = "auth__form-container_fields-account">
                        <p>
                            {isSingup
                             ? "Ya tienes cuenta?"
                             : "No tienes cuenta?"
                            }
                            <span onClick={switchMode}>
                                {isSingup ? 'Sign In' : 'Sign Up'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
            <div className = "auth__form-container_image">
                <img src = {signinImage} alt = "sign in" />
            </div>
        </div>
    )
}

export default Auth
