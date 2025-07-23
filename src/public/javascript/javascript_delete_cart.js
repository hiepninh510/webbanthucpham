let delete_id = null;
let trElement;

let btn_delete_carts = document.querySelectorAll(".edit_cart.delete_product-in-cart.fa-solid.fa-trash.delete_cart");
btn_delete_carts.forEach(btn_delete_cart=>{
    btn_delete_cart.addEventListener('click',()=>{
        delete_id = btn_delete_cart.dataset.value;
        var xhr_delete_cart = new XMLHttpRequest();
        xhr_delete_cart.open('POST','/admin/giohang/delete',true);
        xhr_delete_cart.setRequestHeader('Content-Type', 'application/json'); 
        xhr_delete_cart.onreadystatechange = function() {
            if (xhr_delete_cart.readyState == 4 && xhr_delete_cart.status == 200) {
                var massage = JSON.parse(xhr_delete_cart.responseText);
                            // if(massage){
                            //     window.location.href = '/cart';
                            //     console.log("Đã xóa "+delete_id+" ra khỏi CSDL");
                            // }
                if(massage){
                    trElement=btn_delete_cart.parentNode.parentNode;
                    trElement.style.display='none';
                }
            }
        }
        xhr_delete_cart.send(JSON.stringify({delete_id:delete_id}));
    });
})
