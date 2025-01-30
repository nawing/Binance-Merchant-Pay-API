# Binance Merchant Pay API 

#### Creating Instance
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