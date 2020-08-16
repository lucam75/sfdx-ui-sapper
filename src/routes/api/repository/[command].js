import repos from '../configs/repositories.js';
const { execSync } = require("child_process");

let queryString;
let response;
let contentType = 'application/json';

export function get(req, res, next) {
	// the `command` parameter is available because this file
	// is called [command].js
	const { command } = req.params;
	queryString = req.query;

	console.log('Repository command ', command);

	switch(command){
		case 'list':
			listRepos();
        break;
        case 'push':
			pushCode();
        break;
        case 'pull':
			pullCode();
		break;
	};

	if (response !== undefined) {
		res.setHeader('Content-Type', contentType);
		res.end(JSON.stringify(response));
	} else {
		next();
	}
}

function listRepos() {
	// response = execSync('sfdx force:org:list --json');
    response = repos;
	// if response is success update the orgs.js file
	// research how to handle cache and avoiding run the comman everytime.
}

function pushCode() {
    // set current directory to queryString.repo
    let currentRepo = repos.find(x => x.Name === queryString.repo);
    if (currentRepo !== undefined) {
		contentType = 'text/plain';
        process.chdir(currentRepo.Path);
        response = execSync('dir');
    }
    
    // push code to queryString.org
    // response = execSync(`sfdx force:source:push -u ${queryString.org}`);
}

function pullCode() {
    // response = execSync(`sfdx force:source:pull -u ${queryString.org}`);
}