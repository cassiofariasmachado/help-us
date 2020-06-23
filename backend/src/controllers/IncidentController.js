const connection = require('../database/connection');
const { getLoggedUser } = require('../utils');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents')
            .join('users as r', 'r.id', '=', 'incidents.recipientId')
            .leftJoin('users as v', 'v.id', '=', 'incidents.voluntaryId')
            .count();

        const incidents = await connection('incidents')
            .join('users as r', 'r.id', '=', 'incidents.recipientId')
            .leftJoin('users as v', 'v.id', '=', 'incidents.voluntaryId')
            .limit(5)
            .offset((page - 1) * 5)
            .select({
                id: 'incidents.id',
                title: 'incidents.title',
                description: 'incidents.description',
                value: 'incidents.value',
                recipientName: 'r.name',
                recipientEmail: 'r.email',
                recipientPhone: 'r.phone',
                recipientCity: 'r.city',
                recipientUf: 'r.uf',
                voluntaryName: 'v.name',
                voluntaryEmail: 'v.email',
                voluntaryPhone: 'v.phone',
                voluntaryCity: 'v.city',
                voluntaryUf: 'v.uf',
            })

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async accept(request, response) {
        const { id } = request.params;
        const { authorization } = request.headers;
        const user = getLoggedUser(authorization);

        const incident = await connection('incidents')
            .where('id', id)
            .first();

        if (!incident)
            response.status(404).json({ erro: 'Causa não encontrada!' })

        if (incident.recipientId === user.id)
            response.status(422).json({ erro: 'O beneficiário não pode ser o mesmo voluntário!' })

        const updatedIncident = await connection('incidents')
            .where('id', id)
            .update({ voluntaryId: user.id })

        return response.status(200).json(updatedIncident);
    },

    async get(request, response) {
        const { id } = request.params;

        const incident = await connection('incidents')
            .where('id', id)
            .first();

        if (!incident)
            response.status(404).json({ erro: 'Causa não encontrada!' })

        return response.status(200).json(incident);
    },

    async create(request, response) {
        const { title, description, value, recipientId } = request.body;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            recipientId,
        });

        return response.json({ id });
    },

    async update(request, response) {
        const { id } = request.params;
        const { title, description, value } = request.body;

        if (!id)
            return response.status(400).json({ erro: 'Deve ser informado o id da causa' });

        await connection('incidents')
            .where('id', id)
            .update({
                title,
                description,
                value
            })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};