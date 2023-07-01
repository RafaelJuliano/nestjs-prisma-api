import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundInterceptor } from './common/interceptors/NotFound.interceptor';
import { UnauthorizedInterceptor } from './common/interceptors/Unauthorized.interceptor';
import { ConflictInterceptor } from './common/interceptors/Conflict.interceptor';
import { DatabaseInterceptor } from './common/interceptors/Database.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
