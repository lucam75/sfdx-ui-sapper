export let sendRequestJson = async(url) => {
	let response;

	let res = await fetch(url)
					.then(res => res.json())
					.then(data => { response = data; });
			
	return response;
}

export let sendRequest = async(url) => {
	let response;

	let res = await fetch(url)
					.then(res => res.text())
					.then(data => {
						response = data;
					});
			
	return response;
}