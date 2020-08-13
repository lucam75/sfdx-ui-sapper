<script>

	let results;
	let handleOnClick = () => {
		fetch('/api/hellow')
		.then(res => res.json())
		.then(data => {
			console.log(data);
			results = data;
		}).catch((e) => {
			results = JSON.stringify(e);
		});
	}
</script>

<svelte:head>
	<title>SFDX GUI - UI for Salesforce DX</title>
</svelte:head>

<Button type="is-primary" on:click={handleOnClick}>Organization list</Button>

<div class="results">
	{results}
</div>

