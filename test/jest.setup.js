
// Mock de jwt.verify para que siempre devuelva un objeto válido en los tests
jest.mock('jsonwebtoken', () => ({
	...jest.requireActual('jsonwebtoken'),
	verify: jest.fn(() => ({ id: 'tokenValido' })),
}));
