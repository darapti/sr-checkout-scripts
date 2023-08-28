const BASE_URL = 'https://sr-checkout-api.darapti.com';

function recurrenteCheckout(storeId, storeToken, orderId) {
    return fetch(`${BASE_URL}/external/v1/shopify-orders/checkout-url`, {
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
    return fetch(`${BASE_URL}/external/v1/shopify-orders/${orderId}/status`, {
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
            <div class="step__footer payment" style=" display: flex; flex-direction: column; gap: 10px; align-content: end;">
                <button data-osp-continue-button="" class="button step__footer__continue-btn btn" id="recurrente-checkout-link-generator">
                    <span class="btn__content" id="btn-payment">Continuar a pago</span>
                </button>
                <div style="max-height: 25px !important;display: flex;flex-direction: row;width: 165px;align-items: center;filter: grayscale(1);opacity: .6;" class="&quot;payment-provider-icons&quot;&quot;">

                    <svg width="380" height="18" viewBox="0 0 37 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo logo-sm object-fit-contain recurrente" style="/* width: 20px; */border-right: 1px solid #00000057;margin-right: 5px;">
                    <path d="M24.9589 24.5747L22.2773 21.2634C22.7461 20.9944 23.1995 20.6993 23.6352 20.3795C27.7123 17.3848 29.9096 12.2955 30.1714 5.25788L28.7109 5.22195C28.6371 5.21935 28.5657 5.19531 28.5053 5.15277C28.445 5.11022 28.3984 5.05102 28.3711 4.9824C28.3439 4.91378 28.3373 4.83871 28.352 4.76638C28.3668 4.69404 28.4023 4.62756 28.4542 4.57508L32.3045 0.695628C32.341 0.65905 32.3845 0.630292 32.4324 0.611117C32.4803 0.591943 32.5316 0.582754 32.5832 0.584116C32.6348 0.585478 32.6856 0.597361 32.7324 0.619037C32.7792 0.640713 32.8212 0.671726 32.8556 0.710173L36.5006 4.77616C36.5502 4.83116 36.5826 4.89953 36.5938 4.97279C36.6049 5.04604 36.5943 5.12096 36.5632 5.18822C36.5321 5.25548 36.482 5.31214 36.419 5.35114C36.356 5.39015 36.2829 5.40978 36.2088 5.40762L34.3889 5.36313C34.0868 13.7894 31.3086 19.9877 26.1166 23.7927C25.7444 24.0656 25.3542 24.33 24.9589 24.5764V24.5747Z" fill="#102747"></path>
                    <path d="M1.13671 26.6015C0.955589 26.5547 0.799833 26.4392 0.702534 26.2794C0.605235 26.1196 0.57406 25.9282 0.615631 25.7458L1.30014 22.7982C1.34312 22.6126 1.45801 22.4517 1.61957 22.3508C1.78113 22.2499 1.97615 22.2172 2.16177 22.26L2.3791 22.3105V22.3045L2.54338 22.349L2.8052 22.4097C2.83896 22.4173 2.87213 22.4273 2.90446 22.4397C4.86376 22.9013 6.85646 23.2074 8.86397 23.3552C6.8408 21.3914 5.52498 18.8129 5.122 16.0223C4.71903 13.2317 5.25161 10.3863 6.63655 7.93032C8.02149 5.47438 10.1808 3.54626 12.7773 2.44711C15.3737 1.34795 18.2611 1.13965 20.9884 1.85474C23.7157 2.56983 26.1295 4.16804 27.8526 6.39976C29.5757 8.63147 30.5112 11.371 30.5129 14.1905C30.5147 17.0101 29.5826 19.7508 27.8623 21.9846C26.1419 24.2185 23.7302 25.8197 21.0037 26.5382C17.9404 27.5118 14.7408 27.9885 11.5267 27.95C8.0197 27.9507 4.52734 27.4975 1.13671 26.6015ZM9.4535 14.1948C9.4553 15.4491 9.7414 16.6867 10.2903 17.8146C10.8392 18.9425 11.6366 19.9313 12.6225 20.7067C13.6085 21.4821 14.7574 22.024 15.9829 22.2915C17.2084 22.5591 18.4786 22.5454 19.698 22.2514L19.8692 22.1932L19.8786 22.2052C21.3747 21.8069 22.7294 20.9977 23.7894 19.8693C24.8494 18.7408 25.5722 17.3381 25.8761 15.8199C26.18 14.3018 26.0528 12.729 25.509 11.2794C24.9651 9.82984 24.0262 8.5615 22.7987 7.61799C21.5712 6.67448 20.104 6.09348 18.5633 5.94077C17.0227 5.78807 15.47 6.06975 14.0811 6.75394C12.6923 7.43812 11.5227 8.49748 10.7049 9.81207C9.88701 11.1267 9.45353 12.644 9.4535 14.1922V14.1948Z" fill="#102747"></path>
                    <path opacity="0.143" d="M8.89315 23.4079C8.89315 23.4079 16.9764 24.5886 19.9001 22.2305L19.9642 22.1775C18.8878 22.489 17.7585 22.5744 16.6474 22.4282C15.5364 22.2819 14.4676 21.9073 13.5085 21.3278H13.4999C12.8325 21.4305 7.09375 21.1875 7.09375 21.1875L7.95452 22.411L8.89315 23.4079Z" fill="white"></path>
                    </svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" height="25" aria-labelledby="pi-visa" class="payment-provider-icon payment-provider-icon--visa" width="380"><title id="pi-visa">Visa</title>
                    <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path></svg>

                        <svg xmlns="http://www.w3.org/2000/svg" width="380" height="25" viewBox="0 0 38 24" role="img" aria-labelledby="pi-master" class="payment-provider-icon payment-provider-icon--mastercard">
                        <title id="pi-master">Mastercard</title>
                        <path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                        <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                        <circle fill="#EB001B" cx="15" cy="12" r="7"></circle>
                        <circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                        <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                    </svg>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 24" role="img" width="380" height="25" aria-labelledby="pi-amex" class="payment-provider-icon payment-provider-icon--amex"><title id="pi-amex">Amex</title>
                    <path opacity="0.07" d="M35 0H3C1.3 0 0 1.3 0 3V21C0 22.7 1.4 24 3 24H35C36.7 24 38 22.7 38 21V3C38 1.3 36.6 0 35 0Z" fill="black"></path>
                    <path d="M35 1C36.1 1 37 1.9 37 3V21C37 22.1 36.1 23 35 23H3C1.9 23 1 22.1 1 21V3C1 1.9 1.9 1 3 1H35Z" fill="white"></path>
                    <path d="M19.5966 10.4156V9.56385C19.5966 9.56385 19.5515 8.89694 18.8554 8.89694H17.7732V10.4156H16.6623V6.0374H19.3594C19.3594 6.0374 20.767 5.86696 20.767 7.31884C20.767 8.07459 20.1448 8.34102 20.1448 8.34102C20.1448 8.34102 20.685 8.59338 20.685 9.33422V10.4155H19.5966V10.4156ZM17.7733 7.86719H18.9221C19.2557 7.86719 19.53 7.68185 19.53 7.45239C19.53 7.22251 19.2557 7.03726 18.9221 7.03726H17.7733V7.86719Z" fill="url(#paint0_radial_701_3)"></path>
                    <path d="M32.7104 10.4156L30.9473 7.48927V10.4156H29.9914H29.8129H28.7694L28.3763 9.49707H26.3464L25.9605 10.4156H24.9379H24.753H24.2192C24.2192 10.4156 22.7231 10.2009 22.7231 8.34875C22.7231 5.91841 24.4201 6.0149 24.4788 6L25.8495 6.03739V7.0226L24.724 7.03708C24.724 7.03708 23.9901 7.03708 23.9008 7.99324C23.8903 8.10296 23.8856 8.20384 23.8864 8.29756C23.8903 9.77764 25.1711 9.31813 25.2129 9.30449L26.5909 6.03739H28.1463L29.8129 10.0085V6.03739H31.3838L33.1251 8.9195V6.03739H34.2442V10.4156H32.7104V10.4156ZM26.8207 8.37848H27.9019L27.3689 7.07447L26.8207 8.37848Z" fill="url(#paint1_radial_701_3)"></path>
                    <path d="M10.8756 10.4156V7.39319L9.48312 10.4156H8.57193L7.17151 7.40776V10.4156H6.20112H6.05275H4.97845L4.59337 9.49707H2.56342L2.17069 10.4156H0.955597L2.80021 6.03739H4.36383L6.05283 10.0602V6.03739H7.80869L9.03144 8.75631L10.247 6.03739H12.0028V10.4156H10.8756V10.4156ZM3.03733 8.37848H4.11896L3.57836 7.07447L3.03733 8.37848Z" fill="url(#paint2_radial_701_3)"></path>
                    <path d="M12.6169 10.4156V6.03747H16.085V7.05964H13.736V7.73371H16.0256V8.72658H13.736V9.46776H16.085V10.4156H12.6169Z" fill="url(#paint3_radial_701_3)"></path>
                    <path d="M21.227 10.4305V6.03747H22.3452V10.4305H21.227Z" fill="url(#paint4_radial_701_3)"></path>
                    <path d="M23.8864 17.8394V16.9873C23.8864 16.9873 23.8414 16.3209 23.1452 16.3209H22.0638V17.8394H20.952V13.4609H23.6491C23.6491 13.4609 25.0569 13.2905 25.0569 14.7428C25.0569 15.4984 24.4347 15.7654 24.4347 15.7654C24.4347 15.7654 24.9685 16.017 24.9685 16.7574V17.8395H23.8864V17.8394ZM22.0638 15.291H23.2128C23.5455 15.291 23.8197 15.1062 23.8197 14.8762C23.8197 14.6464 23.5455 14.4613 23.2128 14.4613H22.0638V15.291Z" fill="url(#paint5_radial_701_3)"></path>
                    <path d="M16.4774 17.8323H15.5062L14.3293 16.5354L13.1427 17.8323H12.469H9.00888V13.4463H12.469H13.0543L14.3293 14.8393L15.6109 13.4536H16.463V13.4463H19.1594C19.1594 13.4463 20.5671 13.2905 20.5671 14.7348C20.5671 16.0242 20.1 16.4245 18.6625 16.4245H17.574V17.8323H16.4774V17.8323ZM15.0849 15.6769L16.4628 17.2027V14.1574L15.0849 15.6769ZM10.128 16.8845H12.469L13.5656 15.6769L12.469 14.4758H10.128V15.1495H12.4095V16.1433H10.128V16.8845ZM17.574 15.283H18.7219C19.0556 15.283 19.3297 15.0981 19.3297 14.8682C19.3297 14.6391 19.0556 14.4533 18.7219 14.4533H17.574V15.283V15.283Z" fill="url(#paint6_radial_701_3)"></path>
                    <path d="M31.4657 17.825H29.4872V16.8168H31.2214C31.2214 16.8168 31.8437 16.8909 31.8437 16.4696C31.8437 16.0756 30.9031 16.1062 30.9031 16.1062C30.9031 16.1062 29.3692 16.2398 29.3692 14.8023C29.3692 13.3721 30.7543 13.4536 30.7543 13.4536H32.8887V14.4759H31.17C31.17 14.4759 30.5767 14.357 30.5767 14.7879C30.5767 15.1496 31.3838 15.0982 31.3838 15.0982C31.3838 15.0982 33.0808 14.9728 33.0808 16.2911C33.0808 17.7053 31.9875 17.8307 31.6001 17.8307C31.5164 17.8306 31.4657 17.825 31.4657 17.825Z" fill="url(#paint7_radial_701_3)"></path>
                    <path d="M25.5168 17.8323V13.4609H28.9834V14.4758H26.635V15.1496H28.9246V16.1433H26.635V16.8845H28.9834V17.8323H25.5168Z" fill="url(#paint8_radial_701_3)"></path>
                    <path d="M35.3849 17.825H33.4064V16.8168H35.1333C35.1333 16.8168 35.7629 16.8909 35.7629 16.4696C35.7629 16.0756 34.8224 16.1062 34.8224 16.1062C34.8224 16.1062 33.2883 16.2398 33.2883 14.8023C33.2883 13.3721 34.6734 13.4536 34.6734 13.4536H36.8006V14.4759H35.0884C35.0884 14.4759 34.4957 14.357 34.4957 14.7879C34.4957 15.1496 35.3038 15.0982 35.3038 15.0982C35.3038 15.0982 37 14.9728 37 16.2911C37 17.7053 35.9068 17.8307 35.5193 17.8307C35.4355 17.8306 35.3849 17.825 35.3849 17.825Z" fill="url(#paint9_radial_701_3)"></path>
                    <defs>
                    <radialGradient id="paint0_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.9296 -2.32035) scale(43.12)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint1_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93112 -2.3204) scale(43.1171)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint2_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.9312 -2.31974) scale(43.1175)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint3_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.92881 -2.31974) scale(43.1207)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint4_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93052 -2.31954) scale(43.1182)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint5_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93054 -2.31974) scale(43.117)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint6_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.931 -2.32098) scale(43.1196)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint7_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93126 -2.31929) scale(43.1168)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint8_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93041 -2.32001) scale(43.119)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    <radialGradient id="paint9_radial_701_3" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(5.93134 -2.31929) scale(43.1157)">
                    <stop stop-color="#00B1E7"></stop>
                    <stop offset="0.427" stop-color="#0098CD"></stop>
                    <stop offset="0.5244" stop-color="#008DBE"></stop>
                    <stop offset="0.8403" stop-color="#006C91"></stop>
                    <stop offset="1" stop-color="#005F80"></stop>
                    </radialGradient>
                    </defs>
                    </svg>

                </div>
            <div/>
        `;

        document.getElementById('recurrente-checkout-link-generator').addEventListener('click', ($btn) => {
            $btn.disabled = true;
            document.getElementById('btn-payment').textContent = 'Loading...';
            recurrenteCheckout(storeId, storeToken, orderId).then(data => {
                if (!data.checkoutUrl) {
                    alert('Error to generate URL');
                    return;
                }
                window.location.replace(data.checkoutUrl)
            });
        });
    }
}
