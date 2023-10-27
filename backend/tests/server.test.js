const request = require('supertest');
const app = require('../server');

describe('Server Endpoints', () => {
  it('should fetch all countries', async () => {
    const res = await request(app).get('/allCountries');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

    it('should fetch a specific country', async () => {
        const res = await request(app).get('/country/Canada');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].name.common).toEqual('Canada');
    });

    it('should fetch countries by letter', async () => {
        const res = await request(app).get('/countriesByLetter/c');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body[0].name.common).toEqual('Cocos (Keeling) Islands');
    });
});
