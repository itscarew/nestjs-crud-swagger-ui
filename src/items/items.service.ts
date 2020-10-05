import { Injectable } from '@nestjs/common';
import { Item, ItemStatus } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  findAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id).exec();
  }

  createItem(createItemDto: CreateItemDto): Promise<Item> {
    const item = new this.itemModel(createItemDto);
    return item.save();
  }

  deleteItem(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id).exec();
  }

  updateItem(id: string, updateItemDto: CreateItemDto): Promise<Item> {
    return this.itemModel
      .findByIdAndUpdate(id, updateItemDto, {
        new: true,
        useFindAndModify: false,
      })
      .exec();
  }

  updateItemStatus(id: string, status: ItemStatus): Promise<Item> {
    return this.itemModel
      .findByIdAndUpdate(
        id,
        { status },
        {
          new: true,
          useFindAndModify: false,
        },
      )
      .exec();
  }
}
