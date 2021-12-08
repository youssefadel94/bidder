import * as mongoose from 'mongoose';

export /** @type {*} */
const PostSchema = new mongoose.Schema({
    userId: Number,
    id: Number,
    title: String,
    body: String,
    startingBid: Number,
    currentBid: Number,
    bids: Array,
    highestBidder: String,
    highestBidderId: Number,
    status: String,
    createdAt: Date,
    updatedAt: Date,
    expiryDate: Date,
})