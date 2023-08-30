export enum EnvironmentVariableKey {
  DB_HOST = 'DB_HOST',
  DB_PORT = 'DB_PORT',
  DB_USERNAME = 'DB_USERNAME',
  DB_PASSWORD = 'DB_PASSWORD',
  DB_DATABASE = 'DB_DATABASE',
  PORT = 'PORT',
  NODE_ENV = 'NODE_ENV',
  SSL_CA_CERTIFICATES = 'SSL_CA_CERTIFICATES',
  DATABASE_LOCATION = 'DATABASE_LOCATION',
}

export enum NodeEnvironment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export enum DatabaseLocation {
  LOCAL = 'local',
  REMOTE = 'remote',
}
