const CREDENTIALS_KEY = 'sr-checkout-credentials';

function setCredentials(storeId, storeToken) {
    sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ storeId, storeToken }));
}

function getCredentials() {
    const str = sessionStorage.getItem(CREDENTIALS_KEY);
    if (!str) throw new Error('invalid credetinals for process the pay');

    return JSON.parse(str);
}


function checkout($btn) {
    $btn.classList.add('loading');
    document.getElementById('btn-payment').textContent = 'Cargando...';

    const credentials = getCredentials();

    fetch('https://8hc42bq815.execute-api.us-east-1.amazonaws.com/v1/shopify-orders/checkout-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-STORE-ID': credentials.storeId,
            'X-STORE-TOKEN': credentials.storeToken,
        },
        body: JSON.stringify({
            shopifyOrderId: parseInt($btn.getAttribute('order-id'))
        }),
    }).then(response => response.json()).then(checkout => {
        if (!checkout.checkoutUrl) {
            document.getElementById('btn-payment').textContent = 'Continuar a pago';
            alert(`Order status: ${checkout.status}`);
            return;
        }

        window.location.replace(checkout.checkoutUrl);
    });
}

function run(storeId, storeToken, orderId) {
    setCredentials(storeId, storeToken);

    return function () {
        const $container = document.getElementsByClassName('step')[0];
        $container.innerHTML += `
            <div class="step__footer payment">
                <button data-osp-continue-button="" class="button step__footer__continue-btn btn" onclick="checkout(this)" order-id="${orderId}">
                    <span class="btn__content" id="btn-payment">Continuar a pago</span>
                </button>
            <div/>
        `;
    }
}