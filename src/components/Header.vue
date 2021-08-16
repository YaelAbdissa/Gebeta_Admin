<template>
    <header>
        <div><img src="/api/images/101/favicon.ico"><h1>{{ title }} </h1></div>
        <div>
        <Button 
            @click="$router.push('restaurant')"
            :text="'Restaurant' " 
            :color="'rgba(107, 155, 107, 0.911)' "/>
        <Button @click="$router.push('customers')" :text=" 'Customers' "  :color= "'#5f9186'" />
        <Button @click="$router.push('driver')" :text=" 'Drivers' "  :color= "'#bfb45c'" />
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
