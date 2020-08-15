<script>
    import * as utils from './_utils'
    export let orgData;

    let newAlias = '';
    let showModal = false;

    let handleOpenOrg = () => {
        let results = utils.sendRequest(`/api/manageorgs/open?org=${orgData.alias}`);
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
        // let newAlias = prompt(`New alias for ${orgData.username}`);
        // let results = utils.sendRequest(`/api/manageorgs/changealias?alias=${newAlias}&username=${orgData.username}`);
        // console.log('results ', results);
    }
</script>

<div class="scratch-org-container">
    <div class="columns">
        <div class="column is-half">
            <h2 class="title">{orgData.alias}</h2>
        </div>
        <div class="column">
            <div class="buttons-container">
                <button class="button is-primary" on:click={handleOpenOrg}>Open</button>
                <button class="button is-warning" on:click={showChangeAliasModal}>Change Alias</button>
                <button class="button is-danger" on:click={handleOpenOrg}>Delete</button>
            </div>
        </div>
    </div>
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
      <button class="button" on:click={closeChangeAliasModal}>Cancel</button>
    </footer>
  </div>
</div>