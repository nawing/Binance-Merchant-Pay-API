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
BinanceMerchantPayAPI.createOrder({
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
})
```

#### 3. Query Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-query-v2
BinanceMerchantPayAPI.queryOrder({
    'merchantTradeNo': opts.merchantTradeNo,
    'prepayId': opts.prepayId,
})
```

#### 4. Close Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-close
BinanceMerchantPayAPI.closeOrder({
    'merchantTradeNo': opts.merchantTradeNo,
    'prepayId': opts.prepayId,  
})
```

#### 5. Refund Order
```node
// https://developers.binance.com/docs/binance-pay/api-order-refund
BinanceMerchantPayAPI.refundOrder({
    'refundRequestId': opts.refundRequestId,
    'prepayId': opts.prepayId,
    'refundAmount': opts.refundAmount,
    'refundReason': opts.refundReason,
})
```




### Payout Operations
