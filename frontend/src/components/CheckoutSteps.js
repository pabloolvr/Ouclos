import React from 'react';
//place order will become box on the right side
export default function CheckoutSteps(props) {
    return (
        <div className="row checkout-steps">
            <div className={props.step1 ? 'active' : ''}>Dados Pessoais</div>
            <div className={props.step2 ? 'active' : ''}>Entrega</div>
            <div className={props.step3 ? 'active' : ''}>Pagamento</div>
            <div className={props.step4 ? 'active' : ''}>Place Order</div>
        </div>
    );
}