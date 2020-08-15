<script>
	import { Tabs, Tab, TabList, TabPanel } from 'svelte-tabs';
	import ScratchOrg from '../components/ScratchOrg.svelte';
	import * as utils from './_utils'

	let error;
	let promise = getScratchOrgs();
	async function getScratchOrgs() {
		let results = await utils.sendRequest(`/api/manageorgs/list`).catch((e) => { error = e; });

		return results;
	}

</script>

<style>
:global(.svelte-tabs li.svelte-tabs__selected){
	background-color: #fff;
    border-color: #dbdbdb;
    border: 1px solid;
    border-bottom-color: transparent!important;
}
</style>

<svelte:head>
	<title>SFDX GUI - UI for Salesforce DX</title>
</svelte:head>

{#await promise}
	<p>Loading...</p>
{:then results}
	<Tabs>
		<TabList>
			{#each results.result.scratchOrgs as { alias }}
				<Tab>{alias}</Tab>
			{/each}
		</TabList>
		{#each results.result.scratchOrgs as orgData, i}
			<TabPanel>
				<ScratchOrg orgData={orgData}></ScratchOrg>
			</TabPanel>
		{/each}
	</Tabs>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
