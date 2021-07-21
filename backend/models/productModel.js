import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
    {
        reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        name: { type: String, required: true },
        comment: { type: String, required: true },
        rating: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        category: { type: String, required: true },
        gender: { type: String, required: true },
        lensMaterial: { type: String, required: false },
        frameMaterial: { type: String, required: true },
        style: { type: String, required: true },
        lensColor: { type: String, required: false },
        frameColor: { type: String, required: true },
        lensProtection: { type: String, required: true },
        description: { type: String, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        reviews: [reviewSchema],
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);
const ProductReview = mongoose.model('Review', reviewSchema);

export default Product;