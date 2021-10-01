import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
  app.use(cookieParser())
  await app.listen(process.env.PORT)
}

bootstrap()
