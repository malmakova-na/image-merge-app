const db = require('../../entities/Database')
module.exports = async (req, res) => {
    const id = await db.remove(req.params.id);
    return res.json({ id });
}