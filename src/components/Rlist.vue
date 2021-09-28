<template>
    <transition-group tag="ul" name="list">
        <RestaurantList @see-rest="$emit('see-rest',rest._id,rest.is_approved)" 
            :rest="rest" :key="rest._id" v-for="rest in restaurants"/>
    </transition-group>
</template>

<script>
import RestaurantList from './RestaurantList'

export default {
    name: 'List',
    props: {
        restaurants: Array
    },
    components: {
        RestaurantList
    },
    emits: ['see-rest']
}
</script>
<style scoped>
ul{
    width: fit-content;
    margin-top: 15px; 
    padding: 10px 10px;
    border-radius: 0.2em;
    background-image: linear-gradient(to right, #adb6bb,#dedad4);  
}

.list-enter-from{
    opacity: 0;
    transform: scale(0.6) rotate(10deg);
    -moz-transform: scale(0.6) rotate(10deg);
}
.list-enter-to{
    opacity: 1;
    transform: scale(1);
    -moz-transform: scale(1);
}
.list-enter-active{
    transition: all 0.6s ease;
    -moz-transition: all 0.6s ease;
}
</style>

