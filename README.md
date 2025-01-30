# Binance Merchant Pay API 

* I am still working on this to publish npm package. Please feel free to contribute to this. 
* If you have any questions, always refer back to the API documentation
* https://developers.binance.com/docs/binance-pay/introduction


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

### Callback Verifications
```node
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json()); 
// Binance Merchant API callback endpoint
app.post("/binance-webhook", (req, res) => {
    const secretKey = "your_binance_api_secret"; 
    const payload = JSON.stringify(req.body); 
    const signature = req.headers["binancepay-signature"]; 
    const timestamp = req.headers["binancepay-timestamp"];
    // Generate HMAC SHA-512 signature
    const hash = crypto.createHmac("sha512", secretKey)
        .update(timestamp + payload)
        .digest("hex");

    // Verify signature
    if (hash !== signature) {
        return res.status(403).json({ message: "Unauthorized" });
    }
    // Process the callback data
    const { bizType, data, bizStatus } = req.body;
    if (bizType === "PAY") { 
        if (bizStatus === "PAY_SUCCESS") {
            // Do your success operations
        }
    }
    if (bizType === "PAYOUT") {  

    }
    if (bizType === "PAY_REFUND") {  

    }
    res.status(200).json({ message: "Success" });
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```

### Fund Transfer Operations
#### 1. Transfer Fund
```node
// https://developers.binance.com/docs/binance-pay/api-wallet-transfer
BinanceMerchantPayAPI
    .createTransfer({
        'merchantTradeNo': opts.merchantTradeNo,
        'prepayId': opts.prepayId,  
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 2. Query Fund
```node
// https://developers.binance.com/docs/binance-pay/api-wallet-transfer-query
BinanceMerchantPayAPI
    .queryTransfer({
        'tranId': opts.tranId,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```


### Refund Operations

#### 1. Create Refund
```node
// https://developers.binance.com/docs/binance-pay/api-order-refund
BinanceMerchantPayAPI
    .createRefund({
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
#### 2. Query Refund
```node
// https://developers.binance.com/docs/binance-pay/api-order-refund-query
BinanceMerchantPayAPI
    .queryRefund({
        'refundRequestId': opts.refundRequestId,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```


### Payout Operations

#### 1. Create Payout
```node
// https://developers.binance.com/docs/binance-pay/api-payout
BinanceMerchantPayAPI
    .createPayOut({
        'requestId': opts.requestId,
        'batchName': opts.batchName,
        'currency': opts.currency,
        'totalAmount': opts.totalAmount,
        'totalNumber': opts.totalNumber,
        'bizScene': opts.bizScene,
        'transferDetailList': opts.transferDetailList
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 2. Query Payout
```node
// https://developers.binance.com/docs/binance-pay/api-payout-query
BinanceMerchantPayAPI
    .queryPayOut({
        'requestId': opts.requestId,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 3. Validate Payout User
```node
// https://developers.binance.com/docs/binance-pay/api-payout-validate-receiver
BinanceMerchantPayAPI
    .validatePayOutReceiver({
        'receiveType': opts.receiveType,
        'receiverId': opts.receiverId,
        'registrationEmail': opts.registrationEmail,
        'registrationMobileNumber': opts.registrationMobileNumber,
        'registrationMobileCode': opts.registrationMobileCode,
        'openUserId': opts.openUserId,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

### Wallet Balance 

#### 1. Query Balance V1
```node
// https://developers.binance.com/docs/binance-pay/api-balance-query
BinanceMerchantPayAPI
    .queryWalletBalance({
        'wallet': opts.wallet,
        'currency': opts.currency,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 2. Query Balance V2
```node
// https://developers.binance.com/docs/binance-pay/api-balance-query-v2
BinanceMerchantPayAPI
    .queryV2WalletBalance({
        'wallet': opts.wallet,
        'currency': opts.currency,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

### Profit Sharing

#### 1. Add Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-add-receiver
BinanceMerchantPayAPI
    .addProfitSharingReceiver({
        'account': opts.account,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 2. Add Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-query-receiver
BinanceMerchantPayAPI
    .queryProfitSharingReceiver({
        'pageNum': opts.pageNum,
        'pageSize': opts.pageSize,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 3. Delete Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-delete-receiver
BinanceMerchantPayAPI
    .deleteProfitSharingReceiver({
        'account': opts.account,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 4. Create A Profit Split 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-submit-split
BinanceMerchantPayAPI
    .createSplit({
        'merchantRequestId': opts.merchantRequestId,
        'prepayOrderId': opts.prepayOrderId,
        'receiverList': opts.receiverList,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 5. Query A Profit Split 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-query-split
BinanceMerchantPayAPI
    .querySplit({
        'merchantRequestId': opts.merchantRequestId,
        'prepayOrderId': opts.prepayOrderId,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```

#### 6. Query A Profit Split 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-split-return
BinanceMerchantPayAPI
    .returnSplit({
        'prepayOrderId': opts.prepayOrderId,
        'splitOrderNo': opts.splitOrderNo,
        'originMerchantRequestId': opts.originMerchantRequestId,
        'merchantReturnNo': opts.merchantReturnNo,
        'transferOutAccount': opts.transferOutAccount,
        'returnAmount': opts.returnAmount,
        'description': opts.description,
        'webhookUrl': opts.webhookUrl,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```



### End
* If you find this package useful, please buy me a coffee. 


![image description](https://i.imgur.com/xx04ANu.png)