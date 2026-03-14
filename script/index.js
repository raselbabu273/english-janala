const loadLessons = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all') // promise of response
    .then(res => res.json()) // promise of json data
    .then((json) => {
        displayLessons(json.data);
    });
};

const displayLessons = (lessons) => {
    // 1. get the container
    const levelContainer = document.getElementById('level-container');
    levelContainer.innerHTML = "";

    // 2. access the data one by one
    lessons.forEach(lesson => {
        // 3. create element to keep the fetched data
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button href="" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `;

        // 4. append to the container
        levelContainer.append(btnDiv);
    });
};


loadLessons();