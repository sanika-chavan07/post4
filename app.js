let cl = console.log

const PostContainer = document.getElementById("PostContainer")
const POSTForm = document.getElementById("POSTForm")
const titleControl = document.getElementById('title')
const bodyControl = document.getElementById("body")
const addpostbtn = document.getElementById("addpostbtn")
const userIdControl = document.getElementById("userId")
const updatebtn = document.getElementById("updatebtn")

let BASE_URL = `https://jsonplaceholder.typicode.com`
let POST_URL = `${BASE_URL}/posts`

let xhr = new XMLHttpRequest()

xhr.open("GET", POST_URL, true)
xhr.send()

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status <= 299) {
        let data = JSON.parse(xhr.response)
        createPostCards(data)
        cl(data)
    }
}

const createPostCards = (arr) => {
    let result = '';
    for (let i = arr.length - 1; i >= 0; i--) {

        result += `<div class="col-md-4 mb-4" id="${arr[i].id}">
                <div class="card h-100">
                    <div class="card-header">
                        <h5>${arr[i].title}</h5>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${arr[i].body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-sm btn-primary">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
            </div>`
    }

    PostContainer.innerHTML = result
}

function onpostsubmit(eve) {

    eve.preventDefault();

    let POST_OBJ = {
        title: titleControl.value,
        body: bodyControl.value,
        userId: userIdControl.value
    }

    cl(POST_OBJ)

    let xhr = new XMLHttpRequest()

    xhr.open("POST", POST_URL, true)

  

    xhr.send(JSON.stringify(POST_OBJ))

    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status <= 299) {
            let data = JSON.parse(xhr.response)
            cl(data)

            col=document.createElement('div')
            col.className=`col-md-4 mb-4`;
            col.innerHTML=`
            <div class="card h-100">
                    <div class="card-header">
                        <h5>${POST_OBJ.title}</h5>
                    </div>
                    <div class="card-body">
                        <p class="m-0">${POST_OBJ.body}</p>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="onEdit(this)" class="btn btn-sm btn-primary">Edit</button>
                        <button onclick="onRemove(this)" class="btn btn-sm btn-danger">Remove</button>
                    </div>
                </div>
            
            
            
            `
           PostContainer.prepend(col) 
        }
    }
}

function onEdit(ele){
    let EDIT_ID=ele.closest('.col-md-4').id
    let EDIT_URL=`${BASE_URL}/posts/${EDIT_ID}`
    cl(EDIT_URL)



    let xhr=new XMLHttpRequest()
    xhr.open("GET",EDIT_URL,true)
    xhr.send(JSON.stringify(EDIT_ID))
    xhr.onload= function(){
        if(xhr.status>=200 && xhr.status<=299){
            let data=xhr.response
            let EDIT_OBJ=
            JSON.parse(xhr.response)
            titleControl.value=EDIT_OBJ.title,
            bodyControl.value=EDIT_OBJ.body,
            userIdControl.value=EDIT_OBJ.userId,
            addpostbtn.classList.add("d-none")
            updatebtn.classList.remove("d-none")

           
           
           

cl(data)
                
        }
        
    }

}

function onUpdatepost(ele){
    let UPDATE_ID=ele.closest('.col-md-4').id
    let UPDATE_URL=`${BASE_URL}/posts/${UPDATE_ID}`
    let xhr=new XMLHttpRequest()

    xhr.open("PATCH",POST_URL,true)
    xhr.send(JSON.stringify(UP))
    xhr.onload =function(){
        if(xhr.status>=200 && xhr.status<=299){
            cl(xhr.parse(UPDATE_ID))
            

        }
        
    }
























}


function onRemove(ele){
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed)
    
    
    {
        let Remove_ID=ele.closest('.col-md-4').id
        let REMOVE_URL=`${BASE_URL}/posts/${Remove_ID}`


        let xhr=new XMLHttpRequest()

        xhr.open("DELETE",REMOVE_URL,true)

        xhr.send()
        xhr.onload =function(){
            if(xhr.status>=200 && xhr.status<=299){
                ele.closest('.col-md-4').remove()
            }
        }
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});

}

updatebtn.addEventListener("click",onUpdatepost)
POSTForm.addEventListener("submit", onpostsubmit)