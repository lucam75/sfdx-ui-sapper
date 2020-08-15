<script>
	import * as utils from '../routes/_utils.js'
	export let orgData;

	let newAlias = '';
	let showModal = false;
	let error;

	let handleOpenOrg = () => {
		let results = utils.sendRequest(`/api/manageorgs/open?org=${orgData.alias}`).catch((e) => { error = e; });
		console.log('results ', results);
	}

	let showChangeAliasModal = () => {
		newAlias = '';
		showModal = true;
	}
	let closeChangeAliasModal = () => {
		showModal = false;
		newAlias = '';
	}
	
	let handleChangeAliasOrg = () => {
		console.log('change alias to ' + newAlias);
		let newAlias = prompt(`New alias for ${orgData.username}`);
		let results = utils.sendRequest(`/api/manageorgs/changealias?alias=${newAlias}&username=${orgData.username}`).catch((e) => { error = e; });
		console.log('results ', results);
	}

	let promise = getRepos();
	async function getRepos() {
		let repos = await utils.sendRequest(`/api/repository/list`).catch((e) => { error = e; });
		return repos;
	}
</script>

<style>
	table.table thead tr {
		background-color: lightgray;
	}
	.align-right {
		text-align: right;
	}
</style>

<div class="scratch-org-container">
	<div class="columns">
		<div class="column is-half">
			<h2 class="title">{orgData.alias}</h2>
		</div>
		<div class="column">
			<div class="buttons-container align-right">
				<button class="button is-primary is-small" on:click={handleOpenOrg}>Open</button>
				<button class="button is-warning is-small" on:click={showChangeAliasModal}>Change Alias</button>
				<button class="button is-danger is-small" on:click={handleOpenOrg}>Delete</button>
			</div>
		</div>
	</div>
	
	{#await promise}
	<p>Loading...</p>
	{:then repos}
		<div class="columns">
			<div class="column is-three-fifths is-offset-one-fifth">
				<table class="table table is-bordered table is-striped table is-hoverable table is-fullwidth">
					<thead>
						<tr>
							<th>Repository</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each repos as orgData, i}
						<tr>
							<td>{orgData.Label}</td>
							<td>
								<button class="button is-link is-small">Push</button>
								<button class="button is-link is-small">Pull</button>
								<button class="button is-link is-small">Assign permissions</button>
								<button class="button is-link is-small">Load data</button>
							</td>
						</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	{:catch error}
	<p style="color: red">{error.message}</p>
	{/await}

</div>

<div class="modal" class:is-active="{showModal === true}">
	<div class="modal-background"></div>
	<div class="modal-card">
		<header class="modal-card-head">
			<p class="modal-card-title">Set new alias for {orgData.username}</p>
			<button class="delete" aria-label="close" on:click={closeChangeAliasModal}></button>
		</header>
		<section class="modal-card-body">
			<input class="input" placeholder="type the new alias" type="text" value={newAlias}/>
		</section>
		<footer class="modal-card-foot">
			<button class="button is-success" on:click={handleChangeAliasOrg}>Change alias</button>
		</footer>
	</div>
</div>