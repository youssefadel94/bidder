import { FilterPostsController, PostsController } from './controllers/posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, Post } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Post', schema: PostSchema}])],
  controllers: [PostsController, FilterPostsController],
  providers: [PostsService]
})
export class PostsModule {}
