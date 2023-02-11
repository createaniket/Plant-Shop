
const cart = require('../models/Cart');
const ObjectId  = require("mongoose").Types;

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}
 
exports.addToCart = async(payload) => {
try{
   let result = await cart.findOne({user:payload.user})
   if (!result){
    result = new cart({
      user:payload.user,
      quantity:payload.quantity
    })
   }
   const product = payload.product
   const productIndex = result.products.findIndex((cartProduct) => {
     return cartProduct.product.toString() === product;
   })

   if(productIndex < 0){
    result.products.push({product});
   } else {
    result.products[productIndex].quantity += 1;
   }
   await result.save()
   if(result){
    return{
      status:200,
      success:true,
      data:result,
      message:"Add Cart Successfully"
    }
   }else{
    return{
      success:false,
      status:400,
      message:"Something Went Wrong"
    }
   }
 

}catch (error){
console.log(error)
throw error
}
}

exports.getCart = async() => {
  try{
    result = await cart.find({})
        if(result){
            return{
                success:true,
                status:200,
                data:result,
                message:"Get Succefully"
               }
               }else{
               return {
                success:false,
                status:400,
                message:"Something went Wrong"
            }
        }  
     }catch (error) {
       console.log(error);
    throw error
  }
  }


  exports.increase = async(userId, productId)=>{
    try{
      let result = await cart.findOne({user:userId._id})
      .populate('products.product')
      const mainproducts = result.products
      const idofproduct = productId
      const mainproductsObject = mainproducts.findIndex( ( element => element.product.id === idofproduct))
      const afterupdate = mainproducts[mainproductsObject].quantity +=1;
     const mainresultbest =  await result.save();
      if (result) {
        return {
          success: true,
          data:result,
          code: 200,
          message: 'the product quantity'
           }
    } else {
        return {
            success: false,
          code: 404,
          error: 'Record Not Found!!!'
        }
    }
    }catch (e){
    }
  }




  
  exports.decrease = async(userId,productId)=>{
    try{
      let result = await cart.findOne({user:userId._id})
      .populate('products.product')

      console.log("sddecbhcfejvcejvfrefverjfvre")
      const mainproducts = result.products
      const idofproduct = productId
      const mainproductsObject = mainproducts.findIndex( ( element => element.product.id === idofproduct))
      // const quantityofthatproduct = mainproducts[mainproductsObject].quantity +=1;

      const afterupdate = mainproducts[mainproductsObject].quantity > 0 ? mainproducts[mainproductsObject].quantity -= 1 : mainproducts[mainproductsObject].quantity  +=0 ;
      const mainresultbest =  await result.save();
      if (result) {
        return {
          success: true,
          data:result,
          code: 200,
          message: 'the product quantity'
           }
    } else {
        return {
            success: false,
          code: 404,
          error: 'Record Not Found!!!'
        }
    }
    }catch (e){
    }
  }


exports.getSingleUserCart = async(userId) =>{
  try{
     let result = await cart.findOne({user:userId})
     .populate("products.product")
        if (result) {
            return {
              success: true,
              data:result,
              code: 200,
              message: 'the users product'
               }
        } else {
            return {
                success: false,
              code: 404,
              error: 'Record Not Found!!!'
            }
        }

  }catch (error){
    throw error
  }
}


//to remove the single item from the cart

exports.deleteCartItem = async(  userId, _id)=>{
  console.log(_id)
  console.log(userId)
  try{
    let result = await cart.findOne({user:userId})
    .populate('products.product')
    const mainproducts = result.products
    const idofproduct = _id
    const IndexofThatProduct = mainproducts.findIndex( ( element => element.product.id === idofproduct))
    const mainarray = mainproducts.splice(IndexofThatProduct, 1);
    const realresult = await result.save();

if (realresult){
  return {
    success: true,
    code: 200,
    message: 'Successfully Deleted'
     }
} else {
  return {
      success: false,
    code: 404,
    error: 'No Record Found!!!'
  }
}

  } catch (error){
    throw error
  }
}









// to clear the whole cart by user id
exports.emptycart = async(_id)=>{
  try{
    let result = cart.findOne({user:_id})
result.products = undefined
await result.save() 
    if (result) {
      return {
        success: true,
        data:result,
        code: 200,
        message: 'Successfully Deleted'
         }
  } else {
      return {
          success: false,
        code: 404,
        error: 'No Record Found!!!'
      }
  }
  } catch (error){
    throw error
  }
}