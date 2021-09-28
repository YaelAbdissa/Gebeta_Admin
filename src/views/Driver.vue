<template>
    <Header title="Drivers List" />
    <h2 style="color:green">Active Drivers</h2>
    <Dlist :listDrivers="activeDrivers" @see-driver="seeDriver"/>
    <h2 style="color:orange;">Pending Drivers</h2>
    <Dlist :listDrivers="pendingDrivers" @see-driver="seeDriver"/>
    <DriverPopup  :showDriver="showDriver" @close="showDriver=false" :driver="driver" @approve="approve" />
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header from '../components/Header'
import Dlist from '../components/Dlist'
import DriverPopup from '../components/DriverPopup'
import NotificationList from '../components/NotificationList' 

export default{
    name: 'Customers',
    components: {
        Header,
        NotificationList,
        Dlist,
        DriverPopup
    },
    data() {
        return{
            activeDrivers: [],
            pendingDrivers: [],
            showDriver: false,
            driver: null,
            notifications: []
        }
    },
    methods: {
        async fetchDrivers(){
            const res = await fetch('api/driver',{headers: this.getHeader()})
            const data = await res.json()
            return data
        },
        async fetchDriver(id){
            const res = await fetch(`api/driver/${id}`)
            const data = await res.json()
            return data
        },
        seeDriver(id,status){
            if(status){
                this.driver = this.activeDrivers.find((d) => d._id == id)
            }else{
                this.driver = this.pendingDrivers.find((d) => d._id == id)
            }
            this.showDriver = true
        },
        async approve(dri){
            const driverToToggle = await this.fetchDriver(this.driver._id)
            const updItem = {...driverToToggle, is_accepted : dri}
            const res =  await fetch(`api/driver/${this.driver._id}`, {
                headers: this.getHeader(),
                method: 'PUT',
                body: JSON.stringify(updItem)
            })
            const data = await res.json()
            if(res.status === 200){
                this.init()
                this.addNotification({id: 8, message: data.message , type: 'success'})
            } else{
                this.addNotification({id: 7,message: data.message,type: 'dismissible'})
            }
            this.showDriver = false
        },
        async init(){
            var drivers = await this.fetchDrivers()
            this.activeDrivers = drivers.filter(d => d.is_accepted == true)
            this.pendingDrivers = drivers.filter(d => d.is_accepted == false)
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
