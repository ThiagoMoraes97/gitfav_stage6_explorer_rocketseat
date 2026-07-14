const userInput = document.getElementById("git_search")
const favoritesButton = document.querySelector(".favorite-button")
const userHeaderColumn = document.querySelector("thead tr .user")
let userInfo = []

userInput.addEventListener("keydown", event => {
    if(event.key === "Enter"){
        favoriteUser()
    }
})

favoritesButton.addEventListener("click", favoriteUser)

async function getGitHubUserInfo(username) {
    const cleanUsername = username.trim()

    if(!cleanUsername){
        alert("Digite um username do GitHub.")
        return
    }

    const userExist = userInfo.some(user => user.login.toLowerCase() === cleanUsername.toLowerCase())
    if(userExist){
        alert("Esse usuário já foi favoritado.")
        return
    }

    try{ 

        const endpoint = `https://api.github.com/users/${encodeURIComponent(cleanUsername)}`
        const response = await fetch(endpoint)

        if(!response.ok){
            throw new Error ("Digite um usuário válido.")
        }

        const jsonGitHub = await response.json()
    
        const {login, name, public_repos, followers} = jsonGitHub

        const newUser = {login, name, public_repos, followers}

        userInfo = [newUser, ...userInfo]
        updateTrInfo()
        saveInfoLocal(userInfo)
        userInput.value = ""
        userInput.focus()
    }catch (error){ 
        alert(error.message)
    }

}

function createTableTr () {
    const tr = document.createElement("tr")

    const isAnyUser = userHeaderColumn.classList.contains("no-user") 

    if(isAnyUser){

        tr.innerHTML = `
        <td class="without-users" colspan="4">
            <div class="td-content">
                <img src="./assets/star_table.svg" alt="Imagem de uma estrela com uma expressão assustada.">
                Nenhum favorito ainda
            </div>
        </td>`

    } else {
        tr.innerHTML = `
        <td class="username-info" data-label="Usuário">
            <img src="https://github.com/maykbrito.png" alt="Imagem de usuário do GitHub de Mayk Brito">
            <div class="user-info">
                <p>Mayk Brito</p>
                <a href="https://github.com/maykbrito" target="_blank" rel="noopener noreferrer">maykbrito</a>
            </div>
        </td>
        <td class="public_repos" data-label="Repositories">125</td>
        <td class="followers" data-label="Followers">1235</td>
        <td class="action-info" data-label="Ação">
            <button class="remove-button">Remover</button>
        </td>`
    }

    return tr
}

function updateTrInfo () {
    if(userInfo.length === 0){
        removeAllTr()
        userHeaderColumn.classList.add("no-user")
        let tr = createTableTr()
        document.querySelector("tbody").append(tr)
        return
    }

    userHeaderColumn.classList.remove("no-user")
    removeAllTr()
    userInfo.forEach(user => {
        const tr = createTableTr()
        const displayName = user.name || user.login

        tr.querySelector(".username-info img").src = `https://github.com/${user.login}.png`
        tr.querySelector(".username-info img").alt = `Imagem de usuário do GitHub de ${displayName}`
        tr.querySelector(".username-info .user-info p").textContent = displayName
        tr.querySelector(".username-info .user-info a").textContent = user.login
        tr.querySelector(".username-info .user-info a").href =`https://github.com/${user.login}`
        tr.querySelector(".public_repos").textContent = user.public_repos
        tr.querySelector(".followers").textContent = user.followers
        tr.querySelector(".remove-button").onclick = () => removeUser(user)
        document.querySelector("tbody").append(tr)
    })

}

function removeAllTr () {
    const tbody = document.querySelector("tbody")
    const allTr = tbody.querySelectorAll("tr")
    allTr.forEach(tr => tr.remove())
}

function saveInfoLocal (userList) {
    const userListJson = JSON.stringify(userList)
    localStorage.setItem("github-users", userListJson)
}

function getInfoLocal () {
    const userList = localStorage.getItem("github-users")

    if(!userList){
        userInfo = []
        return
    }

    try{
        const parsedUserList = JSON.parse(userList)
        userInfo = Array.isArray(parsedUserList)
            ? parsedUserList.filter(user => user && typeof user.login === "string")
            : []
    }catch{
        userInfo = []
        saveInfoLocal(userInfo)
    }
}

function removeUser (user) {
    const newUserInfo = userInfo.filter(data => data.login != user.login)
    userInfo = newUserInfo
    saveInfoLocal(userInfo)
    updateTrInfo()
}

function favoriteUser () {
    const username = userInput.value 
    getGitHubUserInfo(username) 
}

getInfoLocal()
updateTrInfo()
