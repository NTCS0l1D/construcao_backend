const yup = require('yup');


const criarSchema = yup.object({
titulo: yup.string().required('titulo é obrigatório'),
autor: yup.string().required('autor é obrigatório'),
editora: yup.string().required('editora é obrigatório'),
ano: yup.number().typeError('ano deve ser um número').required('ano é obrigatório'),
preco: yup.number().typeError('preco deve ser um número').required('preco é obrigatório').moreThan(-1, 'preco deve ser positivo')
});


const atualizarSchema = yup.object({
titulo: yup.string().notRequired(),
autor: yup.string().notRequired(),
editora: yup.string().notRequired(),
ano: yup.number().typeError('ano deve ser um número').notRequired(),
preco: yup.number().typeError('preco deve ser um número').moreThan(-1, 'preco deve ser positivo').notRequired()
});


function validar(schema) {
return async (req, res, next) => {
try {
await schema.validate(req.body, { abortEarly: false });
next();
} catch (err) {
const errors = err.inner ? err.inner.map(e => ({ path: e.path, message: e.message })) : [{ message: err.message }];
return res.status(400).json({ errors });
}
};
}


module.exports = {
validarCriarLivro: validar(criarSchema),
validarAtualizarLivro: validar(atualizarSchema)
};