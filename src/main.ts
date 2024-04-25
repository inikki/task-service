import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/hello-world/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task service API')
    .setDescription(
      'Simple RESTful API built with Node.js that allows users to create and manage tasks.',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}

bootstrap();
