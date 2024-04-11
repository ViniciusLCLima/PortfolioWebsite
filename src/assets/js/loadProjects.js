import { Octokit } from "https://esm.sh/@octokit/core";
import { authCode } from "./auth.js"
import clone from 'just-clone'

const authObj = new Octokit ({
    auth: authCode
})
const MY_GIT_HUB_USERNAME = "ViniciusLCLima"
const MY_GIT_HUB_URL = `https://github.com/${MY_GIT_HUB_USERNAME}/`

const getProjLiveUrlAndDescr = async (repoUrl)=>{
    const splittedUrl = repoUrl.split("/")
    const repoName = splittedUrl[splittedUrl.length-1]
	const response = await authObj.request(`GET /repos/${MY_GIT_HUB_USERNAME}/${repoName}`,{
		owner: MY_GIT_HUB_USERNAME,
		name: repoName,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})
	return {
        DESCR: response.data.description,
        LIVE_URL: response.data.homepage
    };
}

const projects = [
	{
		name: "Color Flipper",
	},
    {
        name: "Dad Jokes App"
	}
]

const createProjectDiv = (name, description, liveUrl, repoUrl)=>{
    const containerDiv = document.createElement('div')
    containerDiv.classList.add("col-4", "col-6-medium", "col-12-small project-card")
    const aElem = document.createElement('a')
    aElem.classList.add("image", "fit")
    aElem.setAttribute('href', liveUrl)
    const imgElem = document.createElement('img')
    imgElem.setAttribute("src", `images/${name}.jpg`)
    imgElem.setAttribute("alt", `Screenshot of the project ${name} live.`)
    aElem.appendChild(imgElem)
    containerDiv.appendChild(aElem)
    const titleElem = document.createElement('h3')
    titleElem.textContent = name
    containerDiv.appendChild(titleElem)
    const p = document.createElement('p')
    p.textContent = description
    containerDiv.appendChild(p)
    const btnsDiv = document.createElement('div')
    btnsDiv.classList.add('btns-div')
    containerDiv.appendChild(btnsDiv)
    const liveUrlBtn = document.createElement('a')
    liveUrlBtn.classList.add('btn')
    liveUrlBtn.setAttribute('href', liveUrl)
    const repoBtn = clone(liveUrlBtn)
    btnsDiv.appendChild(liveUrlBtn, repoBtn)
    liveUrl.textContent = "See live"
    repoBtn.textContent = "GitHub"
    repoBtn.classList.add('Secondary')
    return containerDiv
}
const projectsContainer = document.querySelector("#work>section>.row")
projects.forEach(projData=>{
    const PROJ_REPO_URL = MY_GIT_HUB_URL + projData.name.replaceAll(" ", "-")
    getProjLiveUrlAndDescr(PROJ_REPO_URL).then(({DESCR, LIVE_URL})=>{
        projectsContainer.appendChild(createProjectDiv(projData.name, DESCR, LIVE_URL, PROJ_REPO_URL))
    })
})