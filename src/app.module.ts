import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemsModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
