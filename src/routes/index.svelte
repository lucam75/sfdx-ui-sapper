<script>
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import ScratchOrg from './ScratchOrg.svelte';

	let promise = getScratchOrgs();
	let results;
	async function getScratchOrgs() {
		try {
			let res = await fetch('/api/manageorgs/list')
			.then(res => res.json())
			.then(data => {
				results = data;
			}).catch((e) => {
				results = JSON.stringify(e);
			});

			return results.result.scratchOrgs;
		}catch(e) {
			return JSON.stringify(e);
		}
	}

</script>

<style>

</style>

<svelte:head>
	<title>SFDX GUI - UI for Salesforce DX</title>
</svelte:head>

{#await promise}
	<p>...waiting</p>
{:then results}
	<Tabs>
		<TabList>
			{#each results as { alias }}
				<Tab>{alias}</Tab>
			{/each}
		</TabList>
		{#each results as orgData, i}
			<TabPanel>
				<ScratchOrg orgData={orgData}></ScratchOrg>
			</TabPanel>
		{/each}
	</Tabs>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
