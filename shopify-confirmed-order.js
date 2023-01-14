const CREDENTIALS_KEY = 'sr-checkout-credentials';

function setCredentials(storeId, storeToken) {
    sessionStorage.setItem(CREDENTIALS_KEY, JSON.stringify({ storeId, storeToken }));
}

function getCredentials() {
    const str = sessionStorage.getItem(CREDENTIALS_KEY);
    if (!str) throw new Error('invalid credetinals for process the pay');

    return JSON.parse(str);
}


async function checkout($btn) {
    $btn.classList.add('loading');
    document.getElementsByClassName('loading-overlay__spinner')[0].classList.remove('hidden');

    const credentials = getCredentials();

    const response = await fetch('https://984e9d6ynh.execute-api.us-east-1.amazonaws.com/v1//shopify-orders/checkout-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-STORE-ID': credentials.storeId,
            'X-STORE-TOKEN': credentials.storeToken,
        },
        body: JSON.stringify({
            shopifyOrderId: parseInt($btn.getAttribute('order-id'))
        }),
    });
    const checkout = await response.json();
    if (!checkout.checkoutUrl) {
        alert(`Order status: ${checkout.status}`);
        return;
    }

    window.location.replace(checkout.checkoutUrl);
}

async function run(storeId, storeToken, orderId) {
    setCredentials(storeId, storeToken);

    return () => {
        const $container = document.getElementsByClassName('step')[0];
        $container.innerHTML += `
            <div class="step__footer payment">
                <button data-osp-continue-button="" class="button step__footer__continue-btn btn" onclick="checkout(this)" order-id="${orderId}">
                    <span class="btn__content">Continuar a pago</span>
                    <div class="loading-overlay__spinner hidden">
                        <svg aria-hidden="true" focusable="false" role="presentation" class="spinner" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                        </svg>
                    </div>
                </button>
            <div/>
        `;
    }
}