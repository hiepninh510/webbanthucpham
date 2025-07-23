//Sự kiện khi nhấn thêm vào giỏ hàng
var btn_Add_Cart = document.querySelectorAll('button.cart_btn.btn.btn--primary');
btn_Add_Cart.forEach((button) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        var productId = button.value;
        var noCart = document.querySelector('span.header__cart-notice');
        if (!document.querySelector('span.header__navbar-user-name')) {
            noCart.textContent = parseInt(noCart.textContent) + 1;
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/add-to-cart', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    // Xử lý phản hồi từ máy chủ (nếu cần)
                    var massage = JSON.parse(xhr.responseText);
                    if (massage) {
                        noCart.textContent = parseInt(noCart.textContent) + 1;
                    }

                }
            };
            xhr.send(JSON.stringify({ productId: productId }));
        }

    })
})

//Tăng số lượng sản phẩm trong giỏ hàng
function addProduct() {
    var increase = parseInt(document.querySelector('.header__cart-notice').textContent);
    document.querySelector('.header__cart-notice').textContent = increase + 1;
}

//Load trang vẫn không bị mất đi sản phẩm trong giỏ hàng
// window.onload = function() {
//     var storedCart = localStorage.getItem('cart');
//     var cart_hadProducts = localStorage.getItem('cart_hadProduct');
//     var isClicked = localStorage.getItem('isClicked');
//     var count_Clicked = localStorage.getItem('count_Clicked');
//     if(JSON.parse(cart_hadProducts) && JSON.parse(isClicked) && !JSON.parse(count_Clicked)){
//         checkNotice_Cart();
//     }
//     if (storedCart) {
//         var products_inCart = JSON.parse(storedCart);
//         document.querySelector('.header__cart-notice').textContent = parseInt(products_inCart.length);
//             checkNotice_Cart();
//         var inFor_Cart ='';
//         products_inCart.forEach((product_inCart)=>{
//             inFor_Cart += '<li class="header__cart-item">'+
//                 '<img src="'+product_inCart.img+'" alt="" class="header__cart-item-img">'+ 
//                     '<div class="header__cart-item-info">'+
//                        '<div class="header__cart-item-head">'+
//                             '<h5 class="header__cart-item-name">'+product_inCart.name+' </h5>'+
//                             '<div class="header__cart-item-price-wrap">'+
//                                 '<span class="header__cart-item-price">'+product_inCart.priceNew.$numberDecimal+'đ</span>'+
//                                 '<span class="header__cart-item-mutiply">x</span>'+
//                                 '<span class="header__cart-item-qnt">1</span>'+
//                             '</div>'+
//                         '</div>'+
//                         '<div class="header__cart-item-body">'+
//                             '<span class="header__cart-item-description">'+
//                                 'NXS:'+product_inCart.brand+''+
//                             '</span>'+
//                             '<span class="header__cart-item-remove">Xóa</span>'+
//                         '</div>'+
//                    '</div>'+
//                '</li>'
//         });

//         document.getElementById('product_cart').innerHTML = inFor_Cart;
//     }
// };

//Hàm kiểm tra xem có sản phẩm nào trong giỏ hàng chưa
// function checkNotice_Cart(){
//     var noCart = document.querySelector('span.header__cart-list-no_cart');
//     var car_hadProduct = '';
//     localStorage.setItem('cart_hadProduct',JSON.stringify(car_hadProduct));
//     var used_To_Click = localStorage.getItem('cart_hadProduct');
//     if(!JSON.parse(used_To_Click)){
//         var cart_List = document.querySelector('.header__cart-list');
//         var headerCart_Wrap = document.querySelector('.header__cart-wrap');
//         car_hadProduct += '<h4 class="header__cart-heading">Sản phẩm đã thêm</h4>'+
//                 '<ul class="header__cart-list-item" id="product_cart">'+
//                 '</ul>'+
//                 '<a href="#" class="header__cart-view btn btn--primary">Xem giỏ hàng</a>'
//         cart_List.innerHTML = car_hadProduct;
//         headerCart_Wrap.appendChild(cart_List);
//         localStorage.setItem('cart_hadProduct',JSON.stringify(car_hadProduct));
//         noCart.remove();
//         return true;
//     }

//     return false;
// }

//Khi vào giỏ hàng


//Login 
var frm_login = document.querySelector('.modal');

var loginBtn = document.getElementById('login');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        frm_login.style.display = "block";
    })
}

frm_login.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }
})

var close = document.querySelector('.close_design');
close.addEventListener('click', () => {
    frm_login.style.display = "none";
})

// function navigateToSearch(searchValue) {
//        window.location.href = "/search?search=" + searchValue;
// }



// Lấy các phần tử HTML cần thiết
const passwordInput = document.getElementById("formGroupExampleInput2");
const eyeIcon = document.querySelector(".eye_pass");

// Xử lý sự kiện khi người dùng nhấn vào biểu tượng mắt
eyeIcon.addEventListener("click", () => {
    // Kiểm tra trạng thái của input
    if (passwordInput.type === "password") {
        // Nếu là mật khẩu ẩn, hiển thị mật khẩu
        passwordInput.type = "text";
        // Thay đổi icon thành biểu tượng mở mắt
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        // Nếu là mật khẩu hiển thị, ẩn mật khẩu
        passwordInput.type = "password";
        // Thay đổi icon thành biểu tượng đóng mắt
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
});



















