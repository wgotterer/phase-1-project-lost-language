

const init = () => {
    
    ///fetch random picture
    fetch(`https://picsum.photos/v2/list?page=${randomNumber(1, 10)}&limit=100`)
    .then(resp => resp.json())
    .then(data => {
        renderPic(data)
    })
}


function renderPic(data){ ///render Picture

   const imageContainer = document.getElementById("image_container")
   const picBttn = document.getElementById("random_pic_btn")
   const randomImg = document.createElement("img")

    picBttn.addEventListener("click", () => {
        randomImg.src = data[randomNumber(0, 99)]["download_url"];
        randomImg.height = 200;
        randomImg.width = 200;
        imageContainer.appendChild(randomImg)

    })
}

const submitSentence = document.getElementById("sentence_form");
submitSentence.addEventListener("submit", createPicBox)

//when submit sentence button is clicked 
// a container appears with sentence and pic inside. 
// as well as a thumbs up or thumbs down counter
// and an opportunity to write and post a correct sentence
function createPicBox(e){ 
    e.preventDefault();
    // copies image but need to not stop user from submitting the same pic twice
    const cardContainer = document.querySelector(".pic_container")
    const grabRandomPic = document.querySelector("#image_container img")
    const newImage = document.createElement("img")
    newImage.className = ("new_image")
    newImage.src = grabRandomPic.src
    newImage.height  = 200
    newImage.width = 200
    cardContainer.appendChild(newImage)
    ///copies the two sentences and appends the to card container
    const targetLang = document.querySelector("#targetlang")
    const targetLangSentence = document.querySelector(".target_lang_sentence")
    targetLangSentence.textContent = targetLang.value
    const firstLang = document.querySelector("#firstlang")
    const firstLangSentence = document.querySelector(".first_lang_sentence")
    firstLangSentence.textContent = firstLang.value
    ///creates a thumbs  up and thumbs down  
    newImgContainer = document.getElementById("sentence_img_container")
    const thumbsUp = document.createElement("button")
    thumbsUp.className = "thumbs_up"
    thumbsUp.textContent = "👍"
    newImgContainer.appendChild(thumbsUp)

    const thumbsDown = document.createElement("button")
    thumbsDown.className = "thumbs_down"
    thumbsDown.textContent = "👎"
    newImgContainer.appendChild(thumbsDown)

    let thumbsUpNum = document.createElement("h5")
    thumbsUp.appendChild(thumbsUpNum)

   thumbsUp.addEventListener("click", () => {
      thumbsUpNum.textContent = +thumbsUpNum.textContent + 1

   })

   let thumbsDownNum = document.createElement("h5")
   thumbsDown.appendChild(thumbsDownNum)

   thumbsDown.addEventListener("click", () => {
    thumbsDownNum.textContent = +thumbsDownNum.textContent + 1

 })

  
   

}



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

   

document.addEventListener("DOMContentLoaded", init)
