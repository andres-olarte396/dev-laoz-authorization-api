const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const validateToken = async (req, res, next) => {
  // Obtener el token de la cabecera Authorization
  const sessionToken = req.header('Authorization')?.split(' ')[1];

  // Verificar si se proporcionó el token
  if (!sessionToken) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verificar el token JWT
    const sessionId = jwt.verify(sessionToken, process.env.JWT_SECRET);

    // Buscar la sesión en la base de datos
    const session = await Session.findOne({ sessionToken: sessionId.sessionToken });

    // Validar la sesión
    if (!session) {
      return res.status(401).json({ message: 'Sesión no válida' });
    }

    // Verificar si la sesión está activa
    if (!session.isActive) {
      return res.status(401).json({ message: 'Sesión inactiva' });
    }

    // Comparar fechas en UTC para evitar problemas de zona horaria
    const nowUTC = new Date(new Date().toISOString());
    const expiresAtUTC = new Date(session.expiresAt).toISOString();

    // Verificar si la sesión ha expirado
    if (nowUTC > expiresAtUTC) {
      return res.status(401).json({ message: 'Sesión expirada' });
    }

    // Adjuntar el ID del usuario al objeto req para uso posterior
    req.user = session.userId.toString();

    next();
  } catch (error) {
    console.error('Error al validar la sesión:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = validateToken;
