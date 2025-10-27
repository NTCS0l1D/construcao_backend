const mongoose = require('mongoose');


module.exports = function validateID(req, res, next) {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
return res.status(400).json({ error: 'ID inválido' });
}
next();
};