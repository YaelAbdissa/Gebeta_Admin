<template>
    <header>
        <div><img src="/api/images/101/favicon.ico"><h1>{{ title }} </h1></div>
        <div>
        <Button 
            @click="$router.push('menu')"
            :text="'Menu' " 
            :color="'rgba(107, 155, 107, 0.911)' "/>
        <Button @click="$router.push('orders')" :text=" 'Orders' "  :color= "'#63915f'" />
        <router-link to='/'>
            <Button :text=" 'Logout'"  />
        </router-link>
        </div>
    </header>
</template>

<script>
import Button from './Button'

export default {
    name: 'Header',   
    props: {
        title: String,
    },
    components:{
        Button
    },
    computed: {
    }
}
</script>

<style scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2c3e50;
}

h1,img{
    float: left;
    margin-left: 20px;
}
</style>
