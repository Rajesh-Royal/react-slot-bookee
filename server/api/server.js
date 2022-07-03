import Hapi from 'hapi';
import { routes } from './shifts-mock-api';

const server = new Hapi.Server({
  host: '127.0.0.1',
  port: '8080',
  routes: {
    cors: { origin: 'ignore' },
  },
});

async function main() {
  server.realm.modifiers.route.prefix = "/shifts";
  server.route(routes);

  await server.start();

  console.info(`✅  API server is listening at ${server.info.uri.toLowerCase()}`);
}
process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

main();
