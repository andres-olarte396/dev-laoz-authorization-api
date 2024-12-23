const express = require('express');
const { checkPermission } = require('../controllers/authorizationController');
const validateToken = require('../middleware/jwtMiddleware');

const router = express.Router();

/**
 * @swagger
 * /api/authorization/validate:
 *   post:
 *     summary: Valida el token JWT y verifica permisos
 *     tags: [Authorization]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               requiredPermission:
 *                 type: string
 *                 example: read
 *     responses:
 *       200:
 *         description: Permiso concedido
 *       403:
 *         description: Permiso denegado
 *       401:
 *         description: Token inválido o expirado
 */
router.post('/validate', validateToken, checkPermission);

module.exports = router;
