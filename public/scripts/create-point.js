/*document
    .querySelector("select[name=uf]")
    .addEventListener("change", () =>{
        console.log("mudei!")
    } )*/

function populateUFs(){
    const ufSelect = document
            .querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res =>  res.json())
   // faz a mesma coisa que a de cima .then( (res) => { return res.json() })
    .then( states => {
        for(const state of states ){
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
        }
        
    })
}

populateUFs()

function getCities(event){
    const ctSelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    let ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    ctSelect.innerHTML = '<option value="">Selecione a cidade</option>'
    ctSelect.disabled = true;
    fetch(url)
    .then( res =>  res.json())
   // faz a mesma coisa que a de cima .then( (res) => { return res.json() })
    .then( cities => {

        for(const city of cities ){
            ctSelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
        }
        ctSelect.disabled = false;
    })
}

    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)

//Itens de coleta
//Pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li");
for(let item of itemsToCollect){
    /*Para cada item selecionado da lista de items de coleta, ele adiciona um evento de click e passa uma função por referencia que será o 'ouvidor'*/ 
    item.addEventListener("click", handleSelectedItem);
}
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];
function handleSelectedItem(event){
    const itemLi = event.target
    //Adicionar ou remover uma classe com javascript
    //O toggle faz a função de adicionar ou remover a classe
    //Ele se pergunta se existe a classe ou não dentro do elemento, se existir ele remover, se não ele adiciona 
    itemLi.classList.toggle("selected")

    /*A função que foi setada no html como data, vai fazer a separação dos elementos e reotrnar apenas o número/nome que foi passado como id*/ 
    const itemId = event.target.dataset.id;

    
    
    //verificar se existem itens selecionados, se sim 
    //pegar os itens selecionados.
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })
    //Se já estiver selecionado, tirar da seleção.
    if(alreadySelected >= 0){
        //Tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId 
            return itemIsDifferent
        } )
        selectedItems = filteredItems
    }
    else{   
        //se não estiver selecionado, adicionar à seleção.
        selectedItems.push(itemId)
    }
  
    //atualizar o campo escondido com os dados selecionados.
    collectedItems.value = selectedItems
}