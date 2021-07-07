document.addEventListener('DOMContentLoaded', () => {
    imageList();
    breedList();
    dropDown();
    dogBreedsFilter()
})

function imageList(){
    fetch("https://dog.ceo/api/breeds/image/random/4")       
    .then(res => res.json())                                    
    .then(data => data.message.forEach(getImg))                  
}                                                                

function getImg(dogs){                                           
    let dogImg = document.createElement("img")                   
    dogImg.src = dogs

    document.querySelector("#dog-image-container").append(dogImg)
}


function breedList(){
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(res => res.json())
    .then(data => {
        getBreeds(Object.keys(data.message))
    })
}

function getBreeds(breeds){
    breeds.forEach(getBreed)
}

function getBreed(breed){
    let dogLi = document.createElement("li")
    dogLi.textContent = `${breed}`

    document.querySelector("#dog-breeds").append(dogLi)

    dogLi.addEventListener('click', () => {
        dogLi.style.color = 'red'
    })

}

function dropDown(){
    document.querySelector('#breed-dropdown').addEventListener("change", (e) => {
        const selectLetter = e.target.value;
        document.querySelector('#dog-breeds').innerHTML = ""
        dogBreedsFilter(selectLetter)       
    })
}

function dogBreedsFilter(letter){
    fetch("https://dog.ceo/api/breeds/list/all")
    .then(res => res.json())
    .then(data => {
        getBreeds(Object.keys(data.message).filter(breed => breed[0] === letter))
    })
}