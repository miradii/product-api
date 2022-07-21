import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';
import helmet from "helmet";
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Configure Swagger
  app.use(helmet())
  app.enableCors()
  app.use(cookieParser())
  app.use(csurf({ cookie: true }))
  const config = new DocumentBuilder()
    .setTitle('Products API')
    .setDescription('A simple Rest API in Nest')
    .setVersion('1.0').addBearerAuth()
    .build();

  // binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe());

  //  apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const httpAdatper = app.getHttpAdapter()
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdatper))




  // config swagger module
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(process.env.PORT || 8080);
}
bootstrap();
