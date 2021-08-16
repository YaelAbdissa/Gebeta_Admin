<template>
    <Header title="Restaurant List" />
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="slide" appear>
        <div class="modal" v-if="showModal">
            <h1>Are you sure?</h1>
            <p>Deleting Restaurant</p>
            <div class="buttons">
                <button @click="deleteRestaurant">Yes</button>
                <button @click="showModal = false">No</button>
            </div>
        </div>
    </transition>
    <List @delete-item="del" :listItems="restaurants" />
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header from '../components/Header'
import List from '../components/List'
import NotificationList from '../components/NotificationList' 

export default{
    name: 'Restaurants',
    components: {
        Header,
        NotificationList,
        List
    },
    data() {
        return{
            restaurants: [],
            showModal: false,
            delId: '',
            notifications: []
        }
    },
    methods: {
        async deleteRestaurant(){
            const res =  await fetch(`api/restaurant/${this.delId}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if(res.status === 200){
                this.restaurants = this.restaurants.filter((restaurant) => restaurant._id !== this.delId)
                this.addNotification({id: this.delId, message: data.message,type: 'success'})
            } else{
                this.addNotification({id: 7,message: 'Error deleting restaurant',type: 'success'})
            }
            this.showModal = false
        },
        async fetchRestaurants(){
            const res = await fetch('api/restaurant')
            const data = await res.json()
            return data.docs
        },
        async fetchRestaurant(id){
            const res = await fetch(`api/restaurant/${id}`)
            const data = await res.json()
            return data
        },
        del(id){ 
            this.showModal = true 
            this.delId = id
        },
        addNotification(notif){
            this.notifications.push(notif)
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        }
    },
    async created(){
        this.restaurants = await this.fetchRestaurants()
    }
}
</script>

<style>
.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.3);
}

.modal{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    z-index: 98;
    width: 100%;
    max-width: 400px;
    background-color: rgb(243, 228, 225);
    border-radius: 16px; 
    padding: 25px;
}

.modal h1{
    color: rgba(148, 37, 37, 0.884);
}

button{
    appearance: none;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
    
    display: inline-block;
    padding: 5px 20px;
    background-image: linear-gradient(to right, #a33e3e, #e95f5f);
    border-radius: 10px;
    
    color: #FFF;
    font-size: 18px;
    font-weight: 700;
    
    box-shadow: 3px 3px rgba(54, 52, 52, 0.4);
    transition: 0.4s ease-out;
}

.modal button{
    margin-right: 20px;
}

button:hover {
    box-shadow: 1px 1px rgba(87, 81, 81, 0.6);
}

.fade-leave-active{
    transition: opacity .5s;
}

.fade-leave-to {
    opacity: 0;
}

.slide-leave-active {
    transition: transform .2s;
}
</style>
