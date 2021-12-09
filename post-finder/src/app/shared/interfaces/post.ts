
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
export interface filterDto {
    status: "open";
    bid: { $gte: number };
    category: string;//\bMac\b.*\bExchangeWebServices\b
}