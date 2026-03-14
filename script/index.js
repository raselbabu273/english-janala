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

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById('word-container');
    wordContainer.innerHTML = '';

    if(words.length === 0){
        wordContainer.innerHTML = `
        <div class="rounded-xl bg-[#F8F8F8] text-center items-center py-15 col-span-full font-bangla">
            <img class="mx-auto mb-5" src="./assets/alert-error.png" alt="">
            <p class="text-[0.8rem] text-gray-500 mb-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h2 class="text-2xl font-semibold">নেক্সট Lesson এ যান</h2>
        </div>
        `;
    };

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="bg-white rounded-md shadow-sm text-center py-12 px-4 space-y-3">
            <h2 class="text-3xl font-bold">${word.word ? word.word : 'শব্দ পাওয়া যায়নি'}</h2>
            <p>Meaning /Pronunciation</p>
            <div  class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : 'অর্থ পাওয়া যায়নি' } / ${word.pronunciation ? word.pronunciation : 'Pronunciation পাওয়া যায়নি'}"</div>
            <div class="mx-8 mt-15 flex justify-between items-center">
                <button onclick="my_modal_5.showModal()" class="btn bg-sky-100 hover:bg-sky-300"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-sky-100 hover:bg-sky-300"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `;

        wordContainer.append(card);
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