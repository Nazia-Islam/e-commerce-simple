import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, prd) => total + prd.price, 0);
    
    const formatPrice = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    let shipping = 0;
    if(total > 35){
        shipping = 0;
    }
    else if(total > 15){
        shipping = 4.99;
    }
    else if(total > 0){
        shipping = 12.99;
    }

    const tax = formatPrice(total/10);
    const grandTotal = formatPrice(total + shipping + tax);

    return (
        <div className="myCart">
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p>Product price: {total}</p>
            <p>Shipping Cost: {shipping}</p>
            <p><small>Tax + VAT: {tax}</small></p>
            <p>Total price: {grandTotal}</p>
        </div>
    );
};

export default Cart;