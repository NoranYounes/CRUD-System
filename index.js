var iname=document.getElementById("formGroupExampleInput")
var iurl=document.getElementById("formGroupExampleInput2");
var closebtn=document.getElementById("closeBtn");
var deleteAll=document.getElementById("deleteAll");
var mybox=document.querySelector(".mybox");
console.log(closebtn);
console.log(mybox);

console.log(iurl);
var mylist;
if(localStorage.getItem("website")!==null){
mylist=JSON.parse(localStorage.getItem("website"));
display();
}
else{
    mylist=[];
}
function add(){
    if(validateinput(iname.id,iname.value)==true&&validateinput(iurl.id,iurl.value)==true){
  var mywebsite={
    webname:iname.value,
myurl:iurl.value
  }
  mylist.push(mywebsite);
  localStorage.setItem("website",JSON.stringify(mylist));
  display();
  resetinputs();
}
else{
  mybox.classList.replace("d-none", "d-flex");
}
}



function display(){
    var box=``;
    
    for(var i=0; i<mylist.length; i++){
     
box+=`
<tr>
            <th scope="row">${i}</th>
            <td>${mylist[i].webname}</td>
            <td><button  type="button" class="btn btn-success"> <i class="fa-solid fa-eye pe-1"></i>  <a href="${mylist[i].myurl}" target="_blank" class="text-light text-decoration-none " >visit</a></button></td>
            <td><button onclick="deleterow(${i})" type="button" class="btn btn-danger"><i class="fa-solid fa-trash-can pe-1"></i> Delete</button></td>

          </tr>
`;

    }
document.querySelector("tbody").innerHTML=box;

if(mylist.length>1){
  deleteAll.classList.replace("d-none", "d-block");
}
else{
  deleteAll.classList.replace("d-block", "d-none");
}
}


function resetinputs(){
  iname.value="";
  iurl.value="";
}
function deleterow(index){
mylist.splice(index, 1);
display();
localStorage.setItem("website",JSON.stringify(mylist));
}


var my_inputs = document.querySelectorAll(".myform input");
for(var i=0;i<my_inputs.length;i++){
my_inputs[i].addEventListener("input",function(e){
  validateinput(e.target.id,e.target.value);
})
}
function validateinput(id,value){
  var el=document.getElementById(id);
  var regex={
    formGroupExampleInput:/^[A-Z][a-z]{3,15}{0-9}*$/,
    formGroupExampleInput2:/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
  }
if(regex[id].test(value)==true){
  el.classList.add("is-valid");
  el.classList.remove("is-invalid");
  return true;
}
else{
  el.classList.add("is-invalid");
  el.classList.remove("is-valid");
  return false;
}

}
closebtn.addEventListener("click", function(){
mybox.classList.replace("d-flex", "d-none");
});
deleteAll.addEventListener("click", function(){
  mylist=[];
  localStorage.setItem("website",JSON.stringify(mylist));
  document.querySelector("tbody").innerHTML='';
  deleteAll.classList.replace("d-block", "d-none");
})
