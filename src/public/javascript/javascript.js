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
            xhr.open('POST', '/cart/add-to-cart', true);
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



















