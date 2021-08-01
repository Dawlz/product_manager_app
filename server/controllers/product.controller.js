const { Product, Users } = require('../models/product.model')


module.exports.index = (req, res) => {
	res.json({
		message: "Welcome to Product Manager"
	});
};

module.exports.createProduct = (req, res) => {
	const { title, price, quantity, description } = req.body;

	Product.create({
		title,
		price,
		quantity,
		description
	})
    .then(Product => Users.findByIdAndUpdate({_id:req.params.uid},
      {$push: {products: Product}}, {new:true})
      .then(Product => res.json(Product)))
      .catch(err => res.json(`An error occured as ${err}`));
};

module.exports.findAllUsers = (req, res) => {
  Users.find()
    .then( Users => res.json(Users) )
    .catch(err => res.json(err))
};

module.exports.findUserProducts = (req, res) => {
    Users.findOne({_id:req.params.uid})
        .then( Users => res.json(Users) )
        .catch(err => res.json(err))
};

module.exports.findOneUser = (req, res) => {
    Users.findOne({userName:req.params.userName})
        .then( Users => res.json(Users) )
        .catch(err => res.json(err))
};

module.exports.showProductDetail = (req, res) => {
    Product.findOne({ _id:req.params.id})
      .then( Product => res.json(Product) )
      .catch(err => res.json(err))
};

module.exports.findOne = (req, res) => {
    Product.findOne({_id:req.params.id})
        .then( Product => res.json(Product) )
        .catch(err => res.json(err))
};

module.exports.updateProduct = ( req, res ) => {
  const { title, price, quantity, description } = req.body;
  Product.updateOne({_id: req.params.id}, {
    title: title,
    price: price,
    quantity: quantity,
    description: description}, {new : true})
    .then(updatedProduct => {
      Users.updateOne(
        { _id: req.params.uid, "products._id" : req.params.id  },
        { $set: { "products.$.title" : updatedProduct.title,
                  "products.$.price" : updatedProduct.price,
                  "products.$.quantity" : updatedProduct.quantity,
                  "products.$.description" : updatedProdct.description} },
        {new: true}
      )
        .then(updatedUserProduct => res.json(updatedUserProduct))
        .catch(err => console.log("Couldn't update user product" + err))
    })
    .catch(err => res.json(err))
};

module.exports.deleteProduct = (req, res) => {
  Product.deleteOne({_id: req.params.id})
    .then(deleted => {
      console.log(deleted)
      Users.updateOne(
        { "_id": req.params.uid },
        { $pull: { "products": { _id : req.params.id } } },
        {new: true}
      )
        .then(deletedUserProduct => res.json(deletedUserProduct))
      })
    .catch(err => res.json(err))
};
