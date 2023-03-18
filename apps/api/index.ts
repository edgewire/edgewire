import Fastify from 'fastify'

const server = Fastify({})

server.get('/ping', async (request, reply) => {
  return { pong: 'it worked!' }
})

const start = async () => {
  try {
    await server.listen({ port: 4000 })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()