<template>
    <div class="container">
        <h1>Register</h1>
        <form @submit.prevent="Register">
            <div class="mb-3">
                <input type="text" v-model="userName" id="username" placeholder="Username" >
            </div>
            <div class="mb-3">
                <input type="email" v-model="email" id="email" placeholder="Email">
            </div>
            <div class="mb-3">     
                <input type="password" v-model="password" placeholder="Password">
            </div>
            <div class="mb-3">         
                <input type="password" v-model="confirm_password" placeholder="confirm Password">
            </div>      
            <button type="submit" class="btn btn-primary">Register</button>
            <div class="mb-3"><br/>
                <label>Have account <router-link to='/'>Login here</router-link></label>
            </div>
        </form>
    </div>
    <NotificationList :notifications="notifications" @remove-notification="removeNotification"/>
</template>

<script>
import '@/assets/styles/style.css';
import NotificationList from '../components/NotificationList'

export default{
    name:'Register',
    data(){
        return{
          userName:'',
          email:'',
          confirm_password:'',
          password:'',
          notifications: []
        }
    },
    components:{
      NotificationList
    },
    methods:{
        async Register(){
          if(this.confirm_password === this.password){
              const obj = {
                userName:this.userName,
                email:this.email,
                password:this.password
              };

              const res = await fetch('api/auth/signup', {
                    method: 'POST',
                    headers: {'Content-type': 'application/json'},
                    body: JSON.stringify(obj)
              })

              const data = await res.json()
              if(res.status === 200){
                    this.notifications.push({id: 1001, message: "Successfully Registered!",type: 'success'})
              }else{
                    this.notifications.push({id: 1001, message: data.message,type: 'dismissible'})
                }
          }else{
            this.notifications.push({id: 1001, message: 'password doesn\'t match',type: 'dismissible'})
          }
        },
        removeNotification(id){
            this.notifications = this.notifications.filter((notif) => notif.id !== id)
        }
    }
}
</script>
<style scoped>
.container{
    height:450px;
}
</style>
