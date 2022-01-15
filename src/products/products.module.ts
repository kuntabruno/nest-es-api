import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './controllers/product.controller';
import { Product, ProductSchema } from './models/product.model';
import { ProductService } from './services/product.services';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
