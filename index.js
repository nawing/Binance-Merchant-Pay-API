'use strict';

const crypto = require('crypto');
const axios = require('axios');
const baseURL = 'https://bpay.binanceapi.com';

module.exports = class BinanceMerchantPayAPI {
    constructor(
        apiKey,
        apiSecret,
        merchantId,
    ) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.merchantId = merchantId;
    }
    /**
     * hashSignature
     * @param {*} queryString
     * @returns 
     */
    hashSignature = (queryString) => {
        return crypto
            .createHmac('sha512', this.apiSecret)
            .update(queryString)
            .digest('hex');
    }
    /**
     * randomString
     * @returns 
     */
    randomString = () => {
        return crypto.randomBytes(32).toString('hex').substring(0, 32);
    }
    /**
     * httpRequest
     * @param {*} http_method
     * @param {*} path
     * @param {*} payload
     * @returns
     */
    httpRequest = async (http_method, path, payload) => {
        const timestamp = Date.now()
        const nonce = this.randomString()
        const payloadSignature = timestamp + "\n" + nonce + "\n" + JSON.stringify(payload) + "\n"
        const url = baseURL + path
        const signature = this.hashSignature(payloadSignature)
        return axios.create({
            baseURL,
            headers: {
                'content-type': 'application/json',
                'BinancePay-Timestamp': timestamp,
                'BinancePay-Nonce': nonce,
                'BinancePay-Certificate-SN': this.apiKey,
                'BinancePay-Signature': signature.toUpperCase()
            }
        }).request({
            method: http_method,
            url,
            data: payload
        })
    }
    // ORDER FUNCTIONS
    // ORDER FUNCTIONS
    // ORDER FUNCTIONS
    // ORDER FUNCTIONS
    // ORDER FUNCTIONS
    /**
     * createOrder
     * @param {*} opts
     * @param {string} terminalType
     * @param {string} merchantTradeNo
     * @param {number} orderAmount
     * @param {string} currency

     * @param {GoodDetail[]} goodsDetails[]
     * @param {string} GoodDetail.goodsType 
     * @param {string} GoodDetail.goodsCategory
     * @param {string} GoodDetail.referenceGoodsId
     * @param {string} GoodDetail.goodsName
     * @param {string} GoodDetail.goodsDetail
     * 
     * @param {string} returnUrl | optional
     * @param {string} cancelUrl | optional
     * @param {string} webhookUrl  | optional
     * @param {string} fiatAmount | optional
     * @param {string} fiatCurrency | optional
     * @param {string} orderExpireTime | optional
     * @param {string} supportPayCurrency | optional
     * @param {string} appId | optional
     * @param {string} universalUrlAttach | optional
     * @param {string} passThroughInfo | optional
     * @param {string} description | optional
     * @param {string} voucherCode | optional
     * 
     * @param {Merchant} merchant | optional
     * @param {string} merchant.subMerchantId | optional
     * 
     * @param {Shipping} shipping | optional
     * @param {string} shipping.shippingPhoneNo
     * @param {ShippingName} shipping.shippingName.firstName
     * @param {ShippingName} shipping.shippingName.middleName
     * @param {ShippingName} shipping.shippingName.lastName
     * @param {ShippingAddress} shipping.shippingAddress
     * @param {string} shipping.shippingAddress.region
     * @param {string} shipping.shippingAddress.state
     * @param {string} shipping.shippingAddress.city
     * @param {string} shipping.shippingAddress.address
     * @param {string} shipping.shippingAddress.zipCode
     * @param {string} shipping.shippingAddress.shippingAddressType
     * 
     * @param {Buyer} buyer | optional
     * @param {string} buyer.referenceBuyerId 
     * @param {string} buyer.buyerPhoneCountryCode 
     * @param {string} buyer.buyerPhoneNo 
     * @param {string} buyer.buyerEmail 
     * @param {string} buyer.buyerRegistrationTime 
     * @param {string} buyer.buyerBrowserLanguage 
     * @param {BuyerName} buyer.buyerName
     * @param {string} buyer.buyerName.firstName
     * @param {string} buyer.buyerName.middleName
     * @param {string} buyer.buyerName.lastName
     * 
     * @returns 
     */
    createOrder = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/v3/order',
            {
                "env": { "terminalType": opts.terminalType },
                'merchantId': this.merchantId,
                'merchantTradeNo': opts.merchantTradeNo,
                // 'tradeType': opts.tradeType,
                'orderAmount': opts.orderAmount,
                'currency': opts.currency,
                "goodsDetails": opts.goodsDetails,

                "returnUrl": opts.returnUrl,
                "cancelUrl": opts.cancelUrl,
                "webhookUrl": opts.webhookUrl,
                'fiatAmount': opts.fiatAmount,
                'fiatCurrency': opts.fiatCurrency,
                "orderExpireTime": opts.orderExpireTime,
                "supportPayCurrency": opts.supportPayCurrency,
                "appId": opts.appId,
                "universalUrlAttach": opts.universalUrlAttach,
                "passThroughInfo": opts.passThroughInfo,
                "description": opts.description,
                "voucherCode": opts.voucherCode,

                "merchant": opts.merchant,
                "buyer": opts.buyer,
                "shipping": opts.shipping,

            }
        );
    }
    /**
     * queryOrder
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
     * @returns 
     */
    queryOrder = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/v2/order/query',
            {
                'merchantTradeNo': opts.merchantTradeNo,
                'prepayId': opts.prepayId,
            }
        );
    }
    // REFUND FUNCTIONS
    // REFUND FUNCTIONS
    // REFUND FUNCTIONS
    // REFUND FUNCTIONS
    // REFUND FUNCTIONS
    /**
     * closeOrder
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
     * @returns 
     */
    closeOrder = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/order/close',
            {
                'merchantTradeNo': opts.merchantTradeNo,
                'prepayId': opts.prepayId,
            }
        );
    }
    // REFUND
    // REFUND
    // REFUND
    // REFUND
    // REFUND
    /**
     * createRefund
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
     * @returns 
     */
    createRefund = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/order/refund',
            {
                'refundRequestId': opts.refundRequestId,
                'prepayId': opts.prepayId,
                'refundAmount': opts.refundAmount,
                'refundReason': opts.refundReason,
                'webhookUrl': opts.webhookUrl,
            }
        );
    }
    /**
     * queryRefund
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
     * @returns 
     */
    queryRefund = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/order/refund/query',
            {
                'refundRequestId': opts.refundRequestId,
            }
        );
    }
    // FUND TRANSFER 
    // FUND TRANSFER 
    // FUND TRANSFER 
    // FUND TRANSFER 
    // FUND TRANSFER 
    /**
     * transferFund
     * @param {*} opts 
     * @param {string} requestId 
     * @param {string} currency 
     * @param {number} amount 
     * @param {'TO_MAIN'|'TO_PAY'} transferType 
     * @returns 
     */
    createTransfer = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/wallet/transfer',
            {
                'requestId': opts.requestId,
                'currency': opts.currency,
                'amount': opts.amount,
                'transferType': opts.transferType,
            }
        );
    }
    /**
     * queryTransfer
     * @param {*} opts 
     * @param {string} tranId 
     * @returns 
     */
    queryTransfer = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/wallet/transfer/query',
            {
                'tranId': opts.tranId,
            }
        );
    }

    // PAYOUT
    // PAYOUT
    // PAYOUT
    // PAYOUT
    // PAYOUT
    /**
     * createPayOut
     * @param {*} opts
     * @param {string} requestId
     * @param {string} batchName
     * @param {string} currency
     * @param {number} totalAmount
     * @param {number} totalNumber
     * @param {string} bizScene
     * @param {TransferDetail[]} transferDetailList
     * @param {string} merchantSendId
     * @param {number} transferAmount
     * @param {string} receiveType
     * @param {string} transferMethod
     * @param {string} receiver
     * @param {string} remark
     * @returns 
     */
    createPayOut = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/payout/transfer',
            {
                'requestId': opts.requestId,
                'batchName': opts.batchName,
                'currency': opts.currency,
                'totalAmount': opts.totalAmount,
                'totalNumber': opts.totalNumber,
                'bizScene': opts.bizScene,
                'transferDetailList': opts.transferDetailList
            }
        );
    }
    /**
     * queryPayOut
     * @param {*} opts
     * @param {string} requestId
     * @returns 
     */
    queryPayOut = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/payout/query',
            {
                'requestId': opts.requestId,
            }
        );
    }
    /**
     * validatePayOutReceiver
     * @param {*} opts
     * @param {string} receiveType
     * @param {string} receiverId
     * @param {string} registrationEmail
     * @param {string} registrationMobileCode
     * @param {string} openUserId
     * @returns 
     */
    validatePayOutReceiver = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/payout/receiver/check',
            {
                'receiveType': opts.receiveType,
                'receiverId': opts.receiverId,
                'registrationEmail': opts.registrationEmail,
                'registrationMobileNumber': opts.registrationMobileNumber,
                'registrationMobileCode': opts.registrationMobileCode,
                'openUserId': opts.openUserId,
            }
        );
    }
    //BALANCE
    //BALANCE
    //BALANCE
    //BALANCE
    //BALANCE
    /**
     * queryWalletBalance
     * @param {*} opts
     * @param {string} wallet
     * @param {string} currency
     * @returns 
     */
    queryWalletBalance = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/balance',
            {
                'wallet': opts.wallet,
                'currency': opts.currency,
            }
        );
    }
    /**
     * queryV2WalletBalance
     * @param {*} opts
     * @param {string} wallet
     * @param {string} currency
     * @returns 
     */
    queryV2WalletBalance = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/v2/balance',
            {
                'wallet': opts.wallet,
                'currency': opts.currency,
            }
        );
    }
    // Profit Sharing
    // Profit Sharing
    // Profit Sharing
    // Profit Sharing
    // Profit Sharing
    /**
     * addProfitSharingReceiver
     * @param {*} opts 
     * @param {string} account
     * @returns 
     */
    addProfitSharingReceiver = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/add-receiver',
            {
                'account': opts.account,
            }
        );
    }
    /**
     * queryProfitSharingReceiver
     * @param {*} opts 
     * @param {number} pageNum
     * @param {number} pageSize
     * @returns 
     */
    queryProfitSharingReceiver = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/query-receiver',
            {
                'pageNum': opts.pageNum,
                'pageSize': opts.pageSize,
            }
        );
    }
    /**
     * deleteProfitSharingReceiver
     * @param {*} opts 
     * @param {string} account
     * @returns 
     */
    deleteProfitSharingReceiver = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/del-receiver',
            {
                'account': opts.account,
            }
        );
    }
    /**
     * createSplit
     * @param {*} opts 
     * @param {string} merchantRequestId 
     * @param {string} prepayOrderId 
     * @param {ReceiverList[]} receiverList
     * @param {string} ReceiverList.account
     * @param {number} ReceiverList.amount
     * @param {string} ReceiverList.description
     * @param {string} [ReceiverList.webhookUrl] | optional
     * @returns 
     */
    createSplit = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/submit-split',
            {
                'merchantRequestId': opts.merchantRequestId,
                'prepayOrderId': opts.prepayOrderId,
                'receiverList': opts.receiverList,
            }
        );
    }
    /**
     * querySplit
     * @param {*} opts 
     * @param {string} merchantRequestId 
     * @param {string} prepayOrderId 
     * @returns 
     */
    querySplit = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/query-split',
            {
                'merchantRequestId': opts.merchantRequestId,
                'prepayOrderId': opts.prepayOrderId,
            }
        );
    }
    /**
     * returnSplit
     * @param {*} opts 
     * @param {string} prepayOrderId 
     * @param {string} splitOrderNo | optional
     * @param {string} originMerchantRequestId | optional
     * @param {string} merchantReturnNo
     * @param {string} transferOutAccount
     * @param {number} returnAmount
     * @param {string} description | optional
     * @param {string} webhookUrl | optional
     * @returns 
     */
    returnSplit = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/profitsharing/v1/return',
            {
                'prepayOrderId': opts.prepayOrderId,
                'splitOrderNo': opts.splitOrderNo,
                'originMerchantRequestId': opts.originMerchantRequestId,
                'merchantReturnNo': opts.merchantReturnNo,
                'transferOutAccount': opts.transferOutAccount,
                'returnAmount': opts.returnAmount,
                'description': opts.description,
                'webhookUrl': opts.webhookUrl,
            }
        );
    }
    /**
     * verifyCallbackSignature
     * @param {string} payload
     * @param {string} signature
     * @param {string} timestamp
     * @returns
     */
    verifyCallbackSignature = async (payload, receivedSignature, timestamp) => {

        let generatedSignature = crypto.createHmac("sha512", this.apiSecret)
            .update(timestamp + payload)
            .digest("hex");

        return generatedSignature === receivedSignature;

    }
}







