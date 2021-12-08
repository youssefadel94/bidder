import { Injectable } from '@nestjs/common';
import { bidDto, filterDto, post } from '../interfaces/post.dto.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PostsService {
    getPostsFiltered(filter: filterDto): Promise<post[]> {
        return this.PostModel.find(filter).exec();
    }
    constructor(@InjectModel('Post') private readonly PostModel: Model<post>) { }

    /**
     *get posts from the db
     *
     * @return {*}  {Promise<post[]>}
     * @memberof PostsService
     */
    async getPosts(): Promise<post[]> {
        // return this.posts;
        return await this.PostModel.find({ status: 'open' }).exec();;
    }
    async getSoldPosts(): Promise<post[]> {
        // return this.posts;
        return await this.PostModel.find({ status: 'closed' }).exec();;
    }
    /**
     *get post from db by id
     *
     * @param {number} id
     * @return {*}  {Promise<post>}
     * @memberof PostsService
     */
    async getPost(id: number): Promise<post> {
        // return this.posts.find((item) => item.id === id);
        return await this.PostModel.findOne({ id: id });
    }
    async makeBid(bid:bidDto): Promise<post> {
        bid.post.highestBidderId = bid.userId;
        bid.post.bids.push(bid.amount);
        bid.post.currentBid = bid.amount;

        return await this.PostModel.findOneAndUpdate({ id: bid.post.id }, bid.post, { new: true });
    }
    // async populate(): Promise<void> {
    //     this.posts.forEach(post => {
    //         this.create(post);
    //     })
    //     // return this.create(this.posts[1]);
    // }
    // async create(post: post): Promise<post> {
    //     const newPost = new this.PostModel(post);
    //     return await newPost.save();
    // }

    private readonly posts: post[] = [
        {
            postId: 1,
            id: 1,
            title:
                'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: 'open',
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        },
        {
            postId: 1,
            id: 2,
            title: 'qui est esse',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "two"
            , body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        },
        {
            postId: 1,
            id: 3,
            title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "two"
            , body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        },
        {
            postId: 1,
            id: 4,
            title: 'eum et est occaecati',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "two"
            , body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
        },
        {
            postId: 1,
            id: 5,
            title: 'nesciunt quas odio',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
        },
        {
            postId: 1,
            id: 6,
            title: 'dolorem eum magni eos aperiam quia',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
        },
        {
            postId: 1,
            id: 7,
            title: 'magnam facilis autem',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
        },
        {
            postId: 1,
            id: 8,
            title: 'dolorem dolore est ipsam',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
        },
        {
            postId: 1,
            id: 9,
            title: 'nesciunt iure omnis dolorem tempora et accusantium',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "one"
            , body: 'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
        },
        {
            postId: 1,
            id: 10,
            title: 'optio molestias id quia eum',
            startingBid: 100,
            currentBid: 100,
            bids:[],
            
            highestBidderId: 0,
            status: "open",
            createdAt: new Date(),
            updatedAt: new Date(),
            expiryDate: new Date(),
            category: "three"
            , body: 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
        },
    ];

}
