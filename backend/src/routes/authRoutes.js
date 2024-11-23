const express = require('express');
const { register, login, getAllUsers, updateUser, deleteUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: "Registrar um novo usuario"
 *     description: "Registra um novo usuario no sistema."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "pipico"
 *               email:
 *                 type: string
 *                 example: "pipico@gmail.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *               role:
 *                 type: string
 *                 example: "admin"
 *     responses:
 *       201:
 *         description: "Usuario criado com sucesso"
 *       400:
 *         description: "Erro ao criar Usuario"
 */
router.post('/register', register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: "Login do Usuario"
 *     description: "Autentica o Usuario e gera um token JWT."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "pipico@gmail.com"
 *               password:
 *                 type: string
 *                 example: "senha123"
 *     responses:
 *       200:
 *         description: "Login bem-sucedido"
 *       400:
 *         description: "Credenciais invalidas"
 *       500:
 *         description: "Erro no servidor"
 */
router.post('/login',authMiddleware, login);

/**
 * @swagger
 * /api/auth/getAllUsers:
 *   get:
 *     summary: "Obter todos os Usuarios"
 *     description: "Retorna uma lista de todos os Usuarios no sistema."
 *     responses:
 *       200:
 *         description: "Lista de Usuarios"
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "63d9f0b8e4b0b6c5e9f2b2f2"
 *                   name:
 *                     type: string
 *                     example: "pipico"
 *                   email:
 *                     type: string
 *                     example: "pipico@gmail.com"
 *                   role:
 *                     type: string
 *                     example: "admin"
 *       500:
 *         description: "Erro ao obter Usuarios"
 */
router.get('/getAllUsers', authMiddleware, getAllUsers);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   put:
 *     summary: "Atualizar Usuario"
 *     description: "Atualiza os dados de um Usuario especifico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID do Usuario a ser atualizado"
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "pipico Silva"
 *               email:
 *                 type: string
 *                 example: "pipico@gamil.com"
 *               role:
 *                 type: string
 *                 example: "user"
 *     responses:
 *       200:
 *         description: "Usuario atualizado com sucesso"
 *       400:
 *         description: "Erro ao atualizar Usuario"
 *       404:
 *         description: "Usuario não encontrado"
 *       500:
 *         description: "Erro no servidor"
 */
router.put('/update/:id', authMiddleware, updateUser);

/**
 * @swagger
 * /api/auth/users/{id}:
 *   delete:
 *     summary: "Deletar Usuario"
 *     description: "Deleta um Usuario especifico."
 *     parameters:
 *       - name: "id"
 *         in: "path"
 *         required: true
 *         description: "ID do Usuario a ser deletado"
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: "Usuario deletado com sucesso"
 *       404:
 *         description: "Usuario não encontrado"
 *       500:
 *         description: "Erro no servidor"
 */
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;
