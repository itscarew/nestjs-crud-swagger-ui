import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ItemsModule } from './items/items.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('Items restful api')
    .setDescription('A documentation for Items')
    .setVersion('1.0')
    .addTag('Items')
    .build();
  const apppDocument = SwaggerModule.createDocument(app, options, {
    include: [ItemsModule],
  });
  SwaggerModule.setup('api', app, apppDocument);
  await app.listen(3000);
}
bootstrap();
