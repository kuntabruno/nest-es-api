import { Get, Controller } from '@nestjs/common';
import { ProductService } from '../services/product.services';

/* import * as _ from 'lodash'; */

@Controller('products')
export class ProductsController {
  constructor(private readonly productSvc: ProductService) {}

  @Get()
  getProducts(): any {
    return this.productSvc.findAll().then((products) => {
      return products;
    });
  }
}
