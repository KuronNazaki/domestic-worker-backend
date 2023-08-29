import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  EnvironmentVariableKey,
  NodeEnvironment,
} from '../../constants/environment.constant'
import * as fs from 'fs'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(EnvironmentVariableKey.DB_HOST),
        port: configService.get(EnvironmentVariableKey.DB_PORT),
        username: configService.get(EnvironmentVariableKey.DB_USERNAME),
        password: configService.get(EnvironmentVariableKey.DB_PASSWORD),
        database: configService.get(EnvironmentVariableKey.DB_DATABASE),
        logging: true,
        extra: { charset: 'utf8mb4_unicode_ci' },
        autoLoadEntities: true,

        // Check SSL for production
        ssl:
          configService.get(EnvironmentVariableKey.SSL_CA_CERTIFICATES) ===
          NodeEnvironment.DEVELOPMENT
            ? {
                ca: fs.readFileSync(EnvironmentVariableKey.SSL_CA_CERTIFICATES),
              }
            : {},

        // Only enable this option if your application is in development,
        // otherwise use TypeORM migrations to sync entity schemas:
        // https://typeorm.io/#/migrations
        synchronize:
          configService.get(EnvironmentVariableKey.NODE_ENV) ===
          NodeEnvironment.DEVELOPMENT,
      }),
    }),
  ],
})
export class PostgresDatabaseModule {}
