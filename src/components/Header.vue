<template>
    <header>
        <div class="logo"><img src="/api/images/101/favicon.ico"><h1>{{ title }} </h1></div>
        <div class="nav">
        <Button 
            @click="$router.push('restaurant')"
            :text="'Restaurant' " 
            :color="'linear-gradient(to right, #404348, #4d837e)' "/>
        <Button @click="$router.push('customers')" :text=" 'Customers' "  :color= "'linear-gradient(to right, #4d837e, #7a7573)'" />
        <Button @click="$router.push('driver')" :text=" 'Drivers' "  :color= "'linear-gradient(to right, #757472, #9c7777)'" />
        <router-link to='/'>
            <Button :text=" 'Logout'"  :color="'linear-gradient(to right, #914d3c, #dd6f5d)'"/>
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
    background-color: #e4dfd8;
    border-radius: 0.5em;
    margin-bottom: 0.6em;
}

.logo{
    display: flex;
}

h1,img{
    align-self: center;
    margin-left: 1em;
}

.nav{
    text-align: right;
    margin-right: 1em;
}

button{
    color: white;
    text-decoration: none;
    font-size: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    font-weight: 700;
    box-shadow: 3px 3px rgb(54 52 52 / 40%);
    transition: 0.4s ease-out;
}

button:hover{
    box-shadow: 1px 1px rgba(87, 81, 81, 0.6);
}

</style>
