<template>
    <Header title="Restaurant List" />
    <h2 style="color:green">Active Restaurants</h2>
    <Rlist :restaurants="activeRest" @see-rest="seeRest"/>
    <h2 style="color:orange">Pending Restaurants</h2>
    <Rlist :restaurants="pendingRest" @see-rest="seeRest"/>
    <RestPopup  :showRest="showRest" @close="showRest=false" :rest="rest" @approve="approve"/>
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header from '../components/Header'
import Rlist from '../components/Rlist'
import RestPopup from '../components/RestPopup'
import NotificationList from '../components/NotificationList' 

export default{
    name: 'Restaurants',
    components: {
        Header,
        RestPopup,
        NotificationList,
        Rlist
    },
    data() {
        return{
            activeRest: [],
            pendingRest: [],
            showRest: false,
            rest: null,
            notifications: []
        }
    },
    methods: {
        async fetchRestaurants(){
            const res = await fetch('api/restaurant',{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        async fetchRestaurant(id){
            const res = await fetch(`api/restaurant/${id}`,{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        seeRest(id,is_approved){
            if(is_approved){
                this.rest = this.activeRest.find((r) => r._id == id)
            }else{
                this.rest = this.pendingRest.find((r) => r._id == id)
            }
            this.showRest = true
        },
        async approve(rest){
            const restToToggle = await this.fetchRestaurant(this.rest._id)
            const updItem = {...restToToggle, is_approved: rest}
            const res =  await fetch(`api/restaurant/${this.rest._id}`, {
                headers: this.getHeader(),
                method: 'PUT',
                body: JSON.stringify(updItem)
            })
            const data = await res.json()
            if(res.status === 200){
                this.init()
                this.addNotification({id: 8, message: data.message, type: 'success'})
            } else{
                this.addNotification({id: 7,message: data.message,type: 'dismissible'})
            }
            this.showRest = false
        },
        async init(){
            var restaurants = await this.fetchRestaurants()
            this.activeRest = restaurants.filter(r => r.is_approved == true)
            this.pendingRest = restaurants.filter(r => r.is_approved == false)
        },
        getHeader(){
            const token = JSON.parse(localStorage.getItem('token'))
            return {'Content-type': 'application/json', 'Authorization': ' Bearer ' + token}
        },
        addNotification(notif){
            this.notifications.push(notif)
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        }
    },
    async created(){
       this.init()
    }
}
</script>
