import { UserModule } from './modules/user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth/auth.service';
import config from './config/keys'
import { UserService } from './modules/user/services/user/user.service';
@Module({
  imports: [PostsModule, MongooseModule.forRoot(config.mangoURI), AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, AuthService, UserService],
})
export class AppModule {}
