const loadCategory = async () => {
  const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
  const data = await response.json();
  // console.log(data.data);
  const videos = data.data;
  console.log(videos);

  const divContainer = document.getElementById('div-container');

  videos.forEach((category) => {
    const div = document.createElement('div');

    div.innerHTML = `
          <button onclick="handleLoadButton('${category.category_id}')" 
          class="btn  bg-gray-200 rounded-lg px-5"> ${category.category} </button>
        `;
    divContainer.appendChild(div)
    // console.log(category.category);
  });
};

const handleLoadButton = async (categoryId) => {
  console.log(categoryId)
  const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await response.json();
  // console.log(data.data);
  const loadId = data.data;
  console.log(loadId);

  // const loadShortView = () => {}
  const cardContainer = document.getElementById('card-container');

  cardContainer.innerHTML = '';

  loadId.forEach((cardItems) => {
    console.log(cardItems);
    const div = document.createElement('div');
    div.innerHTML = `
      <div class="card ml-10 lg:ml-2 w-80 lg:w-72 lg:h-96 bg-base-100 shadow-xl">
      <figure class="">
      <div class="relative">
        <img src=${cardItems.thumbnail} alt="image" class="h-[220px]" />
        ${cardItems.others.posted_date ?
        `<p id="post-date" class="bg-black text-white p-2 absolute bottom-2 right-2">${timeConverter(cardItems.others.posted_date)}</p>` : `<p>''</p> `}
        
        </div>
      </figure>
      <div class="card-body">
        <h2 class="card-title gap-5 "> 
        <img class = "w-10 rounded-full h-10 " src= ${cardItems.authors[0].profile_picture}   alt="authors" />
         ${cardItems.title} </h2>
        <h2>${cardItems.authors[0].profile_name}  <img src="${cardItems.authors[0].verified ? 'svg.png' : ''}" alt="" class="w-4 h-4 inline" />
        </h2>
        <h2>${cardItems.others.views} views</h2>  
      </div>
    </div>
      `;
    cardContainer.appendChild(div);
  });

  const noVideosDiv = document.getElementById('no-videos');
  if (loadId.length === 0) {
    noVideosDiv.classList.remove('hidden');
  } else {
    noVideosDiv.classList.add('hidden');
  }
}

const blogButton =()=> {
  window.location.href = './blog.html';
}

const timeConverter = (inpSeconds) => {
  const seconds = parseInt(inpSeconds);
  if (typeof seconds !== 'number' || seconds < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(seconds / 3600);
  const remaiderSeconds = seconds % 3600;
  const minutes = Math.floor(remaiderSeconds / 60);

  return `${hours} hours and ${minutes} minutes`;
}


//sort by view button
const loadShortView = () => {
  const cardContainer = document.getElementById('card-container');
  const cards = Array.from(cardContainer.children);

  cards.sort((a, b) => {
    const sortA = parseInt(a.querySelector('h2:nth-child(3)').textContent);
    const sortB = parseInt(b.querySelector('h2:nth-child(3)').textContent);
    return sortB - sortA;
  });
  cardContainer.innerHTML = '';
  cards.forEach((card) => {
    cardContainer.appendChild(card);
  });
}

loadCategory();
handleLoadButton('1000');
loadShortView();



// ${videos.authors[0].verified?'svg-icon':''}