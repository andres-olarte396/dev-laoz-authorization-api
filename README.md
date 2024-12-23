# 🚀 Authorization API

## 📝 Descripción

La **Authorization API** proporciona servicios para validar tokens JWT y verificar los permisos asociados a los usuarios. Es un componente esencial para implementar una arquitectura de microservicios segura.

## Características

- Validación de tokens JWT generados por el servicio de autenticación.
- Verificación de permisos específicos para controlar el acceso a recursos.
- Documentación con Swagger.
- Middleware para la gestión de seguridad y permisos.

---

## 🚚 Requisitos Previos

1. **Node.js** v16 o superior.
2. **MongoDB** para la gestión de datos relacionados con usuarios y permisos.
3. **Dependencias instaladas**:
   - Express
   - jsonwebtoken
   - mongoose
   - dotenv
   - swagger-jsdoc
   - swagger-ui-express

---

## 🛠️ Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd authorization-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env`:

   ```env
   PORT=6000
   JWT_SECRET=clave_secreta
   MONGO_URI=mongodb://localhost:27017/authorization-api
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

   La API estará disponible en `http://localhost:6000`.

---

## Endpoints

### **Validar Token y Permisos**

#### **POST** `/api/authorization/validate`

Valida un token JWT y verifica si el usuario tiene los permisos requeridos.

- **Headers**:

  ```plaintext
  Authorization: Bearer <JWT_TOKEN>
  ```

- **Body**:

  ```json
  {
    "requiredPermission": "read"
  }
  ```

- **Responses**:

  - **200 OK**: Permiso concedido.

    ```json
    {
      "message": "Permiso concedido"
    }
    ```

  - **403 Forbidden**: Permiso denegado.

    ```json
    {
      "message": "Permiso denegado"
    }
    ```

  - **401 Unauthorized**: Token inválido o expirado.

    ```json
    {
      "message": "Token inválido o expirado"
    }
    ```

---

## 🕸 Middleware

### `validateToken`

Middleware que valida el token JWT proporcionado en los encabezados de la solicitud.

### 🪧 Uso:

```javascript
const validateToken = require('./middleware/jwtMiddleware');
router.post('/validate', validateToken, checkPermission);
```

---

## Configuración de Swagger

La documentación de Swagger está disponible en:

```plaintext
http://localhost:6000/api-docs
```

Incluye detalles sobre todos los endpoints disponibles en la API.

---

## 🧪 Desarrollo y Pruebas

1. Ejecutar en modo desarrollo:

   ```bash
   npm run dev
   ```

2. Ejecutar pruebas (si están configuradas):

   ```bash
   npm test
   ```

---

## 📂 Estructura del Proyecto

```plaintext
authorization-api/
│
├── 📂 src/
│   ├── 📂 config/
│   │   └── 📄 db.js
│   │   └── 📄 swagger.js
│   ├── 📂 controllers/
│   │   └── 📄 authorizationController.js
│   ├── 📂 middleware/
│   │   └── 📄 jwtMiddleware.js
│   ├── 📂 models/
│   │   └── 📄 User.js
│   ├── 📂 routes/
│   │   └── 📄 authorizationRoutes.js
│   ├── 📂 utils/
│   │   └── 📄 generateResponse.js
│   └── 📄 server.js
├── 📄 .env
├── 📄 package.json
├── 📄 package-lock.json
└── 📄 README.md
```

---

## 🪧 **Tecnologías Utilizadas**

- **Node.js**: Plataforma para construir la API.
- **Express.js**: Framework para manejar rutas y middlewares.
- **MongoDB**: Base de datos para almacenar usuarios.
- **jsonwebtoken**: Biblioteca para la generación y validación de tokens JWT.
- **dotenv**: Manejo de variables de entorno.

## 👨‍💻 Contribución

1. Haz un fork del repositorio.

2. Crea una nueva rama para tus cambios:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz commits:

   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```

4. Sube tus cambios al repositorio remoto:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request.

---

## 📜 Licencia

Este proyecto está licenciado bajo los términos de la licencia MIT. Consulta el archivo `LICENSE` para más detalles.
