const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn bg-sky-100">${el}</span>`);
    return htmlElements.join(' ');
};

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if(status === true){
        document.getElementById('spinner').classList.remove('hidden');
        document.getElementById('word-container').classList.add('hidden');
    }
    else{
        document.getElementById('word-container').classList.remove('hidden');
        document.getElementById('spinner').classList.add('hidden');
    }
};


const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise of response
        .then(res => res.json()) // promise of json data
        .then((json) => {
            displayLessons(json.data);
        });
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lesson-btn');
    lessonButtons.forEach((btn) => btn.classList.remove('active'));
};


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            // console.log(clickBtn);
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
        });
};

// {
//     "id": 72,
//     "level": 1,
//     "word": "Big",
//     "meaning": "বড়",
//     "pronunciation": "বিগ"
// }

const loadWordDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    fetch(url)
        .then((res) => res.json())
        .then((details) => {
            displayWordDetails(details.data);
        });
};

// {
//     "word": "Tranquil",
//     "meaning": "শান্ত / নিরিবিলি",
//     "pronunciation": "ট্রাঙ্কুইল",
//     "level": 6,
//     "sentence": "The park was a tranquil place to relax.",
//     "points": 4,
//     "partsOfSpeech": "adjective",
//     "synonyms": [
//         "peaceful",
//         "calm",
//         "serene"
//     ],
//     "id": 20
// }

const displayWordDetails = (word) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${word.pronunciation})</h2>
        </div>
        <div>
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
        </div>
        <div>
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
        </div>
        <div>
            <h2 class="font-bold">Synonyms</h2>
            <div class="">${createElements(word.synonyms)}</div>
        </div>
    `;
    document.getElementById('word_modal').showModal();

};

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if (words.length === 0) {
        wordContainer.innerHTML = `
        <div class="rounded-xl bg-[#F8F8F8] text-center items-center py-15 col-span-full font-bangla">
            <img class="mx-auto mb-5" src="./assets/alert-error.png" alt="">
            <p class="text-[0.8rem] text-gray-500 mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl font-semibold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
        manageSpinner(false);
        return;
    };

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-md shadow-sm text-center py-12 px-4 space-y-3">
            <h2 class="text-3xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p>Meaning /Pronunciation</p>
            <div  class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি'} / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায়নি'}"</div>
            <div class="mx-8 mt-15 flex justify-between items-center">
                <button onclick="loadWordDetail(${word.id})" class="btn bg-sky-100 hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-sky-100 hover:bg-sky-300"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
        manageSpinner(false);
    });
};

const displayLessons = (lessons) => {
    // console.log(lessons);
    // 1. get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. access the data one by one
    lessons.forEach(lesson => {
        // 3. create element to keep the fetched data
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick = 'loadLevelWord(${lesson.level_no})' href="" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;

        // 4. append to the container
        levelContainer.append(btnDiv);
    });
};

loadLessons();

document.getElementById('btn-search').addEventListener('click', () => {
    removeActive();
    const input = document.getElementById('input-search');
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);
    
    fetch('https://openapi.programming-hero.com/api/words/all')
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue)
    );
    displayLevelWord(filterWords);
    });
});