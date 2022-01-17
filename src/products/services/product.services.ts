import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { random } from 'lodash';
import { commerce } from '@faker-js/faker';

import { Product, ProductDocument } from '../models/product.model';
import { CreateProductDto } from '../dto/created-product.dto';
import { PaginatedResponseDto } from 'src/generics/paginated-response-dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  createProducts(): Promise<Product[]> {
    return new Promise(async (resolve) => {
      const total = 10;
      let products: Product[] = [];
      for (let i = 0; i < total; i++) {
        products = [...products, await this.generateProduct()];
        if (i === total - 1) {
          resolve(products);
        }
      }
    });
  }

  private generateProduct(): Promise<Product> {
    const price = commerce.price(60, 130);
    const additionalCost = random(20, 55);
    const salePrice = (parseFloat(price) + additionalCost).toFixed(2);
    const product: CreateProductDto = {
      name: commerce.productName(),
      description: commerce.productDescription(),
      category: commerce.department(),
      price,
      salePrice,
    };
    return this.createProduct(product);
  }

  async createProduct(createdProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createdProductDto);
    return createdProduct.save();
  }

  async findAll(
    page?: number,
    perPage?: number,
  ): Promise<PaginatedResponseDto<Product>> {
    page = page && typeof page === 'number' ? page : 0;
    perPage = perPage && typeof perPage === 'number' ? perPage : 200;
    const checkedProducts = await this.findProducts(page, perPage);
    if (checkedProducts.length)
      return PaginatedResponseDto.GeneratePaginatedResponse<Product>(
        checkedProducts.length,
        perPage,
        page,
        checkedProducts,
      );
    await this.createProducts();
    const dbProducts = await this.findProducts(page, perPage);
    return PaginatedResponseDto.GeneratePaginatedResponse<Product>(
      dbProducts.length,
      perPage,
      page,
      dbProducts,
    );
  }

  async findProducts(page: number, limit: number): Promise<Product[]> {
    return this.productModel
      .find()
      .skip(page * limit)
      .limit(limit + 1)
      .exec();
  }
}
