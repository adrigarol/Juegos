import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
  });

  app.use(
    session({
      secret: '1234', // Clave para cifrar la sesión
      resave: true, // Refresca la sesión en cada nuevo acceso
      saveUninitialized: false, // Guarda las sesiones aun sin haberse completad
      expires: new Date(Date.now() + 30 * 60 * 1000), // La sesión expirará en
    }),
  );

  app.useStaticAssets(__dirname + '/../public', { prefix: 'public' });
  app.useStaticAssets(__dirname + '/../node_modules/bootstrap/dist');
  app.setViewEngine('njk');

  await app.listen(3000);
}
bootstrap();
