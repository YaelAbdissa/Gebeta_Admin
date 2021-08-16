<template>
    <ListItem @delete-item="this.$emit('delete-item', item._id)" :item="item" :key="item.id" v-for="item in listItems"/>
</template>

<script>
import ListItem from './ListItem'
export default {
    name: 'List',
    props: {
        listItems: Array
    },
    components: {
        ListItem
    },
    emits: ['delete-item']
}
</script>

