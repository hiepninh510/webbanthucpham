let delet_acc = document.querySelectorAll('.edit_cart.delete_product-in-cart.fa-solid.fa-trash.delete_cart');
let body_modal = document.querySelector('div.modal-body');
let delete_id = null;
let trElement;

delet_acc.forEach((delet) => {
    delet.addEventListener('click',()=>{
        delete_id = delet.dataset.value;
        body_modal.innerHTML = "Bạn có muốn xóa người dùng " + delete_id;
        trElement = delet.parentNode.parentNode;
    });
});

let btn_delete = document.getElementById('btn_delete');
btn_delete.addEventListener('click',()=>{
    var xhr_delete_acc = new XMLHttpRequest();
    xhr_delete_acc.open('POST','/admin/delete-account',true);
    xhr_delete_acc.setRequestHeader('Content-Type', 'application/json'); 
    xhr_delete_acc.onreadystatechange = function() {
        if (xhr_delete_acc.readyState == 4 && xhr_delete_acc.status == 200) {
            var massage = JSON.parse(xhr_delete_acc.responseText);
                        // if(massage){
                        //     window.location.href = '/cart';
                        //     console.log("Đã xóa "+delete_id+" ra khỏi CSDL");
                        // }
            if(massage){
                trElement.style.display='none';
            }
        }
    }
    xhr_delete_acc.send(JSON.stringify({delete_id:delete_id}));
});

