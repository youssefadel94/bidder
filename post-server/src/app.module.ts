import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys'
@Module({
  imports: [PostsModule, MongooseModule.forRoot(config.mangoURI)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
