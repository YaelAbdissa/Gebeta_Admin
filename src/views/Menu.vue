<template>
    <Header title="Restaurant Menu" />
    <Button 
        @click="$emit('toggle-item')" 
        :text="showAddItem ? 'Close X' : 'Add Item' " 
        :color="showAddItem ? '#914d3c' : '#4b423f' "
        style="padding: 5px 20px; margin-bottom: 15px"/>
  <AddItem @add-item="addItem" v-if="showAddItem" 
    @add-notification="addNotification" :itm="itm" :update="update"/>
  <Items @delete-item="del"
         @delete-img="deleteImg"
         @toggle-avaliablity="toggleR" 
         @edit-item="editItem"
         :items="items" />
    <div v-if="items.length===0" class="container" style="width:800px">
        <h1>There are no items in your menu. Please Add items!</h1>
        <img src="../assets/empty.png" />
    </div>
    <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal"></div>
    </transition>
    <transition name="slide" appear>
        <div class="modal" v-if="showModal">
            <h1>Are you sure?</h1>
            <p>Deleting Item</p>
            <div class="buttons">
                <button @click="deleteItem">Yes</button>
                <button @click="showModal = false">No</button>
            </div>
        </div>
    </transition>
    <NotificationList :notifications="notifications" 
        @remove-notification="removeNotification"/>
</template>

<script>
import Header from '../components/Header'
import Button from '../components/Button'
import Items from '../components/Items'
import AddItem from '../components/AddItem'
import NotificationList from '../components/NotificationList' 

import axios from 'axios'

export default{
    name: 'Menu',
    props: {
        showAddItem: Boolean,
        update: Boolean,
        token: String
    },
    components: {
        Header,
        Button,
        Items,
        AddItem,
        NotificationList,
    },
    data() {
        return{
            items: [],
            notifications: [],
            showModal: false,
            itm: [],
            delId: String
        }
    },
    methods: {
        async deleteItem(){
            const res =  await fetch(`api/items/${this.delId}`, {
                method: 'DELETE',
                headers: this.getHeader(),
            })
            const data = await res.json()
            if(res.status === 200){
                this.items = this.items.filter((item) => item._id !== this.delId)
                this.addNotification({id: this.delId, message: data.message,type: 'success'})
            } else{
                this.addNotification({id: 7,message: 'Error deleting item',type: 'success'})
            }
            this.showModal = false
        },
        async toggleR(id){
            const itemToToggle = await this.fetchItem(id)
            const updItem = {...itemToToggle, isServed: !itemToToggle.isServed}

            const res = await fetch(`api/items/${id}`,{
                method: 'PUT',
                headers: this.getHeader(),
                body: JSON.stringify(updItem)
            })

            const data = await res.json()
            if(data && data.isServed){this.addNotification({id: data._id,message: data.foodName + ' is now avaliable', type: 'success'})}
            this.items = this.items.map((item)  => item._id === id ? {...item, isServed: data.isServed} : item)
        },
        async addItem(formData, newItem){
            if(!this.update){
                const res = await fetch('api/items', {
                    method: 'POST',
                    headers: this.getHeader(),
                    body: JSON.stringify(newItem)
                })

                const data = await res.json()
                if(res.status === 200){
                    this.addImages(formData, data)
                    this.addNotification({id: data._id,message: 'Item '+ data.foodName +' Added!',type: 'success'})
                }else{
                    this.addNotification({id: data._id,message: data.message,type: 'dismissible'})
                }
            }else{this.updateItem(formData, newItem)}
        },
        async updateItem(formData, newItem){
             const res = await fetch(`api/items/${this.itm._id}`,{
                method: 'PUT',
                headers: this.getHeader(),
                body: JSON.stringify(newItem)
            })  
            
            const data = await res.json()
            if(res.status === 200){ 
                if(formData){
                    this.addImages(formData,data)
                }else{this.items = this.items.map((item)  => item._id === data._id ? item = data : item )}
                this.addNotification({id: data._id,message: 'Item '+ data.foodName +' Updated!',type: 'success'})
            }else{
                this.addNotification({id: data._id,message: data.message,type: 'dismissible'})
            }
        },
        editItem(id){
            var editData = this.items.find((item)  => item._id === id)
            this.itm = editData
            this.$emit('update-item')
            window.scrollTo(0,120);
        },
        async addImages(formData,data){
            try {
                var isNewItem = this.update ? false : true
                formData.append("itemId", data._id)
                formData.append("isNewItem",isNewItem)
                const res = await axios.post('api/images/upload',formData, {headers: this.getHeader()}).then((result) => {return result;})
                this.addNotification({id: 101,message: res.data.message,type: 'success'})
                if(this.update){
                    this.items = this.items.map((item)  => item._id === data._id ? item = data : item )
                }else{this.items = [...this.items, data]}
            } catch(err){
                this.addNotification({id: 101,message: err,type: 'dismissible'})
            }
        },
        async deleteImg(id, img){
            const res = await fetch(`api/images/${id}`,{
                method: 'PUT',
                headers: this.getHeader(),
                body: JSON.stringify({img: img})
            })  

            const data = await res.json()
            if(res.status === 200){
                this.items = this.items.map((item)  => item._id === id ? item = data : item )
                this.addNotification({id: data._id,message: 'Image '+ img +' Deleted!',type: 'success'})
            }
        },
        async fetchItems(){
            const res = await fetch('api/items',{headers: this.getHeader()})
            const data = await res.json()
            return data.docs
        },
        async fetchItem(id){
            const res = await fetch(`api/items/${id}`)
            const data = await res.json()
            return data
        },
        del(id){ 
            this.showModal = true 
            this.delId = id
        },
        getHeader(){
            console.log('==========='+this.token)
            return {'Content-type': 'application/json'}, {'Authorization': ' Bearer ' + this.token}
        },
        addNotification(notif){
            this.notifications.push(notif)
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        }
    },
    async created(){
        this.items = await this.fetchItems()
    },
    emits:['toggle-item','update-item','set-token']
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
