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
	{
		name:"",
		description:"",
		imgPath: "",
		liveUrl:"",
		repositoryUrl:"",
	},
	{
		name:"",
		description:"",
		imgPath: "",
		liveUrl:"",
		repositoryUrl:"",
	},
	{
		name:"",
		description:"",
		imgPath: "",
		liveUrl:"",
		repositoryUrl:"",
	},
	{
		name:"",
		description:"",
		imgPath: "",
		liveUrl:"",
		repositoryUrl:"",
	},
]
