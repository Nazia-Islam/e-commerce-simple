import React from 'react';

const ReviewItems = (props) => {
    //console.log(props);
    const {name, quantity, key, price} = props.product;
    const reviewItemStyle = {
        borderBottom: '1px solid gray',
        marginBotton: '5px',
        paddingBottom: '5px',
        marginLeft: '200px'
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4>{name}</h4>
            <p>Quantity: {quantity}</p>
            <p><small>$ {price}</small></p>
            <br/>
            <button onClick={() => props.removeProduct(key)} className="addToCart">Remove</button>
        </div>
    );
};

export default ReviewItems;