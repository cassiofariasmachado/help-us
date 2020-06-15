const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('users', 'users.id', '=', 'incidents.recipientId')
            .limit(5)
            .offset((page - 1) * 5)
            .select([
                'incidents.*',
                'users.name',
                'users.email',
                'users.phone',
                'users.city',
                'users.uf',
            ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
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

    async delete(request, response) {
        const { id } = request.params;

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};