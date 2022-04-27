import App from '@/app';
import routes from '@/routes/index.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App(routes);

//未捕捉的异常
process.on('unhandledRejection', (reason, p) => {
  console.log('Promise: ', p, 'Reason: ', reason);
  // do something
});

app.listen();
