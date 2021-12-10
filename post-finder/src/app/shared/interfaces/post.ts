
export interface Post {
    postId: number;
    id: number;
    title: string;
    body: string;
    startingBid: number;
    currentBid: number;
    bids: number[];
    highestBidderId: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    expiryDate: Date;
    category: string;
}
export interface bidDto {
    userId: number;
    amount: number;
    post: Post;
}
export interface bot {
    id: number;
    userId: number;
    userName: string;
    limit: number;
    posts: Post[];
    alert: number;
    reserved: number;
}
export interface filterDto {
    status: "open";
    bid: { $gte: number };
    category: string;//\bMac\b.*\bExchangeWebServices\b
}