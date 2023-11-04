import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PostgresExceptionFilter } from './filters/postgres-exception.filter';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter(), new PostgresExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Transolyfer API')
    .setDescription('The Transolyfer API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, { swaggerOptions: {} });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`App Running on port ${PORT}`);
}
bootstrap();
