import { Octokit } from "@Octokit/core";
import { authCode } from "./auth.js";
import colorFlipperImg from '../../images/projects/Color Flipper.jpg';
import lightsOutGameImg from '../../images/projects/Lights Out Game.jpg';
import dadJokesAppImg from '../../images/projects/Dad Jokes App.jpg';
import silvestriniSiteImg from '../../images/projects/Silvestrini Website.jpg';
import toDoListImg from '../../images/projects/ToDo List.jpg';
import gitHubIconImg from '../../images/github-mark.png';

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
        descr: response.data.description,
        liveUrl: response.data.homepage
    };
}

const projects = [
    
	{        
		name: "Color Flipper",
        img: colorFlipperImg
	},
    {
        name: "Dad Jokes App",
        img: dadJokesAppImg,
	},
    {
        name: "Silvestrini Website",
        img: silvestriniSiteImg
	},
    {
        name: "ToDo List",
        img: toDoListImg
	},
    {
        name: "Lights Out Game",
        img: lightsOutGameImg
	},
]
projects.reverse()

const LIVE_URL_BTN_TXT_STR = "Live"
const REPO_BTN_TXT_STR = "GitHub"

const createProjectDiv = (name, description, liveUrl, repoUrl, projectImg)=>{
    const containerDiv = document.createElement('div')
    containerDiv.classList.add("col-4", "col-6-medium", "col-12-small", "project-card")
    const aElem = document.createElement('a')
    aElem.classList.add("image", "fit")
    aElem.setAttribute('href', liveUrl)
    const imgElem = document.createElement('img')
    imgElem.setAttribute("src", projectImg)
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
    liveUrlBtn.setAttribute('target', '_blank')
    const repoBtn = liveUrlBtn.cloneNode()
    const gitHubImg = document.createElement('img')
    gitHubImg.setAttribute('src', gitHubIconImg)
    gitHubImg.setAttribute('alt', "Git hub's inverted cat logo")
    repoBtn.appendChild(gitHubImg)
    btnsDiv.appendChild(liveUrlBtn)
    liveUrlBtn.after(repoBtn)
    const liveUrlBtnTxt = document.createTextNode(LIVE_URL_BTN_TXT_STR)
    const repoBtnTxt = document.createTextNode(REPO_BTN_TXT_STR)
    liveUrlBtn.appendChild(liveUrlBtnTxt)
    repoBtn.appendChild(repoBtnTxt)
    repoBtn.classList.add('secondary')
    return containerDiv
}

const loadProjects = () => {
    const projectsContainer = document.querySelector("#work>section>.row")
    projects.forEach(projData=>{
        const PROJ_REPO_URL = MY_GIT_HUB_URL + projData.name.replaceAll(" ", "-")
        getProjLiveUrlAndDescr(PROJ_REPO_URL).then(({descr, liveUrl})=>{
            if (descr.length>173) {
                descr = descr.substring(0,173) + "..."
            }
            projectsContainer.appendChild(createProjectDiv(projData.name, descr, liveUrl, PROJ_REPO_URL, projData.img))
        })
    })
}
export default loadProjects;