import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { LoggerMiddleware } from '../middlewares/logger.middleware'
import { ConfigModule } from '@nestjs/config'
import { PostgresDatabaseModule } from '../database/postgres/index'
import { PostModule } from 'src/modules/post.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PostgresDatabaseModule,
    PostModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
