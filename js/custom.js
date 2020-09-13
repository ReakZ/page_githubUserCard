"use strict";

const USER_API = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getUser(userName) {
  const req = await fetch(USER_API + userName);
  const responce = await req.json();
  createUserCard(responce);
  getRepose(userName);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
    search.value = "";
  }
});

function createUserCard(user) {
  const CardHtml = `
<div class="card">
  <div >
    <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
  </div>
  <div class="user-info">
    <h2>${user.name ? user.name : user.login}</h2>
    <p>${user.bio ? user.bio : ""}</p>
    <ul class="info">
      <li>${user.followers} <strong>Followers</strong></li>
      <li>${user.following} <strong>Following</strong></li>
      <li>${user.public_repos} <strong>Repos</strong> </li>
    </ul>
    <div id="repos"></div>
  </div>
</div>
`;
  main.innerHTML = CardHtml;
}

async function getRepose(userName) {
  const req = await fetch(USER_API + userName + "/repos");
  const responce = await req.json();
  addReposToCard(responce);
}

function addReposToCard(reposList) {
  const reposElements = document.getElementById("repos");
  reposList
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .forEach((repo) => {
      const repoElement = document.createElement("a");
      repoElement.classList.add("repo");
      repoElement.href = repo.html_url;
      repoElement.target = "_blank";
      repoElement.innerText = repo.name;
      reposElements.appendChild(repoElement);
    });
}
