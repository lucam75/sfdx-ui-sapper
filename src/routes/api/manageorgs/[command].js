import orgs from '../configs/orgs.js';
const { execSync } = require("child_process");

let queryString;
let response;

export function get(req, res, next) {
	// the `command` parameter is available because this file
	// is called [command].js
	const { command } = req.params;
	queryString = req.query;

	console.log('command ', command);

	switch(command){
		case 'list':
			listOrgs();
		break;
		case 'open':
			openOrg();
		break;
		case 'changealias':
			changeAlias();
		break;
	};

	if (response !== undefined) {
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify(response));
	} else {
		next();
	}
}

function listOrgs() {
	// response = execSync('sfdx force:org:list --json');
	response = orgs;
	// if response is success update the orgs.js file
	// research how to handle cache and avoiding run the comman everytime.
}

function openOrg() {
	response = execSync(`sfdx force:org:open -u ${queryString.org} --json`);
}

function changeAlias() {
	response = execSync(`sfdx force:alias:set ${queryString.alias}=${queryString.username}`)
}