function recurrenteCheckout(storeId, storeToken, orderId) {
    return fetch('https://8hc42bq815.execute-api.us-east-1.amazonaws.com/external/v1/shopify-orders/checkout-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-STORE-ID': storeId,
            'X-STORE-TOKEN': storeToken,
        },
        body: JSON.stringify({
            shopifyOrderId: parseInt(orderId)
        }),
    }).then(response => response.json());
}

function getOrderByShopifyOrderId(storeId, storeToken, orderId) {
    return fetch(`https://8hc42bq815.execute-api.us-east-1.amazonaws.com/external/v1/shopify-orders/${orderId}/status`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-STORE-ID': storeId,
            'X-STORE-TOKEN': storeToken,
        },
    }).then(response => response.json());
}

function generateLinkFromConfirmedOrderPage(storeId, storeToken, orderId) {
    return function() {
        const $container = document.getElementsByClassName('main__content')[0];
        $container.innerHTML += `
            <div class="step__footer payment">
                <button data-osp-continue-button="" class="button step__footer__continue-btn btn" id="recurrente-checkout-link-generator">
                    <span class="btn__content" id="btn-payment">Continuar a pago</span>
                </button>
            <div/>
        `;

        document.getElementById('recurrente-checkout-link-generator').addEventListener('click', ($btn) => {
            $btn.setAttribute('disabled', true);
            document.getElementById('btn-payment').textContent = 'Redireccionando a Recurrente...';
            recurrenteCheckout(storeId, storeToken, orderId).then(data => {
                if (!data.checkoutUrl) {
                    console.error(data);
                    alert('Error: al generar url');
                    return;
                }
                window.location.replace(data.checkoutUrl)
            });
        });
    }
}
