const { format } = require('date-fns');
const { vi } = require('date-fns/locale');

function convertToVietnameseDateTime(time) {
    const day = format(time, "EEEE", { locale: vi }); // Lấy thứ
    const date = format(time, "dd", { locale: vi }); // Lấy ngày
    const month = format(time, "MMMM", { locale: vi }); // Lấy tháng
    const year = format(time, "yyyy", { locale: vi }); // Lấy năm
    const hour = format(time, "HH", { locale: vi }); // Lấy giờ
    const minute = format(time, "mm", { locale: vi }); // Lấy phút
    const second = format(time, "ss", { locale: vi }); // Lấy giây
    
    return `${day}, ${date} ${month} ${year} ${hour}:${minute}:${second}`;
}

module.exports = { convertToVietnameseDateTime };

