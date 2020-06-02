const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const { id } = request.params;

        const incidents = await connection('incidents')
            .where('recipientId', id)
            .select('*');

        return response.json(incidents);
    }
}