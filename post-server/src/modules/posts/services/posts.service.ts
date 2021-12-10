import { Injectable } from '@nestjs/common';
import { bidDto, bot, filterDto, post } from '../interfaces/post.dto.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class PostsService {


    constructor(@InjectModel('Post') private readonly PostModel: Model<post>) { }
    post: post[] = [];
    bots: bot[] = [];
    makeBidBot(bot: bot): bot {
        // check if this.bots includes bot using the userName parameter
        // if not, add it
        // if it does, check if the limit is higher than the current 
        // if it is, update the bot with the new limit
        // if it is not, do nothing and return the bot
        let botIndex = this.bots.findIndex(item => item.userName === bot.userName);
        if (botIndex === -1) {
            this.bots.push(bot);
        } else {
            if (this.bots[botIndex].limit < bot.limit) {
                this.bots[botIndex].limit = bot.limit;
            }
            //check if this.bots[botIndex].posts doesn't contains all of the posts in bot.posts
            //if it doesn't, add that post to the this.bots[botIndex].posts
            //if it does, do nothing
            this.bots[botIndex].posts.forEach(post => {
                if (!this.bots[botIndex].posts.includes(post)) {
                    this.bots[botIndex].posts.push(post);
                }
            })
            // if (this.bots[botIndex].posts.length < bot.posts.length) {
            //     this.bots[botIndex].posts = bot.posts;
            // }
            
            return this.bots[botIndex]
        }
        return null;
    }
    runBitBots(post : post, currentBid: number, userId) {
        this.bots.forEach(bot => {
            let biding = this.isBotBiding(post.id, bot);
            if (biding && bot.userId!==userId) {
                let bid = {
                    userId: bot.userId,
                    post: post,
                    amount: currentBid + 1,
                    userName: bot.userName
                }
            this.makeBid(bid)
            }
        })
    }
    
    isBotBiding(postId: number, bot: bot): number {
//check if bot.posts contains postId in post.id
//if it does, return true
//if it does not, return false
        let postIndex = bot.posts.findIndex(item => item.id === postId);
        if (postIndex === -1) {
            return null;
        } else {
            return postIndex;
        }
    }

    getBot(userId,username): bot {
        let botIndex = this.bots.findIndex(item => item.userId === userId);
        if (botIndex === -1) {
            let bot = {
                
                id: 0,
                userId:0,
                userName: username,
                limit: 0,
                posts: [],
                alert: 0,
                reserved: 0,
            }
            return bot;
        } else {
            return this.bots[botIndex];
        }
    }
        
    /**
     *get posts from the db
     *
     * @return {*}  {Promise<post[]>}
     * @memberof PostsService
     */
    cachePosts($subject: BehaviorSubject<post[]>) {
        this.getPosts().then(posts => {
            this.post = posts;
            $subject.next(posts);
        })
    }
    async getPosts(): Promise<post[]> {
        // return this.posts;
        return await this.PostModel.find({ status: 'open' }).exec();
    }
    getChachedPosts(): post[] {
        return this.post;
    }
    async getSoldPosts(): Promise<post[]> {
        // return this.posts;
        return await this.PostModel.find({ status: 'closed' }).exec();
    }
    getPostsFiltered(filter: filterDto): Promise<post[]> {
        console.log(filter);
        
        return this.PostModel.find(filter).exec();
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

         
        let post = await this.PostModel.findOneAndUpdate({ id: bid.post.id }, bid.post, { new: true });
        this.runBitBots(bid.post, bid.amount, bid.userId);
        return post
    }
    async populate(): Promise<void> {
        this.posts.forEach(post => {
            this.create(post);
        })
        // return this.create(this.posts[1]);
    }
    async create(post: post): Promise<post> {
        const newPost = new this.PostModel(post);
        return await newPost.save();
    }

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
