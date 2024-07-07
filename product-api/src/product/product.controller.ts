import { Controller, Post } from '@nestjs/common'
import { ProductService } from './product.service'
import { CreateProductDto } from './dtos/create-product.dto'

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  createProduct(createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto)
  }
}
