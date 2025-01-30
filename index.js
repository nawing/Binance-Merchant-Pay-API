'use strict';

const crypto = require('crypto');
const axios = require('axios');
const baseURL = 'https://bpay.binanceapi.com';

module.exports = class BinanceMerchantAPI {
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
     */
    hashSignature = (queryString) => {
        return crypto
            .createHmac('sha512', this.apiSecret)
            .update(queryString)
            .digest('hex');
    }
    /**
     * randomString
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
     * @param {string} description
     * @param {GoodDeatil[]} goodsDetails
     * @param {string} goodsType 
  01: Tangible Goods
  02: Virtual Goods
     * @param {string} goodsCategory
  0000: Electronics & Computers
  1000: Books, Music & Movies
  2000: Home, Garden & Tools
  3000: Clothes, Shoes & Bags
  4000: Toys, Kids & Baby
  5000: Automotive & Accessories
  6000: Game & Recharge
  7000: Entertainament & Collection
  8000: Jewelry
  9000: Domestic service
  A000: Beauty care
  B000: Pharmacy
  C000: Sports & Outdoors
  D000: Food, Grocery & Health products
  E000: Pet supplies
  F000: Industry & Science
  Z000: Others
     * @param {string} referenceGoodsId
     * @param {string} goodsName
     * @param {string} goodsDetail
     * @param {string} returnUrl
     * @param {string} cancelUrl
     * @param {string} webhookUrl
     */
    createOrder = async (opts) => {
        console.log(opts)
        return await this.httpRequest('POST', '/binancepay/openapi/v3/order',
            {
                "env": { "terminalType": opts.terminalType },
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
            }
        );
    }
    /**
     * queryOrder
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
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
     */
    closeOrder = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/order/close',
            {
                'merchantTradeNo': opts.merchantTradeNo,
                'prepayId': opts.prepayId,
            }
        );
    }
    /**
     * refundOrder
     * @param {*} opts
     * @param {string} merchantTradeNo
     * @param {string} prepayId
     */
    refundOrder = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/order/refund',
            {
                'refundRequestId': opts.refundRequestId,
                'prepayId': opts.prepayId,
                'refundAmount': opts.refundAmount,
                'refundReason': opts.refundReason,
            }
        );
    }
    // PAYOUT
    // PAYOUT
    // PAYOUT
    // PAYOUT
    // PAYOUT
    /**
     * payoutCreate
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
     */
    payoutCreate = async (opts) => {
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
     * payoutQuery
     * @param {*} opts
     * @param {string} requestId
     */
    payoutQuery = async (opts) => {
        return await this.httpRequest('POST', '/binancepay/openapi/payout/query',
            {
                'requestId': opts.requestId,
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







