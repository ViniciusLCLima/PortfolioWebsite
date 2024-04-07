import { Octokit } from "https://esm.sh/@octokit/core";
import { authCode } from "./auth.js"

const authObj = new Octokit ({
    auth: authCode
})

const gitHubUsername = 'ViniciusLCLima'

const getRepositoryDescription = async (repoUrl)=>{
    const splittedUrl = repoUrl.split("/")
    const repoName = splittedUrl[splittedUrl.length-1]
	const response = await authObj.request(`GET /repos/${gitHubUsername}/${repoName}`,{
		owner: gitHubUsername,
		name: repoName,
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})
	return response.data.description;
}

const projects = [
	{
		imgPath: "images/projects/color-flipper",
		liveUrl:"",
		repositoryUrl:"https://github.com/ViniciusLCLima/Color-Flipper",
	},
]

const createProjectDiv = (name, description, liveUrl, repoUrl)=>{
    const containerDiv = document.createElement('div')
    containerDiv.classList.add("col-4", "col-6-medium", "col-12-small")
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
    return containerDiv
}

document.querySelector('section .row').appendChild(createProjectDiv('Color-Flipper', await getRepositoryDescription(projects[0].repositoryUrl), projects[0].liveUrl, projects[0].repositoryUrl))

// projects.forEach(projData=>{
//     createProjectDiv(projName, description, projData.liveUrl,projData.repoUrl)
// })