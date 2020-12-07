const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getUser("broccolingual");

async function getUser(username) {
    const resp = await fetch(APIURL + username);
    const respData = await resp.json();

    createUserCard(respData);

    getRepos(username);
}

async function getRepos(username) {
    const resp = await fetch(APIURL + username + "/repos");
    const respData = await resp.json();

    addReposToList(respData);
    addReposToCard(respData);
}

function createUserCard(user) {
    const card = document.createElement("div");
    card.classList.add("card");

    const cardHTML = `
        <div class="profile-container">
            <div class="card">
                <div>
                    <img class="avatar" src="${user.avatar_url}" alt="${user.name}" />
                </div>
                <div class="user-info">
                    <a href=${user.html_url} class="user">${user.name}</a>
                    <p>${user.bio}</p>
                    <div class="follow">
                        <div class="icon">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                        </div>
                        <ul>
                            <li>${user.followers}<strong>Followers</strong></li>
                            <li>${user.following}<strong>Following</strong></li>
                            <li>${user.public_repos}<strong>Repos</strong></li>
                        </ul>
                    </div>
                    <div class="info">
                        <ul>
                            <li>
                                <div class="icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                                </div>
                                <span>${user.company}</span>
                            </li>
                            <li>
                                <div class="icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                </div>
                                <span>${user.location}</span>
                            </li>
                            <li>
                                <div class="icon">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                </div>
                                <span>${user.email}</span>
                            </li>
                        </ul>
                    </div>
                    <h4>Repos:</h4>
                    <div id="repos"></div>
                </div>
            </div>
        </div>
        <div class="repos-container">
            <div class="repo-cards" id="repo-cards"></div>
        </div>
    `;

    main.innerHTML = cardHTML;
}

function addReposToList(repos) {
    const reposEl = document.getElementById("repos");
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 9).forEach((repo) => {
        const repoEl = document.createElement("a");
        repoEl.classList.add("repo");

        repoEl.href = repo.html_url;
        repoEl.target = "_blank"
        repoEl.innerText = repo.name;

        reposEl.appendChild(repoEl);
    });
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repo-cards");
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count).forEach((repo) => {
        const repoEl = document.createElement("div");
        repoEl.classList.add("card");

        repoEl.innerHTML = `
            <div class="user-info">
                <a href=${repo.html_url} target="_blank" class="user">${repo.name}</a>
                <p>${repo.description}</p>
                <ul>
                    <li>
                        <div class="icon">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                        <span>${repo.language}</span>
                    </li>
                    <li>
                        <div class="icon">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                        </div>
                        <span>${repo.stargazers_count}</span>
                    </li>
                </ul>
            </div>
        `;

        reposEl.appendChild(repoEl);
    });
}

form.addEventListener('submit', e => {
    e.preventDefault();

    const user = search.value;
    
    if(user) {
        getUser(user);

        search.value = "";
    }
});