import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';
import jsonwebtoken from 'jsonwebtoken'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';
import peopleImg from '../../assets/people.svg';

export default function Logon() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('users/login', { email, password });
            const { accessToken } = response.data;

            localStorage.setItem('accessToken', accessToken);

            const user = jsonwebtoken.decode(accessToken);

            if (user) {
                localStorage.setItem('userId', user.id);
                localStorage.setItem('userName', user.name);
            }

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">

            <header className="header">
                <h1>HelpUs - Seja você também um voluntário</h1>

                <img src={logoImg} alt="HelpUs" />
            </header>

            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#2C89A0" />
                        Não tenho cadastro
                    </Link>
                </form>

                <img src={peopleImg} alt="People" />
            </section>
        </div>
    );
}
