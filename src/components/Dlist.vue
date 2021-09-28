<template>
    <transition-group tag="ul" name="list">
        <DriverList @see-driver="$emit('see-driver',driver._id,driver.is_accepted)"  
                :driver="driver" :key="driver._id" v-for="driver in listDrivers"/>
    </transition-group>
</template>

<script>
import DriverList from './DriverList'

export default {
    name: 'List',
    props: {
        listDrivers: Array
    },
    components: {
        DriverList
    },
    emits: ['see-driver']
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