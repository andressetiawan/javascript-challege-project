const favoriteBtn = document.body.querySelector(".btn-favorite");
const getRecipes = async () => {
  try {
    const response = await fetch("./recipes.json");
    const recipiesData = await response.json();
    return recipiesData;
  } catch (e) {
    console.log(e);
  }
};

const getFavorite = () => {
  const favIds = JSON.parse(localStorage.getItem("favIds"));
  return favIds === null ? [] : favIds;
};

const addFavoriteLS = (id) => {
  const favIds = getFavorite();
  localStorage.setItem("favIds", JSON.stringify([...favIds, id]));
};

const removeFavoriteLs = (id) => {
  const newFavIds = getFavorite().filter((e) => e !== id);
  localStorage.setItem("favIds", JSON.stringify([...newFavIds]));
};

const addFavorite = (data) => {
  const loveIcon = document.body.querySelector(".fa-heart");
  if (!favoriteBtn.classList.contains("active")) {
    addFavoriteLS(data.id);
    loveIcon.classList.remove("far");
    loveIcon.classList.add("fas");
    favoriteBtn.classList.add("active");
  } else {
    removeFavoriteLs(data.id);
    loveIcon.classList.remove("fas");
    loveIcon.classList.add("far");
    favoriteBtn.classList.remove("active");
  }

  getRecipes().then((res) => loadFavorite(res));
};

const closeDesc = () => {
  const descEl = document.body.querySelector(".recipes-desc");
  descEl.style.display = "none";
};

const loadRecipes = (data) => {
  const descEl = document.body.querySelector(".recipes-desc");
  descEl.style.display = "block";
  descEl.innerHTML = `
  <div class="desc-header">
  <h1>Bahan-bahan</h1>
  <h1 onclick="closeDesc()" class="btn-close">X</h1>
  </div>
  ${data.ingredients.map((item) =>
    item.qty == 0
      ? `<p class="ingredients-text">${item.name} <b>${item.units}</b></p>`
      : `<p><b>${item.qty} ${item.units}</b> ${item.name}</p>`
  )}`;
};

const loadMeal = (data) => {
  const randomIndex = Math.floor(Math.random() * data.length);
  const randomTitleEl = document.body.querySelector(".random-meal-title");
  const imageEl = document.body.querySelector(".body-img");
  const loveIcon = document.body.querySelector(".fa-heart");
  randomTitleEl.textContent = data[randomIndex].name;

  imageEl.setAttribute("src", data[randomIndex].img);

  getFavorite().map((id) => {
    if (data[randomIndex].id == id) {
      loveIcon.classList.remove("far");
      loveIcon.classList.add("fas");
      favoriteBtn.classList.add("active");
    }
  });

  imageEl.addEventListener("click", () => loadRecipes(data[randomIndex]));

  favoriteBtn.addEventListener("click", () => {
    addFavorite(data[randomIndex]);
  });
};

const favDesc = async (data) => {
  const favData = await getRecipes().then((res) =>
    res.filter((e) => e.id == data)
  );
  loadRecipes(favData[0]);
};

const loadFavorite = (data) => {
  let HTMLFavoriteList = "";
  const favContainerEl = document.body.querySelector(".recipes-header ul");

  const favId = getFavorite();
  if (favId.length !== 0) {
    favId.map((id) => {
      const favData = data.filter((item) => item.id == id);
      HTMLFavoriteList += `<li onclick="favDesc(${favData[0].id})">
        <img class="header-img" src="${favData[0].img}"/>
        <p>${favData[0].name}</p>
      </li>`;
    });
  } else {
    for (let i = 0; i < 3; i++) {
      HTMLFavoriteList += `<li>
        <img
          class="header-img"
          src="https://wallpapercave.com/wp/wp3269246.jpg"
          alt="meal-1"
        />
      </li>`;
    }
  }

  favContainerEl.innerHTML = HTMLFavoriteList;
};

getRecipes().then((res) => {
  loadMeal(res);
  loadFavorite(res);
});
