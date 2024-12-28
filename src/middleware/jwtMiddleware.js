const jwt = require('jsonwebtoken');
const Session = require('../models/Session');

const validateToken = async (req, res, next) => {
  const sessionToken = req.header('Authorization')?.split(' ')[1];

  if (!sessionToken) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const sessionId = jwt.verify(sessionToken, process.env.JWT_SECRET);

    // Buscar la sesión en la base de datos
    const session = await Session.findOne({ sessionToken: sessionId.id });

    // Validar la sesión
    if (!session) {
      return res.status(401).json({ message: 'Sesión no válida' });
    }
    if (!session.isActive) {
      return res.status(401).json({ message: 'Sesión inactiva' });
    }
    if (new Date() > session.expiresAt) {
      return res.status(401).json({ message: 'Sesión expirada' });
    }

    // Adjuntar el ID del usuario al objeto req para uso posterior
    req.user = session.userId;

    next();
  } catch (error) {
    console.error('Error al validar la sesión:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = validateToken;
