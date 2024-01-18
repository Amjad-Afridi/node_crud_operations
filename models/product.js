const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate(value){
            if(value.length < 3)
            {
                throw new Error('Name is Too Short!')
            }
            else if(value.length > 15)
            {
                throw new Error('Name is Too long!')
            }
        }
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is required']
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model('Product', productSchema)