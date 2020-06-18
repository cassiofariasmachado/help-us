import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function EditIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const params = useParams();

    const userId = localStorage.getItem('userId');
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        api.get(`incidents/${params.id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        }).then(response => {
            const { title, description, value } = response.data;

            setTitle(title);
            setDescription(description);
            setValue(value);
        })
    }, [params.id, accessToken]);

    async function handleNewIncident(e) {
        e.preventDefault();

        try {
            const data = {
                title,
                description,
                value,
                recipientId: userId
            };

            await api.put(`incidents/${params.id}`, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="edit-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="HelpUs" />

                    <h1>Editar causa</h1>
                    <p>Descreva sua causa detalhadamente para encontrar um voluntário para ajudá-lo.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="2C89A0" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        placeholder="Título do caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input
                        placeholder="Valor em reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}