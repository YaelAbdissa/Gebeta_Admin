<template>
    <item 
        @delete-item="this.$emit('delete-item', item._id)"
        @delete-img="deleteImg"
        @toggle-avaliablity="this.$emit('toggle-avaliablity', item._id)"
        @edit-item="this.$emit('edit-item', item._id)"
        :item="item" 
        :key="item.id" 
        v-for="item in items"/>
</template>

<script>
import Item from './Item'
export default {
    name: 'Items',
    props: {
        items: Array
    },
    components: {
        Item
    },
    methods:{
        deleteImg(id, img){
            this.$emit('delete-img',id, img)
        }
    },
    emits: ['delete-item','toggle-avaliablity','edit-item','delete-img']
}
</script>

