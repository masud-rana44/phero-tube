const videoContainer = document.getElementById("video-container");
const tabContainer = document.getElementById("tab-container");
const emptyContainer = document.getElementById("empty-container");
const btnSort = document.getElementById("btn-sort");

let isSort = false;

btnSort.addEventListener("click", () => {
  const activeBtn = document.querySelector(".active");
  const activeId = activeBtn.getAttribute("id");
  fetchDataWithId(activeId, !isSort);
  isSort = !isSort;

  // if (isSort) btnSort.classList.add("active");
  // else btnSort.classList.remove("active");
});

function setBtnActive(btnId) {
  const btns = document.querySelectorAll(".btnTab");
  btns.forEach((btn) => {
    const categoryId = btn.getAttribute("id");

    if (categoryId === btnId) btn.classList.add("active");
    else btn.classList.remove("active");
  });
}

function handleTabEvent() {
  const btns = document.querySelectorAll(".btnTab");
  btns.forEach((btn) =>
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("id");
      setBtnActive(id);
      fetchDataWithId(id);
      isSort = false;
    })
  );
}

function renderTab(allCategory) {
  tabContainer.innerHTML = "";

  allCategory.forEach(function (category) {
    const button = document.createElement("button");
    button.setAttribute("id", category.category_id);
    button.classList.add(
      "btnTab",
      "py-2",
      "px-4",
      "border-none",
      "focus-visible:outline-none",
      "bg-[#252525]/20",
      "transition",
      "text-[16px]",
      "font-medium",
      "rounded-[4px]"
    );
    button.innerText = category.category;

    tabContainer.appendChild(button);
  });

  handleTabEvent();
}

function renderVideos(videos) {
  videoContainer.innerHTML = "";

  if (!videos.length) {
    emptyContainer.classList.add("flex");
    emptyContainer.classList.remove("hidden");
    videoContainer.classList.remove("mb-28");
    return;
  } else {
    emptyContainer.classList.remove("flex");
    emptyContainer.classList.add("hidden");
    videoContainer.classList.add("mb-28");
  }

  videos.forEach(function (video) {
    const card = document.createElement("div");
    card.innerHTML = `
        <header class="rounded-lg overflow-hidden">
            <img
              class="h-[200px] w-full"
              src=${video.thumbnail}
              alt="thumbnail"
            />
          </header>
          <div class="flex gap-3 mt-5">
            <img
              class="w-10 h-10 rounded-full object-cover"
              src=${video.authors[0].profile_picture}
              alt="User image"
            />
            <div class="flex flex-col gap-2">
              <h2 class="text-[#171717] font-bold leading-[26px]">
                ${video.title}
              </h2>
              <div class="flex items-center gap-2">
                <p class="text-sm text-[#171717B2]/70">${
                  video.authors[0].profile_name
                }</p>
                ${
                  video.authors[0].verified
                    ? '<img src="./img/tick.svg" alt="verified icon" />'
                    : ""
                }
              </div>
              <p class="text-sm text-[#171717B2]/70">${video.others.views}</p>
            </div>
          </div>
  `;

    videoContainer.appendChild(card);
  });
}

function handleSort(data) {
  return data.sort((a, b) => {
    const views1 = parseFloat(a.others.views);
    const views2 = parseFloat(b.others.views);
    return views2 - views1;
  });
}

async function fetchDataWithId(id, isSorted = false) {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const data = await res.json();

    const videosData = isSorted ? handleSort(data.data) : data.data;

    renderVideos(videosData);
  } catch (error) {
    console.log("💥ERROR:", error);
  }
}

function fetchInitialData(categories, categoryName) {
  const id = categories.find(
    (cat) => cat.category === categoryName
  ).category_id;
  fetchDataWithId(id);
  setBtnActive(id);
}

async function fetchCategoryData() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    renderTab(data.data);
    fetchInitialData(data.data, "All");
  } catch (error) {
    console.log("💥ERROR:", error);
  }
}
fetchCategoryData();
