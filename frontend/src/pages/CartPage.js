import React from 'react';

export default function CartPage(props) {
    const productId = props.match.params.id;
    const qty = 1;
    return (
        <div>
            <h1>Cart Screen</h1>
            <p>
                ADD TO CART : ProductID: {productId} Qty: {qty}
            </p>
        </div>
    );
}