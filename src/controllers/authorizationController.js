const User = require('../models/User'); // Asegúrate de tener un modelo para los usuarios

exports.checkPermission = async (req, res) => {
  try {
    // Extraer los datos necesarios del usuario autenticado y de la solicitud
    const userId = req.user;
    const { requiredPermission } = req.body;

    if (!userId || !requiredPermission) {
      return res.status(400).json({ message: 'Faltan datos necesarios para validar el permiso' });
    }

    // Buscar al usuario en la base de datos para obtener sus permisos actualizados
    const user = await User.findById(userId).select('permissions');

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Validar si el usuario tiene el permiso requerido
    const hasPermission = user.permissions.includes(requiredPermission);

    if (hasPermission) {
      return res.status(200).json({
        authorized: true,
        message: 'Permiso concedido'
      });
    }

    return res.status(403).json({ message: 'Permiso denegado' });
  } catch (error) {
    console.error('Error al verificar permisos:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
