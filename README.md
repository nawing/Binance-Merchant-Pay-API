# Binance Merchant Pay API 

* I am still working on this to publish npm package. Please feel free to contribute to this. 

### Basic Operations

#### 1. Creating Instance
```node
const BinanceMerchantPayAPI = require("binance-merchant-pay-api");
const BINANCE_API_KEY = "";
const BINANCE_SECRET_KEY = "";
const BINANCE_MERCHANT_ID = "";
const BinancePay = new BinanceMerchantPayAPI(
  BINANCE_API_KEY,
  BINANCE_SECRET_KEY,
  BINANCE_MERCHANT_ID,
)
```


#### 2. Creating Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-create-v3
// terminalType [APP|WEB|WAP|MINI_PROGRAM|OTHERS]
// APP: The client-side terminal type is a mobile application.
// WEB:The client-side terminal type is a website that is opened via a PC browser.
// WAP: The client-side terminal type is an HTML page that is opened via a mobile browser.
// MINI_PROGRAM: The terminal type of the merchant side is a mini program on the mobile phone.
// OTHERS: other undefined type




BinanceMerchantPayAPI
    .createOrder({
        'terminalType': opts.terminalType,
        'merchantId': this.merchantId,
        'merchantTradeNo': opts.merchantTradeNo,
        'tradeType': opts.tradeType,
        'orderAmount': opts.orderAmount,
        'currency': opts.currency,
        "description": opts.description,
        "goodsDetails": opts.goodsDetails,
        "returnUrl": opts.returnUrl,
        "cancelUrl": opts.cancelUrl,
        "webhookUrl": opts.webhookUrl
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 3. Query Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-query-v2
BinanceMerchantPayAPI
    .queryOrder({
        'merchantTradeNo': opts.merchantTradeNo,
        'prepayId': opts.prepayId,
    }).then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 4. Close Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-close
BinanceMerchantPayAPI
    .closeOrder({
        'merchantTradeNo': opts.merchantTradeNo,
        'prepayId': opts.prepayId,  
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 5. Refund Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-refund
BinanceMerchantPayAPI
    .refundOrder({
        'refundRequestId': opts.refundRequestId,
        'prepayId': opts.prepayId,
        'refundAmount': opts.refundAmount,
        'refundReason': opts.refundReason,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```




### Payout Operations
