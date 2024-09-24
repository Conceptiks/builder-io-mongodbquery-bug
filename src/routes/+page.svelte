<script lang="ts">
    import type { LayoutServerData } from './$types';

    export let data: LayoutServerData;
    $: ({ queryOne, queryTwo } = data);

    $: console.log('queryOne', queryOne);
    $: console.log('queryTwo', queryTwo);
</script>

<h1>builder.io mongoDB-Query Bug</h1>
<p>
    Two queries (test-cases) exist inside <code>+layout.server.ts</code>. These queries both try to fetch available data
    structures from a data-model using different queries.
</p>
<p>
    <strong>Open your console to see both query results</strong>. For us, the <code>queryOne</code> returns empty, even
    with live
    <code>event-teasers</code> published (and matching the query).
</p>
