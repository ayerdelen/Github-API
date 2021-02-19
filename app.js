const GITHUB_API = "https://api.github.com/users";
const formEl = document.querySelector("form");

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputEl = document.querySelector(".input");
  const user = inputEl.value;
  if (user) {
    userApi(user);
    inputEl.value = "";
  }
});

async function userApi(value) {
  const response = await fetch(`${GITHUB_API}/${value}`);
  const responseJSON = await response.json();

  const data = await fetch(`${GITHUB_API}/${value}/repos?sort=created`);
  const dataJSON = await data.json();
  createUserCard(responseJSON, dataJSON);
  addReposToCard(dataJSON);
}

function createUserCard(data, dataJSON) {
  const mainCard = document.querySelector(".main-card");

  const userCard = `
        <div class="card user-card">
            <div class="card-body">
            <img class="card-img" src="${data.avatar_url}"/>
            <div class="user-info">
            <div class="user-name">${data.name}</div>
            <div class="user-bio">${data.bio}</div>
            <div class="user-interactions">
            <span>${data.followers} <strong>Followers</strong></span>
            <span>${data.following} <strong>Following</strong></span>
            <span>${data.public_repos} <strong>Repos</strong></span>
            </div>
            <div class="user-repos">
                    ${renderLink(dataJSON)}
                </div>
            </div>
            </div>
        </div>
    `
    .split(",")
    .join(" ");

  mainCard.innerHTML = userCard;
}

function renderLink(dataJSON) {
  return addReposToCard(dataJSON).map((repo) => {
    return `<a href="${repo.html_url}" class = "card-link">${repo.name}</a>`;
  });
}

function addReposToCard(dataJSON) {
  const addRepo = dataJSON.filter((repo, index) => index < 5);
  return addRepo;
}
