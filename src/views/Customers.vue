<template>
    <Header title="Customers List" />
    <Clist @see-client="seeCustomer" :listItems="clients"/>
    <CustomerPopup  :showCustomer="showCustomer" @close="showCustomer=false" :customer="customer" />
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header from '../components/Header'
import Clist from '../components/Clist'
import CustomerPopup from '../components/CustomerPopup'
import NotificationList from '../components/NotificationList' 

export default{
    name: 'Customers',
    components: {
        Header,
        CustomerPopup,
        NotificationList,
        Clist
    },
    data() {
        return{
            clients: [],
            customer: null,
            showCustomer: false,
            notifications: []
        }
    },
    methods: {
        async fetchClients(){
            const res = await fetch('api/client',{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        seeCustomer(id){
            this.customer = this.clients.find((c) => c._id == id)
            this.showCustomer = true
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
        this.clients = await this.fetchClients()
    },
    
}
</script>
<style scoped src="@/assets/styles/modal.css">
</style>
