document.querySelector('form').addEventListener('submit', function(event) {
    const numberproduct = parseInt(document.querySelector('input[name="numberproduct"]').value);
    const priceOld = parseFloat(document.querySelector('input[name="priceOld"]').value);
    const priceNew = parseFloat(document.querySelector('input[name="priceNew"]').value);
    const fileInput = document.querySelector('input[name="imgproduct"]');
    const file = fileInput.files[0];
  
    // Kiểm tra số lượng
    if (isNaN(numberproduct) || numberproduct <= 0 || !Number.isInteger(numberproduct)) {
        alert('Số lượng sản phẩm phải là số nguyên dương.');
        event.preventDefault();
        return;
    }

    // Kiểm tra giá gốc và giá mới
    if (isNaN(priceOld) || isNaN(priceNew) || priceOld < 0 || priceNew < 0 || !(/^\d+(\.\d{1,3})?$/.test(priceOld)) || !(/^\d+(\.\d{1,3})?$/.test(priceNew))) {
        alert('Giá sản phẩm phải là số không âm và có định dạng hợp lệ (ví dụ: 1000.000).');
        event.preventDefault();
        return;
    }

    // Kiểm tra trường file ảnh
    // if (!file) {
    //     alert('Vui lòng chọn một tệp ảnh.');
    //     event.preventDefault();
    //     return;
    // }

    const maxSize = 5 * 1024 * 1024; // Kích thước tệp tối đa là 5MB
    const validImageTypes = ['image/png', 'image/jpeg', 'image/gif']; // Các định dạng hình ảnh hợp lệ
    const fileExtension = file.name.split('.').pop().toLowerCase();
    console.log(fileExtension);

    if (validImageTypes.includes(fileExtension) && file.size < maxSize) {
        alert('Tệp phải là hình ảnh có kích thước không lớn hơn 5MB và có định dạng là .png, .jpeg, .jpg, hoặc .gif.');
        event.preventDefault();
        return;
    }
});
