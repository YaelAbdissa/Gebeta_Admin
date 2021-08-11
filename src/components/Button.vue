<template>
    <button :style="{background: color}">{{text}} </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        color: String
    }
}
</script>

<style scoped>
button{
    display: inline-block;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin: 5px;
    font-size: 15px;
}
</style>

