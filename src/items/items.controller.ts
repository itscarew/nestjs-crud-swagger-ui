import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item, ItemStatus } from './interfaces/item.interface';

import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Items')
@Controller('items')
@UsePipes(ValidationPipe)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @ApiResponse({ status: 200 })
  @Get()
  findAll(@Res() res): Promise<Item[]> {
    return this.itemsService.findAll().then(item => {
      return res.status(HttpStatus.OK).json({
        statusCode: 200,
        data: item,
      });
    });
  }

  @ApiResponse({ status: 200 })
  @Get(':id')
  findOne(@Res() res, @Param() param): Promise<Item> {
    return this.itemsService.findOne(param.id).then(item => {
      if (!item) throw new NotFoundException('Item does not exist!');
      return res.status(HttpStatus.OK).json({ statusCode: 200, data: item });
    });
  }

  @ApiResponse({ status: 201 })
  @Post()
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemsService.createItem(createItemDto);
  }

  @ApiResponse({ status: 200 })
  @Delete(':id')
  deleteItem(@Param() param): Promise<Item> {
    return this.itemsService.deleteItem(param.id);
  }

  @ApiResponse({ status: 200 })
  @Put(':id')
  updateItem(
    @Param() param,
    @Body()
    updateItemDto: CreateItemDto,
  ): Promise<Item> {
    return this.itemsService.updateItem(param.id, updateItemDto);
  }

  @ApiResponse({ status: 200 })
  @Put(':id/status')
  updateItemStatus(
    @Param() param,
    @Body('status') status: ItemStatus,
  ): Promise<Item> {
    return this.itemsService.updateItemStatus(param.id, status);
  }
}
