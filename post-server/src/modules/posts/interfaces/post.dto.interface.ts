/**
 *post interface
 * @param {number} postId
 * @param {number} id
 * @param {string} title
 * @param {string} body
 * @export
 * @interface post
 */
export interface post {
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
    post: post;
}
export interface filterDto {
    status: "open";
    bid: { $gte: number };
    category: string;//\bMac\b.*\bExchangeWebServices\b
}
export interface userDto {
    id: number;
    name: string;
    email: string;
    password: string;
}
