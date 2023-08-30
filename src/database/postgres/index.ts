import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import {
  DatabaseLocation,
  EnvironmentVariableKey,
  NodeEnvironment,
} from '../../constants/environment.constant'
import * as fs from 'fs'
import { DatabaseConstant } from 'src/constants/database.constant'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const currentNodeEnvironment = configService.get(
          EnvironmentVariableKey.NODE_ENV
        )
        const databaseLocation = configService.get(
          EnvironmentVariableKey.DATABASE_LOCATION
        )

        return {
          type: DatabaseConstant.TYPE,
          host: configService.get(EnvironmentVariableKey.DB_HOST),
          port: configService.get(EnvironmentVariableKey.DB_PORT),
          username: configService.get(EnvironmentVariableKey.DB_USERNAME),
          password: configService.get(EnvironmentVariableKey.DB_PASSWORD),
          database: configService.get(EnvironmentVariableKey.DB_DATABASE),
          logging: currentNodeEnvironment === NodeEnvironment.DEVELOPMENT,
          extra: { charset: DatabaseConstant.CHARSET },
          autoLoadEntities: true,

          // Check SSL for production
          ...(() =>
            currentNodeEnvironment === NodeEnvironment.PRODUCTION ||
            databaseLocation === DatabaseLocation.REMOTE
              ? {
                  ssl: {
                    ca: fs.readFileSync(
                      configService.get(
                        EnvironmentVariableKey.SSL_CA_CERTIFICATES
                      )
                    ),
                  },
                }
              : {})(),

          // Only enable this option if your application is in development,
          // otherwise use TypeORM migrations to sync entity schemas:
          // https://typeorm.io/#/migrations
          synchronize:
            currentNodeEnvironment === NodeEnvironment.DEVELOPMENT &&
            databaseLocation === DatabaseLocation.LOCAL,
        }
      },
    }),
  ],
})
export class PostgresDatabaseModule {}
