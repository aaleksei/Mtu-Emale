const text = document.querySelector("#tervitus")
const btn = document.querySelector("#nupp")

btn.addEventListener("click", function(){
    if(text.innerHTML === "ou"){
         text.innerHTML = "kuuled vä"
    } else {
        text.innerHTML = "ou"
    }
   
    text.classList.toggle("colour_change")
})
