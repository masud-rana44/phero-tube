const videoContainer = document.getElementById("video-container");
const tabContainer = document.getElementById("tab-container");

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
      "hover:bg-[#252525]/25",
      "transition",
      "text-[16px]",
      "font-medium",
      "rounded-[4px]"
    );
    button.innerText = category.category;

    tabContainer.appendChild(button);
  });

  const btnsTab = document.querySelectorAll(".btnTab");
  console.log(btnsTab);
}

function renderVideo(videos) {
  videoContainer.innerHTML = "";

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

async function fetchDataWithId(id) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();

  renderVideo(data.data);
}

async function fetchCategoryData() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    // data.data.forEach(function(category) {
    //   fetchDataWithId(category.category_id);
    // });
    renderTab(data.data);

    const categoryAll = data.data.find(function (category) {
      return category.category === "All";
    }).category_id;

    fetchDataWithId(categoryAll);
  } catch (error) {
    console.log("💥ERROR:", error);
  }
}

fetchCategoryData();
