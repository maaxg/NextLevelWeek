const buttonSearch = document.querySelector("#page-home main a")
/**/
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")
/*Quando eu clicar dentro do "a" <- O pesquisar pontos de coleta
ele se perguntará se dentro desse a existe uma classe hide ou não 
*/ 
buttonSearch.addEventListener("click", () =>{
   modal.classList.toggle("hide") 
})
close.addEventListener("click", () =>{
    modal.classList.add("hide")

})
