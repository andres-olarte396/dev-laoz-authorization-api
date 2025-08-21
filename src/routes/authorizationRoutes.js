const express = require('express');
const { checkPermission } = require('../controllers/authorizationController');
const validateToken = require('../middleware/jwtMiddleware');

const router = express.Router();

/**
 * @openapi
 * /api/authorization/validate:
 *   post:
 *     summary: Valida el token JWT y verifica si el usuario tiene el permiso solicitado.
 *     description: |
 *       Endpoint para validar un token JWT y comprobar si el usuario tiene el permiso requerido.
 *       El token debe enviarse en el header Authorization como Bearer.
 *     tags:
 *       - Authorization
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requiredPermission
 *             properties:
 *               requiredPermission:
 *                 type: string
 *                 description: Permiso requerido a validar
 *                 example: "read:users"
 *     responses:
 *       200:
 *         description: Permiso concedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authorized:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Permiso concedido
 *       403:
 *         description: Permiso denegado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Permiso denegado
 *       401:
 *         description: Token inválido, sesión expirada o inactiva
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Sesión expirada
 *       400:
 *         description: Faltan datos necesarios para validar el permiso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Faltan datos necesarios para validar el permiso
 *       404:
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario no encontrado
 */
router.post('/validate', validateToken, checkPermission);

module.exports = router;
