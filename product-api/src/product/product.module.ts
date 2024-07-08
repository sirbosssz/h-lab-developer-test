import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Languages } from './entities/language.entity'
import { Products } from './entities/product.entity'
import { ProductNames } from './entities/product-name.entity'
import { ProductDescriptions } from './entities/product-descriptions.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Languages,
      Products,
      ProductNames,
      ProductDescriptions,
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
