import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from '../models/product.model';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createdProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createdProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<ProductDocument[]> {
    return await this.productModel.find().exec();
  }
}
