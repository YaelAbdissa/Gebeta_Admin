<template>
    <transition-group tag="table" name="list">
        <tr key="1100"><th>Name</th><th>Picture</th><th>orders</th><th>Email</th>
        <th>Phone</th><th>Location</th><th>Joined</th></tr>
        <ClientList @see-client="$emit('see-client',client._id)" :client="client" 
                :key="client._id" v-for="client in listItems"/>
    </transition-group>
</template>

<script>
import ClientList from './ClientList'

export default {
    name: 'List',
    props: {
        listItems: Array
    },
    components: {
        ClientList
    },
    emits: ['see-client']
}
</script>
<style scoped>
th{
    color: aliceblue;
    padding: 8px 10px;
    border-top-right-radius: 1em;
    background-color: rgb(126, 141, 141);
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