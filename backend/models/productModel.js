import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a product name'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            default: 0,
        },
        image: {
            type: String,
            required: [true, 'Please add an image URL'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
        },
        countInStock: {
            type: Number,
            required: [true, 'Please add stock count'],
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', productSchema);
export default Product;