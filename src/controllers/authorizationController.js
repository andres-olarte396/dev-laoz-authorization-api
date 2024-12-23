exports.checkPermission = (req, res) => {
    const { permissions } = req.user;
    const { requiredPermission } = req.body;
  
    if (permissions && permissions.includes(requiredPermission)) {
      return res.status(200).json({ message: 'Permiso concedido' });
    }
  
    return res.status(403).json({ message: 'Permiso denegado' });
  };
  