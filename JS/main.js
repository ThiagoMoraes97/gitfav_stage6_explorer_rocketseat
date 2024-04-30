let userInput = document.getElementById("git_search")
let favoritesButton = document.querySelector(".favorite-button")
let userHeaderColumn = document.querySelector("thead tr .user")
let userInfo = []


favoritesButton.onclick = () => {
   let username = userInput.value 
   getGitHubUserInfo(username)
}

async function getGitHubUserInfo(username) {

    const userExist = userInfo.find(users => users.login === username)

    console.log(userExist)

    if(userExist){
        return
    }

    let endpoint = `https://api.github.com/users/${username}`

    let jsonGitHub = await fetch(endpoint).then(file => file.json()) 
    
    const {login, name, public_repos, followers} = jsonGitHub

    const newUser = {login, name, public_repos, followers}

    userInfo = [newUser, ...userInfo]

    updateTrInfo()

}

function createTableTr () {
    let tr = document.createElement("tr")

    let isAnyUser = userHeaderColumn.classList.contains("no-user") 

    if(isAnyUser){

        tr.innerHTML = `
        <td class="without-users" colspan="4">
            <div class="td-content">
                <img src="/assets/star_table.svg" alt="Imagem de uma estrela com uma espressão de assustada.">
                Nenhum favorito ainda
            </div>
        </td>`

    } else {
        tr.innerHTML = `
        <td class="username-info">
            <img src="https://github.com/maykbrito" alt="Imagem de usuário do GitHub de Mayk Brito">
            <div class="user-info">
                <p>Mayk Brito</p>
                <a href="https://github.com/maykbrito" target="_blank">maykbrito</a>
            </div>
        </td>
        <td class="public_repos">125</td>
        <td class="followers">1235</td>
        <td>
            <button class="remove-button">Remover</button>
        </td>`
    }

    return tr
}

function updateTrInfo () {
    if(userInfo.length === 0){
        userHeaderColumn.classList.add("no-user")
        let tr = createTableTr()
        document.querySelector("tbody").append(tr)
        return
    }

    userHeaderColumn.classList.remove("no-user")
    removeAllTr()
    userInfo.forEach(user => {
        let tr = createTableTr()
        tr.querySelector(".username-info img").src = `https://github.com/${user.login}.png`
        tr.querySelector(".username-info img").alt = `Imagem de usuário do GitHub de ${user.name}`
        tr.querySelector(".username-info .user-info p").textContent = user.name
        tr.querySelector(".username-info .user-info a").textContent = user.login
        tr.querySelector(".username-info .user-info a").href =`https://github.com/${user.login}`
        tr.querySelector(".public_repos").textContent = user.public_repos
        tr.querySelector(".followers").textContent = user.followers
        tr.querySelector(".remove-button").onclick = () => {console.log(`Esse é o usuário de ${user.name}`)}
        document.querySelector("tbody").append(tr)
    })

}

function removeAllTr () {
    const tbody = document.querySelector("tbody")
    const allTr = tbody.querySelectorAll("tr")
    allTr.forEach(tr => tr.remove())
}