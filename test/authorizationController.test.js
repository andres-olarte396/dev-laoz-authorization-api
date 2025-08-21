const request = require('supertest');
const app = require('../src/app');
jest.mock('../src/models/User');
jest.mock('../src/models/Session');

describe('POST /api/authorization/validate', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

        it('debe autorizar si el usuario tiene el permiso requerido', async () => {
            require('../src/models/User').findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue({ permissions: ['PERMISO_TEST'], _id: 'userId' })
            }));
            require('../src/models/Session').findOne.mockResolvedValue({ isActive: true, expiresAt: new Date(Date.now() + 10000), userId: 'userId' });

            const res = await request(app)
                .post('/api/authorization/validate')
                .set('Authorization', 'Bearer tokenValido')
                .send({ requiredPermission: 'PERMISO_TEST' });

            expect(res.status).toBe(200);
            expect(res.body.authorized).toBe(true);
        });


        it('debe denegar si el usuario no tiene el permiso requerido', async () => {
            require('../src/models/User').findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue({ permissions: ['OTRO_PERMISO'], _id: 'userId' })
            }));
            require('../src/models/Session').findOne.mockResolvedValue({ isActive: true, expiresAt: new Date(Date.now() + 10000), userId: 'userId' });

            const res = await request(app)
                .post('/api/authorization/validate')
                .set('Authorization', 'Bearer tokenValido')
                .send({ requiredPermission: 'PERMISO_TEST' });

            expect(res.status).toBe(403);
            expect(res.body.authorized).toBeUndefined();
        });


        it('debe responder 401 si la sesión está expirada', async () => {
            require('../src/models/User').findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue({ permissions: ['PERMISO_TEST'], _id: 'userId' })
            }));
            require('../src/models/Session').findOne.mockResolvedValue({ isActive: true, expiresAt: new Date(Date.now() - 10000), userId: 'userId' });

            const res = await request(app)
                .post('/api/authorization/validate')
                .set('Authorization', 'Bearer tokenValido')
                .send({ requiredPermission: 'PERMISO_TEST' });

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/expirada|expirado/i);
        });


        it('debe responder 401 si la sesión está inactiva', async () => {
            require('../src/models/User').findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue({ permissions: ['PERMISO_TEST'], _id: 'userId' })
            }));
            require('../src/models/Session').findOne.mockResolvedValue({ isActive: false, expiresAt: new Date(Date.now() + 10000), userId: 'userId' });

            const res = await request(app)
                .post('/api/authorization/validate')
                .set('Authorization', 'Bearer tokenValido')
                .send({ requiredPermission: 'PERMISO_TEST' });

            expect(res.status).toBe(401);
            expect(res.body.message).toMatch(/inactiva|inactivo/i);
        });


        it('debe responder 404 si el usuario no existe', async () => {
            require('../src/models/User').findById.mockImplementation(() => ({
                select: jest.fn().mockResolvedValue(null)
            }));
            require('../src/models/Session').findOne.mockResolvedValue({ isActive: true, expiresAt: new Date(Date.now() + 10000), userId: 'userId' });

            const res = await request(app)
                .post('/api/authorization/validate')
                .set('Authorization', 'Bearer tokenValido')
                .send({ requiredPermission: 'PERMISO_TEST' });

            expect(res.status).toBe(404);
            expect(res.body.message).toMatch(/no encontrado/i);
        });

    it('debe responder 400 si faltan datos necesarios', async () => {
        const res = await request(app)
            .post('/api/authorization/validate')
            .set('Authorization', 'Bearer tokenValido')
            .send({});

        expect(res.status).toBe(400);
        expect(res.body.message).toMatch(/faltan datos/i);
    });
});
