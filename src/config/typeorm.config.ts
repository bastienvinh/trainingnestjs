import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'bastien',
  port: 5432,
  password: 'qwerty',
  database: 'nest-database',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true
}