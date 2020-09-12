import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import ReviewItems from '../ReviewItem/ReviewItems';
import Cart from '../Cart/Cart';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] =useState([]);
    const [orderPlace, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () => {
        history.push('/shipment');
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart data
        const savedCart = getDatabaseCart();//savedCart e key & quantity object hishabe save hosse 
        const productKeys = Object.keys(savedCart);
        //console.log(productKeys);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity =savedCart[key];
            return product;
        });
        setCart(cartProducts);
        //console.log(cartProducts); 
    }, []);

    let thanku;
    if(orderPlace){
        thanku =  <img src={happyImage} alt=""/>
    } 

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItems 
                        product={pd}
                        key={pd.key}
                        removeProduct={removeProduct}></ReviewItems>)   
                }
            </div>
            {
                thanku
            }
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="addToCart">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;