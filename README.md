# Binance Merchant Pay API 

* If you have any questions, always refer back to the API documentation
* https://developers.binance.com/docs/binance-pay/introduction

### Installation
```shell
npm install binance-merchant-pay-api
```

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
BinanceMerchantPayAPI
    .createOrder({
        'terminalType': opts.terminalType,
        'merchantId': this.merchantId,
        'merchantTradeNo': opts.merchantTradeNo,
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
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| terminalType      | string    | true          | 'APP', 'WEB', 'WAP', 'MINI_PROGRAM', 'OTHERS'  |
| merchantId        | string    | true          |   |
| merchantTradeNo   | string    | true          |   |
| orderAmount       | number    | false          |   |
| currency          | string    | false          |   |
| fiatAmount        | string    | false          |   |
| fiatCurrency      | string    | false          |   |
| returnUrl         | string    | false          |   |
| cancelUrl         | string    | false          |   |
| orderExpireTime   | string    | false          |   |
| supportPayCurrency    | string    | false          |   |
| appId                 | string    | false          |   |
| universalUrlAttach    | string    | false          |   |
| passThroughInfo       | string    | false          |   |
| webhookUrl            | string    | false          |   |

###### Buyer
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| buyer                         | Object    | false          |   |
| buyer.referenceBuyerId        | string    | false          |   |
| buyer.buyerPhoneCountryCode   | string    | false          |   |
| buyer.buyerPhoneNo            | string    | false          |   |
| buyer.buyerEmail              | string    | false          |   |
| buyer.buyerRegistrationTime   | string    | false          |   |
| buyer.buyerBrowserLanguage    | string    | false          |   |
| buyer.buyerName               | Object    | false          |   |
| buyer.buyerName.firstName     | string    | true          |   |
| buyer.buyerName.middleName    | string    | false          |   |
| buyer.buyerName.lastName      | string    | true          |   |

###### Shipping
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| shipping                              | Object    | false          |   |
| shipping.shippingName                 | Object    | false          |   |
| shipping.shippingName.firstName       | string    | true          |   |
| shipping.shippingName.middleName      | string    | false          |   |
| shipping.shippingName.lastName        | string    | true          |   |
| shipping.shippingAddress                      | Object    | false          |   |
| shipping.shippingAddress.region               | string    | true          |   |
| shipping.shippingAddress.state                | string    | false          |   |
| shipping.shippingAddress.city                 | string    | false          |   |
| shipping.shippingAddress.address              | string    | false          |   |
| shipping.shippingAddress.zipCode              | string    | false          |   |
| shipping.shippingAddress.shippingAddressType  | string    | false          |  '01', '02', '03', '04' |

###### Merchant
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchant                              | Object    | false          |   |
| merchant .subMerchantId               | string    | false          |   |


###### Good Details
| Param                     | Type      | Required      | Description |
| :---:                     | :---:     | :---:         | :---: |
| goodsType                 | string    | true          | '01', '02'  |
| goodsCategory             | string    | true          | 0000: Electronics & Computers, 1000: Books, Music & Movies, 2000: Home, Garden & Tools, 3000: Clothes, Shoes & Bags, 4000: Toys, Kids & Baby, 5000: Automotive & Accessories, 6000: Game & Recharge, 7000: Entertainament & Collection, 8000: Jewelry, 9000: Domestic service, A000: Beauty care, B000: Pharmacy, C000: Sports & Outdoors, D000: Food, Grocery & Health products, E000: Pet supplies, F000: Industry & Science, Z000: Others |
| referenceGoodsId          | string    | true          |  |
| goodsName                 | string    | true          |  |
| goodsDetail               | string    | true          |  |
| goodsUnitAmount           | object    | false         |  |
| goodsUnitAmount.currency  | string    | true          |  |
| goodsUnitAmount.amount    | number    | true          |  |





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
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchantTradeNo   | string    | true          |
| prepayId          | string    | true          |



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
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchantTradeNo   | string    | true          |       |
| prepayId          | string    | true          |       |



### Fund Transfer Operations
#### 1. Transfer Fund
```node
// https://developers.binance.com/docs/binance-pay/api-wallet-transfer
BinanceMerchantPayAPI
    .createTransfer({
        'requestId': opts.requestId,
        'currency': opts.currency,  
        'amount': opts.amount,  
        'transferType': opts.transferType,  
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| requestId         | string    | true          |       |    
| currency          | string    | true          |       |
| amount            | string    | true          |       |
| transferType      | string    | true          | 'TO_MAIN','TO_PAY' |



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
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| tranId            | string    | true          |       |



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
        'webhookUrl': opts.webhookUrl,
    })
    .then((response) => {
        console.log(response)
    }).catch((error) => {
        console.log(error)
    })
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| refundRequestId   | string    | true          |       |    
| prepayId          | string    | true          |       |
| refundAmount      | string    | true          |       |
| refundReason      | string    | false         |       |
| webhookUrl        | string    | false         |       |



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
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| refundRequestId   | string    | true          |       |



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
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| requestId         | string    | true          |       |
| batchName         | string    | true          |       |
| currency          | string    | true          |       |
| totalAmount       | number    | true          |       |
| totalNumber       | number    | true          |       |
| bizScene          | string    | false         |       |
| transferDetailList   | Array    | true          |       |
###### Transfer Detail
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchantSendId    | string    | true         |       |
| receiveType       | string    | true         |       |
| receiver          | string    | true         |       |
| transferAmount    | number    | true         |       |
| transferMethod    | string    | true         | 'FUNDING_WALLET', 'SPOT_WALLET' |
| remark                    | string    | false         |       |
| registrationEmail         | string    | false         |       |
| registrationMobileNumber  | string    | false         |       |
| registrationMobileCode    | string    | false         |       |

 



#### 2. Query Payout
```node
// https://developers.binance.com/docs/binance-pay/api-payout-query
BinanceMerchantPayAPI
    .queryPayOut({
        'requestId': opts.requestId,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| requestId         | string    | true          |       |


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
    });
```

### Wallet Balance 

#### 1. Query Balance V1
```node
// https://developers.binance.com/docs/binance-pay/api-balance-query
BinanceMerchantPayAPI
    .queryWalletBalance({
        'wallet': opts.wallet,
        'currency': opts.currency,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| wallet            | string    | true          |       |
| currency          | string    | true          |       |




#### 2. Query Balance V2
```node
// https://developers.binance.com/docs/binance-pay/api-balance-query-v2
BinanceMerchantPayAPI
    .queryV2WalletBalance({
        'wallet': opts.wallet,
        'currency': opts.currency,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| wallet            | string    | true          |       |
| currency          | string    | false         |       |




### Profit Sharing

#### 1. Add Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-add-receiver
BinanceMerchantPayAPI
    .addProfitSharingReceiver({
        'account': opts.account,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| account           | string    | true          |       |



#### 2. Add Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-query-receiver
BinanceMerchantPayAPI
    .queryProfitSharingReceiver({
        'pageNum': opts.pageNum,
        'pageSize': opts.pageSize,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| pageNum           | number    | true          |       |
| pageSize          | number    | true          |       |




#### 3. Delete Profit Sharing Receiver 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-delete-receiver
BinanceMerchantPayAPI
    .deleteProfitSharingReceiver({
        'account': opts.account,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| account           | string    | true          |       |




#### 4. Create A Profit Split 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-submit-split
BinanceMerchantPayAPI
    .createSplit({
        'merchantRequestId': opts.merchantRequestId,
        'prepayOrderId': opts.prepayOrderId,
        'receiverList': opts.receiverList,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchantRequestId | string    | true          |       |
| prepayOrderId     | string    | true          |       |
| receiverList      | Array     | true          |       |




#### 5. Query A Profit Split 
```node
// https://developers.binance.com/docs/binance-pay/api-profitshare-query-split
BinanceMerchantPayAPI
    .querySplit({
        'merchantRequestId': opts.merchantRequestId,
        'prepayOrderId': opts.prepayOrderId,
    });
```
| Param             | Type      | Required      | Description |
| :---:             | :---:     | :---:         | :---: |
| merchantRequestId | string    | true          |       |
| prepayOrderId     | string    | true          |       |


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
    });
```
| Param                     | Type      | Required      | Description |
| :---:                     | :---:     | :---:         | :---: |
| prepayOrderId             | string    | true          |       |
| splitOrderNo              | string    | false         |       |
| originMerchantRequestId   | string    | false         |       |
| merchantReturnNo          | string    | true          |       |
| transferOutAccount        | string    | true          |       |
| returnAmount              | string    | true          |       |
| description               | string    | false         |       |
| webhookUrl                | string    | false         |       |


### Callback Handling
```node
const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;
const BinanceMerchantPayAPI = require("binance-merchant-pay-api");
const BINANCE_API_KEY = "";
const BINANCE_SECRET_KEY = "";
const BINANCE_MERCHANT_ID = "";
const BinancePay = new BinanceMerchantPayAPI(
  BINANCE_API_KEY,
  BINANCE_SECRET_KEY,
  BINANCE_MERCHANT_ID,
)

app.use(bodyParser.json()); 
// Binance Merchant API callback endpoint

app.post("/binance-webhook", (req, res) => {
    const secretKey = "your_binance_api_secret"; 
    const payload = JSON.stringify(req.body); 
    const signature = req.headers["binancepay-signature"]; 
    const timestamp = req.headers["binancepay-timestamp"];
    const nonce = req.headers["binancepay-nonce"];
    // Generate HMAC SHA-512 signature
    BinancePay.verifyCallbackSignature((verified) => {
        if (!verified) {
            res.status(403).json({ message: "Unauthorized" });
        }
        if (verified) {
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
        }
    })
});
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
```


### Summary
* If there are any issue, please feel free to contribute and contact me nawingngan@gmail.com
* If you find this package useful, please buy me a coffee. 

<img src="https://i.imgur.com/xx04ANu.png" width="180">