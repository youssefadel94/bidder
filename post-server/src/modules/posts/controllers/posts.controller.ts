import { Body, Controller, Get, Param, Post, Sse, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { PostsService } from '../services/posts.service';
import { bidDto, filterDto, post, bot } from '../interfaces/post.dto.interface'
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';

@Controller('posts')
export class PostsController {
    $subject = new BehaviorSubject<post[]>([]);
    constructor(private posts: PostsService) {
        // this.populate();
    }
    /**
     *get all posts from post service
     * can be only specific data to decrease load and use get post by id 
     * @return {*}  {Promise<post[]>}
     * @memberof PostsController
     */
    @UseGuards(JwtAuthGuard)
    @Get()
    getPosts(): Promise<post[]> {
        return this.posts.getPosts();
    }

    // @UseGuards(JwtAuthGuard)
    // @Get()
    // getSoldPosts(): Promise<post[]> {
    //     return this.posts.getSoldPosts();
    // }

    /**
     *get post by id 
     *
     * @param {number} id
     * @return {*}  {Promise<post>}
     * @memberof PostsController
     */
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getPost(@Param('id') id: number): Promise<post> {
        // (id == -1)
        // this.posts.populate(); 
        // (id != -1)
        return this.posts.getPost(id);
    }
    @UseGuards(JwtAuthGuard)
    @Post()
    makeBid(@Body() bid: bidDto): Promise<post> {
        let post = this.posts.makeBid(bid);
        post.then(() => {
            this.posts.cachePosts(this.$subject);
        })
        return post;
    }
    @UseGuards(JwtAuthGuard)
    @Post('/makeBot')
    makeBidBot(@Body() bot: bot): bot {
        return this.posts.makeBidBot(bot);
    }
    @UseGuards(JwtAuthGuard)
    @Post('/getBot')
    getBidBot(@Body() user: {userId:number, userName:string}): bot {
        return this.posts.getBot(user.userId, user.userName);
    }
    // @UseGuards(JwtAuthGuard)
    // @Post()
    // getPostsFiltered(@Body() filter: filterDto): Promise<post[]> {
    //     return this.posts.getPostsFiltered(filter);
    // }
    @UseGuards(JwtAuthGuard)
    @Post('filter')
    getPostsFiltered(@Body() filter: filterDto): Promise<post[]> {
        return this.posts.getPostsFiltered(filter);
    }
    @Get('migrate')
    populate(): Promise<void> {
        return this.posts.populate();
    }
    // @UseGuards(JwtAuthGuard) 
    @Sse('sse')
    sse(): Observable<post[]> {
        return this.$subject.asObservable()
    }
}

