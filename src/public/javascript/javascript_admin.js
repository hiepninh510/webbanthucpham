let delet_product = document.querySelectorAll('a.edit_cart.delet_product');
let body_modal = document.querySelector('div.modal-body');
let delete_id = null;
let trElement;

delet_product.forEach((delet) => {
    delet.addEventListener('click',()=>{
        let value = delet.dataset.value;
        delete_id = delet.dataset.id;
        body_modal.innerHTML = "Bạn có muốn xóa " + value;
        trElement = delet.parentNode.parentNode;
    });
});

let btn_delete = document.getElementById('btn_delete');
btn_delete.addEventListener('click',()=>{
    var xhr_delete = new XMLHttpRequest();
    xhr_delete.open('POST','/admin/deleteproduct',true);
    xhr_delete.setRequestHeader('Content-Type', 'application/json'); 
    xhr_delete.onreadystatechange = function() {
        if (xhr_delete.readyState == 4 && xhr_delete.status == 200) {
            var massage = JSON.parse(xhr_delete.responseText);
                        // if(massage){
                        //     window.location.href = '/cart';
                        //     console.log("Đã xóa "+delete_id+" ra khỏi CSDL");
                        // }
            if(massage){
                trElement.style.display='none';
            }
        }
    }
    xhr_delete.send(JSON.stringify({delete_id:delete_id}));
});

