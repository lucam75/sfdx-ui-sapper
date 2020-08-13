const { execSync } = require("child_process");

export function get(req, res, next) {
	const { slug } = req.params;

	let response = execSync('sfdx force:org:list --json');

    res.setHeader('Content-Type', 'application/json');
    res.end(response);

	/*if (article !== null) {
		
	} else {
		next();
	}*/
}