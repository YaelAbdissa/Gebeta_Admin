<template>
    <h1>Version 1.0.0</h1>
    <router-link to="/">Go Back</router-link>
</template>

<script>
export default {
    name: 'About',
    props: {
        showAddItem: Boolean,
        update: Boolean
    },
    emits:['toggle-item','update-item']
}
</script>