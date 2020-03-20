const request = require('supertest')
const app = require('../src/app')
const user = require('../src/models/users')

beforeAll(async () => {
    await user.deleteMany()
})


test('Should call GET method Successfuly', async () => {
    await request(app).get('/users').expect(200)
    
})
test('Should call POST method Successfuly and create a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Anderson Sendreto teste',
            email: 'sendreto@live.com',
            password: 'teste de senha'
        })
        .expect(201)
})