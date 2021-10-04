

const init = () => {
    
    
    fetch(`https://picsum.photos/v2/list?page=${randomNumber(1, 10)}&limit=100`)
    .then(resp => resp.json())
    .then(data => {
        renderPic(data)
    })
}


function renderPic(data){ ///render

   const imageContainer = document.getElementById("image_container")
   const picBttn = document.getElementById("random_pic_btn")
   const randomImg = document.createElement("img")
   const form = document.createElement("form")
   form.className = "form_pic" ///create the form
   form.setAttribute("method", "post");
   form.setAttribute("action", "submit.php");
   const sentence = document.createElement("input");
   sentence.setAttribute("type", "text");
   sentence.setAttribute("name", "sentence");
   sentence.setAttribute("placeholder", "Write sentence here");
   
   
   console.log(sentence)

    picBttn.addEventListener("click", () => {
        randomImg.src = data[randomNumber(0, 99)]["download_url"];
        randomImg.height = 200;
        randomImg.width = 200;
        imageContainer.appendChild(randomImg)
        form.appendChild(sentence)
        imageContainer.appendChild(form)
        const submitBttn = document.createElement("button")
        submitBttn.textContent = "Submit Sentence!"
        form.appendChild(submitBttn)
        submitBttn.addEventListener("click", createPicBox)

    })
}


//when submit sentence button is clicked 
// a container appears with sentence and pic inside. 
// as well as a thumbs up or thumbs down counter
// and an opportunity to write and post a correct sentence
function createPicBox(e){ 
    e.preventDefault();



}


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

   

document.addEventListener("DOMContentLoaded", init)
