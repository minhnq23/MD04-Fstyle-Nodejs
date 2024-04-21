const nameInput = document.getElementById('category-name');
const imageInput = document.getElementById("category-image");
const addButton = document.getElementById("btn-add");
const nameError = document.querySelector("#categoryname-error");
const imageError = document.querySelector("#categoryimage-error");
//check name
function checkName(nameInput){
    if(nameInput.value.length === 0){
      nameError.textContent = "*Vui lòng nhập tên thể loại";
      return false;
    }
    return true;
}

function checkImageSelected(imageInput) {
    if (imageInput.value.length === 0) {
        imageError.textContent ="*Vui lòng nhập link ảnh";
        return false;
    }
    return true;
}

addButton.addEventListener('click',  function(e) {
    e.preventDefault();
    if (!checkName(nameInputPro) || !checkImageSelected(imageInputPro)) {
        return;
    }
        fetch("/api/post/categories", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                name: nameInputPro.value,
                image: imageInputPro.value
            })
        })
        .then(response=> response.json())
        .then(data =>{
        if (data.message === "Tạo thể loại thành công") {
            alert(data.message);
            window.location.href = "/categories";
        } else {
            alert(data.message);
        }
        })
        .catch(err=>{
            alert("Error: ",err)
        })
});
