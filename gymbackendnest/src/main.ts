import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { PORT } from './config/constants';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  /***The statement app.useGlobalPipes(new ValidationPipe()); in a NestJS application sets up a global ValidationPipe. This pipe is a powerful tool for enforcing data validation rules across your entire application. Global Application: 
By using useGlobalPipes(), the ValidationPipe is applied to every incoming request, eliminating the need to manually add validation to individual route handlers or controllers.
 */
  app.useGlobalPipes(new ValidationPipe());
  /*** how to configure Cross-Origin Resource Sharing (CORS) in a NestJS application using the app.enableCors() method. This method allows you to control which origins (domains) are permitted to access your API resources. */
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  });
  app.use(cookieParser());

  app.use(
    session({
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 3600000,
      },
    }),
  );

  app.setGlobalPrefix('/api/');

  await app.listen(PORT ?? 3000);
  console.log(`🚀 Application is running on: ${await app.getUrl()}`);
  console.log(`🚀 Application is running on: ${PORT}`);
}
bootstrap();
