const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const constants = require('../constants')
const connection = require('../database/connection');


module.exports = {
    async login(request, response) {
        const { email, password } = request.body;

        const user = await connection('users')
            .where('email', email)
            .select('id', 'email', 'password', 'name')
            .first();

        if (!user)
            return response.status(401).json({ erro: 'Usuário e/ou senha inválidos' })

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword)
            return response.status(401).json({ erro: 'Usuário e/ou senha inválidos' })

        const accessToken = jwt.sign({ email: user.email, name: user.name, id: user.id }, constants.accessTokenSecret);

        return response.status(200).json({
            accessToken
        });
    },

    async create(request, response) {
        const { name, email, password, phone, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
        const hashedPassword = await bcrypt.hash(password, constants.saltPassword);

        await connection('users').insert({
            id,
            name,
            email,
            password: hashedPassword,
            phone,
            city,
            uf,
        })

        return response.json({ id });
    },

    async update(request, response) {
        const { id } = request.params;
        const { name, email, password, phone, city, uf } = request.body;

        if (!id)
            return response.status(400).json({ erro: 'Deve ser informado o id do usuário' });

        const hashedPassword = await bcrypt.hash(password, saltPassword);

        await connection('users')
            .where('id', id)
            .update({
                name,
                email,
                password: hashedPassword,
                phone,
                city,
                uf
            })

        return response.json({ id });
    }
};