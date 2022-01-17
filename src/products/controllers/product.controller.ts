import { Get, Controller, OnModuleInit } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiPaginatedResponse } from 'src/decorators/paginated-response.decorator';
import { PaginatedResponseDto } from 'src/generics/paginated-response-dto';
import { ProductDto } from 'src/products/dto/product.dto';
import { ProductService } from 'src/products/services/product.services';

@ApiTags('products')
@Controller('products')
@ApiExtraModels(PaginatedResponseDto)
export class ProductsController implements OnModuleInit {
  constructor(private readonly productSvc: ProductService) {}

  onModuleInit() {
    console.log(getSchemaPath(ProductDto));
  }

  @Get()
  @ApiOperation({ description: 'List products' })
  @ApiPaginatedResponse(ProductDto)
  getProducts(): any {
    return this.productSvc.findAll().then((products) => {
      return products;
    });
  }
}
