var sdt = document.getElementById('sdt');
var address = document.getElementById('address');
const id_user = document.getElementById('id_user').dataset.value;
var _id_cart = document.querySelectorAll('span.id_cart');
const sum_price = document.getElementById('sum_price').dataset.value;
const pay_modal = document.getElementById('pay_modal');
var accuracy =document.querySelectorAll('div.accuracy');
function checkSDT(data_1,data_2){
    if(!data_1){
        sdt.focus();
    } else if(!data_2){
        address.focus();
    }else{
        pay_modal.style.display='block';
        let arr_id_cart = [];
        _id_cart.forEach(id => {
           arr_id_cart.push(id.dataset.value);
        });
        var xhr_order = new XMLHttpRequest();
        xhr_order.open('POST','/thanhtoan/order',true);
        xhr_order.setRequestHeader('Content-Type', 'application/json');
        xhr_order.onreadystatechange = function(){
            if (xhr_order.readyState == 4 && xhr_order.status == 200) {
                const mesage =JSON.parse(xhr_order.responseText);
                if(mesage){
                    setTimeout(()=>{
                        accuracy.forEach(ac=>{
                            let iconElement = ac.querySelector('.accuracy i');
                            let h2Element = ac.querySelector('.accuracy h2');
                    
                            if(iconElement){
                                iconElement.classList.remove('fa-solid');
                                iconElement.classList.remove('fa-circle-exclamation');
                                iconElement.classList.add('fa-solid');
                                iconElement.classList.add('fa-circle-check');
                            } else{
                                h2Element.innerHTML="Xác Nhận Thành Công"
                            }
                        });
                    },3000);
                    setTimeout(()=>{
                        window.location.href='/';
                    },4000);
                }
            };
        }
        xhr_order.send(JSON.stringify({arr_id_cart:arr_id_cart,id_user:id_user,sum_price:sum_price,sdt:sdt.value,address:address.value}));
    };
};

// Lấy các phần tử HTML cần thiết
const updateLocationBtn = document.getElementById("update_location");
const updatePhoneBtn = document.getElementById("update_phone");
const addressInput = document.getElementById("address");
const phoneInput = document.getElementById("sdt");
const btn_Pay = document.querySelector('.btn.btn-lg.btn-block');
// Xử lý sự kiện khi nhấn vào nút "Thay đổi" cho địa chỉ giao hàng
updateLocationBtn.addEventListener("click", () => {
    addressInput.readOnly = false;
    addressInput.focus(); // Tự động đặt con trỏ tại ô nhập liệu
});

// Xử lý sự kiện khi nhấn vào nút "Thay đổi" cho số điện thoại
updatePhoneBtn.addEventListener("click", () => {
    phoneInput.readOnly = false;
    phoneInput.focus(); // Tự động đặt con trỏ tại ô nhập liệu
});

// Xử lý sự kiện khi người dùng rời khỏi ô nhập số điện thoại
phoneInput.addEventListener("blur", () => {
    const phoneNumber = phoneInput.value.trim();
    const phoneNumberRegex = /^(0[0-9]{9})$/; // Định dạng số điện thoại: bắt đầu bằng 0 và có tổng cộng 10 số
    if (!phoneNumberRegex.test(phoneNumber)) {
        let noty_alert = true;
        if(noty_alert){
            alert("Số điện thoại không hợp lệ. Vui lòng nhập lại.");
        }
        phoneInput.readOnly = true;
        btn_Pay.disabled = true;
        btn_Pay.style.pointerEvents = 'none';
    } else {
        phoneInput.readOnly = true;
        btn_Pay.disabled = false;
        btn_Pay.style.pointerEvents = 'auto';
    }
});

addressInput.addEventListener("blur", () => {
    addressInput.readOnly = true;
});


