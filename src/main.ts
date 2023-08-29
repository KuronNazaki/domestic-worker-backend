import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { ConfigService } from '@nestjs/config'
import { logger } from './utils/logger'
import { VersioningType } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const PORT = +configService.get('PORT') || 3000
  app.enableVersioning({
    type: VersioningType.URI,
  })

  await app.listen(PORT, () =>
    logger.log(`Nest server is running on port ${PORT}`)
  )
}
bootstrap()
