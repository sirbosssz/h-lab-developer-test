import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [ConfigModule],
})
export class TypeOrmConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  public getMigrationDirectory() {
    const directory = process.env.MODE === 'MIGRATION' ? 'src' : 'dist';
    return `${directory}/migrations/**/*{.ts,.js}`;
  }

  public getEntityDirectory() {
    const directory = process.env.MODE === 'MIGRATION' ? 'src' : 'dist';
    return join(directory, '**', '*.entity.{ts,js}');
  }

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get('DATABASE_HOST'),
      port: parseInt(this.configService.get('DATABASE_PORT')),
      username: this.configService.get('DATABASE_USER'),
      password: this.configService.get('DATABASE_PASSWORD'),
      database: this.configService.get('DATABASE_SCHEMA'),
      entities: [this.getEntityDirectory()],
      migrations: [this.getMigrationDirectory()],
      ssl: false,
      synchronize: false,
      logging: false,
      autoLoadEntities: true,
      migrationsRun: true,
    };
  }
}
