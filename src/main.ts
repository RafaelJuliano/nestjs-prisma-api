import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundInterceptor } from './common/interceptors/NotFound.interceptor';
import { UnauthorizedInterceptor } from './common/interceptors/Unauthorized.interceptor';
import { ConflictInterceptor } from './common/interceptors/Conflict.interceptor';
import { DatabaseInterceptor } from './common/interceptors/Database.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Simple Blog')
    .setDescription('The Simple Blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.useGlobalInterceptors(new ConflictInterceptor())
  app.useGlobalInterceptors(new DatabaseInterceptor())
  app.useGlobalInterceptors(new NotFoundInterceptor())
  app.useGlobalInterceptors(new UnauthorizedInterceptor())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
