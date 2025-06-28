import "./styles.css";
import axios from "axios";

const API_URL = "https://api.github.com/users/";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const createErrorCard = ({ message }) => {
  main.innerHTML = `
  <div class="card">
  <h2>${message}</h2>
</div>
  `;
};

const createUserCard = ({ userData }) => {
  const { avatar_url, name, bio, public_repos, followers, following } =
    userData;
  main.innerHTML = `
  <div class="card">
  <div>
    <img
      src="${avatar_url}"
      alt="${name}"
      class="avatar"
    />
  </div>
  <div class="user-info">
    <h2>${name}</h2>
    <p>${bio}</p>

    <ul>
      <li>${followers} <strong>Followers</strong></li>
      <li>${following} <strong>Following</strong></li>
      <li>${public_repos} <strong>Repos</strong></li>
    </ul>

    <div id="repos"></div>
  </div>
</div>
  `;
};

const addReposToCard = ({ reposData }) => {
  const reposEl = document.getElementById("repos");

  reposData.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");
    repoEl.href = repo.html_url;
    repoEl.target = "_blank";
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
};

const fetchRepos = async ({ username }) => {
  try {
    const { data: reposData } = await axios(
      API_URL + username + "/repos?sort=created"
    );

    addReposToCard({ reposData });
  } catch (error) {
    createErrorCard({ message: "Problem fetching repos..." });
  }
};

const getUser = async ({ username }) => {
  try {
    const { data: userData } = await axios(API_URL + username);
    createUserCard({ userData });
    fetchRepos({ username });
  } catch (error) {
    if (error.response.status === 404) {
      createErrorCard({ message: "No profiles exists for this username" });
    }
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  getUser({ username: user });

  search.value = "";
});
