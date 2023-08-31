const container = document.getElementById("video-container");
const tabContainer = document.getElementById("tab-container");

const renderTab = (allCategory) => {
  console.log(allCategory);
  allCategory.forEach((category) => {
    const button = document.createElement("button");
    button.classList.add(
      "py-2 px-4 border-none focus-visible:outline-none bg-[#252525]/20 hover:bg-[#252525]/25 transition text-[16px] font-medium rounded-[4px]"
    );
    button.innerText = category.category;

    tabContainer.appendChild(button);
  });
};

const fetchData = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();

  data.data.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");

    card.innerHTML = `
        <header class="rounded-lg overflow-hidden">
            <img
              class="h-[200px] w-full object-cover"
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

    container.appendChild(card);
  });
};

const fetchCategoryData = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();

    // data.data.forEach((category) => fetchData(category.category_id));
    renderTab(data.data);

    const categoryAll = data.data.find(
      (category) => category.category === "All"
    ).category_id;

    fetchData(categoryAll);
  } catch (error) {
    console.log("💥ERROR:", error);
  }
};
fetchCategoryData();
