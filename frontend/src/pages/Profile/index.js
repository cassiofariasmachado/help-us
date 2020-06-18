import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();
    const query = useQuery();
    const refresh = query.get('refresh');

    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        api.get(`profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [accessToken, userId, refresh]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleEdit(id) {
        history.push(`incidents/edit/${id}`);
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="HelpUs" />
                <span>Bem vinda, {userName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="2C89A0" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>

                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button className="delete" onClick={() => handleDeleteIncident(incident.id)} type="button">
                            <FiTrash2 size={20} color="red" />
                        </button>

                        <button className="edit" onClick={() => handleEdit(incident.id)} type="button">
                            <FiEdit size={20} color="gray" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}