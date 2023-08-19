export default (): Record<string, any> => ({
  databaseConnection: process.env.DATABASE_CONNECTION || 'postgres',
  databaseHost: process.env.POSTGRES_HOST,
  databasePort: parseInt(process.env.POSTGRES_PORT) || 5432,
  databaseUsername: process.env.POSTGRES_USER,
  databasePassword: process.env.POSTGRES_PASSWORD,
  databaseName: process.env.POSTGRES_DB,
  max: parseInt(process.env.DB_POOL_MAX),
  min: parseInt(process.env.DB_POOL_MIN),
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT),
});
