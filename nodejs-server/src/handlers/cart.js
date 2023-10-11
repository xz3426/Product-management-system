const db = require('../models');

exports.addProduct = async function (req, res, next){
    const {username, productId} = req.body;
    
    try{
        const user = await db.User.findOne({username});
        if(!user){
            return res.status(404).json({message:"User Not Found", ok:false});
        }
        const product = await db.Product.findById(productId);
        if(!product){
            return res.status(404).json({message:"Product Not Found", ok:false})
        }
        const existingCartItem = user.cart.find(cartItem => cartItem.product.equals(product._id));
        if (existingCartItem) {
            // If the product is already in the cart, increment the quantity by 1
            existingCartItem.quantity += 1;
        } else {
            // If the product is not in the cart, add it with a quantity of 1
            user.cart.push({ product: product._id, quantity: 1 });
        }
        await user.save();
        return res.status(200).json({ message: "Product Added Successfully", ok: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", ok: false });
    }
};

exports.removeProduct = async function (req,res,next){
    const {username, productId} = req.body;
    console.log(1);
    try{
        
        const user = await db.User.findOne({username});
        console.log(2);
        if(!user){
            return res.status(404).json({message:"User Not Found", ok:false});
        }
        console.log(3);
        user.cart = user.cart.filter(item => item.product.toString() !== productId.toString());
        await user.save();
        return res.status(200).json(user.cart);
    } catch (err) {
            return next(err);
    }
}


exports.updateQuantity = async function(req, res, next){
    const {username, productId,quantity} = req.body;
    try {
        const user = await db.User.findOne({username});
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        const product = user.cart.findIndex(i => i.product.toString() === productId);

        user.cart[product].quantity = quantity;
        
        await user.save;

        return res.status(200).json(user.cart);
    } catch (err) {
        return next(err);
    }
};

exports.checkout = async function (req, res, next) {
    const {username} = req.body;
    try {
        const user = await db.User.findOne({username}).populate('cart.product');
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }
        let total = 0;
        for(let item of user.cart) {
        total += item.quantity * item.product.price;
        }
        user.cart = [];
        await user.save();

        return res.status(200).json({ total: total });
    } catch (err) {
        return next(err);
    }
};

exports.fetchCart = async function (req, res, next) {
    const {username} = req.body;
    try {
        const user = await db.User.findOne({username}).populate('cart.product');
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json(user.cart);
    } catch (err) {
        return next(err);
    }
};

// // POST - /api/cart/checkout/:userId
// exports.checkout = async function (req, res, next) {
//   try {
//     const user = await db.User.findById(req.params.userId).populate('cart.product');
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     console.log("!!!!!!", user)
//     let total = 0;
//     for(let item of user.cart) {
//       total += item.quantity * item.product.price;
//     }

//     // Clear the cart
//     // user.cart = [];
//     // await user.save();

//     return res.status(200).json({ total: total });
//   } catch (err) {
//     return next(err);
//   }
// };


// // GET - /api/cart/:userId
// exports.getCartItems = async function (req, res, next) {
//   try {
//     const user = await db.User.findById(req.params.userId).populate('cart.product');
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     console.log("!!!!!!", user)

//     return res.status(200).json(user.cart);
//   } catch (err) {
//     return next(err);
//   }
// };



