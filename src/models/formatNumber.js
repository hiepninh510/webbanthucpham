const formatNumber = require('format-number');

// Tạo hàm định dạng tiền tệ Việt Nam
const vietnamCurrency = formatNumber({
    suffix: ' VNĐ',
    prefix: '',
    integerSeparator: '.',
    decimalSeparator: ',',
    padRight: 3,
});

module.exports = vietnamCurrency;
