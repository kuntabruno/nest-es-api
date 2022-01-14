import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

const mongoUrl =
  process.env.MONGOHQ_URL ||
  'mongodb://' +
    (process.env.DB_PORT_27017_TCP_ADDR || '127.0.0.1') +
    '/es-api';
const mongooseModule = MongooseModule.forRoot(`${mongoUrl}`);

@Module({
  imports: [ProductsModule, ConfigModule.forRoot(), mongooseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
