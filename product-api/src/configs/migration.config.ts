import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfig } from './orm.config';
import { ConfigService } from '@nestjs/config';
import 'dotenv/config';

const getDataSource = () => {
  const config = new TypeOrmConfig(new ConfigService());
  return new DataSource({
    ...(config.createTypeOrmOptions() as DataSourceOptions),
  });
};

export default getDataSource();
