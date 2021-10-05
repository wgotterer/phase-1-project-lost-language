const API_BASE_URL = 'https://picsum.photos';
const LOCAL_BASE_URL = 'http://localhost:3000';

const init = () => {
    const picBttn = document.getElementById("random_pic_btn")
    picBttn.addEventListener("click", getRandomPic);

    getRandomPic();

    fetch(`${LOCAL_BASE_URL}/translations`)
        .then(resp => resp.json())
        .catch(error => {
            console.error(error);
        })
        .then(translations => {
            translations.forEach(renderTranslation)
        })
}

function getRandomPic() {
///fetch random picture
    fetch(`${API_BASE_URL}/v2/list?page=${randomNumber(1, 10)}&limit=100`)
    .then(resp => resp.json())
    .then(pictures => {
        // renderPic(data)
        const randomPicture = pictures[randomNumber(0, 99)];
        console.log(randomPicture);
        setTranslationForm(randomPicture)
    })
}

function setTranslationForm({id, download_url}) {
    document.getElementById('sentence_form').setAttribute('imageId', id);
    const imageContainer = document.getElementById("image_container");
    const formImage = document.createElement('img');
    formImage.src = download_url;
    imageContainer.replaceChildren(formImage);
}

const submitSentence = document.getElementById("sentence_form");
submitSentence.addEventListener("submit", handleFormSubmit)

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            imageId: form.getAttribute('imageId'),
            target: form.querySelector('#targetlang').value,
            first: form.querySelector('#firstlang').value,
            likes: 0,
            dislikes: 0
        })
    }

    fetch('http://localhost:3000/translations', options)
        .then(resp => resp.json())
        .catch(error => {
            console.error(error);
        })
        .then(translation => {
            renderTranslation(translation)
        })

    form.reset();
}

function renderTranslation(translation) {
    let translationCard = document.getElementById(`translation-card-${translation.imageId}`);
    if (translationCard === null) {
        translationCard = createPicBox(translation.imageId);
    }
    const translationSubcard = document.createElement('div');
    translationSubcard.className = 'translation-subcard';

    const targetLanguageText = document.createElement('div');
    targetLanguageText.className = 'translation-text'

    const targetLanguageLabel = document.createElement('span');
    targetLanguageLabel.className = 'language-label';
    targetLanguageLabel.textContent = 'en'; // TODO: change to match dropdown value
    
    const targetLanguageSentence = document.createElement('span');
    targetLanguageSentence.textContent = translation.target;

    const firstLanguageText = document.createElement('div');
    firstLanguageText.className = 'translation-text'

    const firstLanguageLabel = document.createElement('span');
    firstLanguageLabel.className = 'language-label';
    firstLanguageLabel.textContent = 'es'; // TODO: change to match dropdown value
    
    const firstLanguageSentence = document.createElement('span');
    firstLanguageSentence.textContent = translation.first;

    const thumbsUp = document.createElement("button")
    thumbsUp.className = "thumbs_up"
    thumbsUp.textContent = "👍"
    const thumbsUpNum = document.createElement("span")
    thumbsUpNum.textContent = translation.likes
    thumbsUp.appendChild(thumbsUpNum)



    thumbsUp.addEventListener("click", () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                likes: ++translation.likes,
            })
        };
        fetch(LOCAL_BASE_URL + '/translations/' + translation.id, options)
        .then(resp => resp.json())
        .catch(error => {
            console.error(error);
        })
        .then(translation => {
            thumbsUpNum.textContent = translation.likes
        })
    })

    const thumbsDown = document.createElement("button")
    thumbsDown.className = "thumbs_down"
    thumbsDown.textContent = "👎"
    const thumbsDownNum = document.createElement("span")
    thumbsDownNum.textContent = translation.dislikes
    thumbsDown.appendChild(thumbsDownNum)

    thumbsDown.addEventListener("click", () => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dislikes: ++translation.dislikes,
            })
        };
        fetch(LOCAL_BASE_URL + '/translations/' + translation.id, options)
        .then(resp => resp.json())
        .catch(error => {
            console.error(error);
        })
        .then(translation => {
            thumbsDownNum.textContent = translation.dislikes
        })
    })

    targetLanguageText.append(targetLanguageLabel, targetLanguageSentence);
    firstLanguageText.append(firstLanguageLabel, firstLanguageSentence);
    translationSubcard.append(targetLanguageText, firstLanguageText, thumbsUp, thumbsDown);
    translationCard.querySelector('.translation-submissions').append(translationSubcard);
}

function createPicBox(imageId){ 
    const translationCard = document.createElement("article");
    translationCard.className = "translation-card";
    translationCard.id = `translation-card-${imageId}`;

    const translationImageContainer = document.createElement("div")
    translationImageContainer.className = "translation-image";

    const translationSubmissions = document.createElement('div');
    translationSubmissions.className = 'translation-submissions';

    translationCard.append(translationImageContainer, translationSubmissions);

    document.querySelector('#section-translations').append(translationCard);

    fetch(`${API_BASE_URL}/id/${imageId}/info`)
    .then(resp => resp.json())
    .then(image => {
        const translationImg = document.createElement("img")
        translationImg.src = image.download_url 
        const translationBttn = document.createElement("button")
        const lineBreak = document.createElement("br")
        translationBttn.textContent = "Add a translation"
        translationImageContainer.append(translationImg, lineBreak, translationBttn)
        translationBttn.addEventListener("click", () => {
            setTranslationForm(image)
        })
    })

    return translationCard;
}



function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

   

document.addEventListener("DOMContentLoaded", init)
