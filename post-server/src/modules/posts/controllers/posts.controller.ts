import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { get } from 'http';
import { PostsService } from '../services/posts.service';
import { bidDto, filterDto, post } from '../interfaces/post.dto.interface'

@Controller('posts')
export class PostsController {
    constructor(private posts: PostsService) { }
    /**
     *get all posts from post service
     * can be only specific data to decrease load and use get post by id 
     * @return {*}  {Promise<post[]>}
     * @memberof PostsController
     */
    @Get()
    getPosts():Promise<post[]> {
        return this.posts.getPosts();
    }
    @Get()
    getSoldPosts(): Promise<post[]> {
        return this.posts.getSoldPosts();
    }
    /**
     *get post by id 
     *
     * @param {number} id
     * @return {*}  {Promise<post>}
     * @memberof PostsController
     */
    @Get(':id')
    getPost(@Param('id') id: number): Promise<post> {
        // (id == -1)
        // this.posts.populate(); 
        // (id != -1)
        return this.posts.getPost(id);
    }

    @Post()
    makeBid(@Body() bid: bidDto): Promise<post> {
        return this.posts.makeBid(bid);
    }
    @Post()
    getPostsFiltered(@Body() filter: filterDto): Promise<post[]> {
        return this.posts.getPostsFiltered(filter);
    }
}