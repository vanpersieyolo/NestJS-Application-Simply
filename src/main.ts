declare const module: any;
import 'module-alias/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ResponseTransformInterceptor } from './interceptors/response.transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'typeorm';
import { ValidationConfig } from './config/validation.config';
import { loggerMiddleware } from './middlewares/logger.middleware';
import { ValidatorModule } from './validators/validator.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HTTPLoggingInterceptor } from './interceptors/request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.enableCors();
  const configService = app.get(ConfigService);

  app.use(loggerMiddleware);
  app.useGlobalInterceptors(new HTTPLoggingInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));
  app.setGlobalPrefix(configService.get<string>('apiPrefix' as never));

  useContainer(app.select(ValidatorModule), { fallbackOnErrors: true });

  const config = new DocumentBuilder()
    .setTitle('Api Docs')
    .setDescription('The order API description')
    .setVersion('1.0')
    .addServer(`${process.env.HOST}`)
    .addBearerAuth({
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = configService.get<number>('port' as never);
  if (module.hot) module.hot.accept();
  await app.listen(port);
  console.log(`Started on http(s)://localhost:${port}`);
  console.log(`Docs available on http(s)://localhost:${port}/api`);
}

bootstrap();
