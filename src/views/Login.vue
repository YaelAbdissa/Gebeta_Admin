<template>
  <div class="idiv"><img alt="logo" src="../assets/logo.png"></div>
  <div class="container">
      <img src="../assets/login.png" />
      <form @submit.prevent="login">
          <div class="mb-3">
              <input type="email" v-model="email" placeholder="Email">
          </div>
          <div class="mb-3">     
              <input type="password" v-model="password" placeholder="Enter Password">
          </div>    
          <button type="submit" class="btn">Login</button>
          <div class="mb-3"><br/>
              <label>----  Admin  ----</label>
          </div>
      </form>
  </div>
  <NotificationList :notifications="notifications" @remove-notification="removeNotification"/>
</template>

<script>
import '@/assets/styles/style.css';
import NotificationList from '../components/NotificationList'

export default {
  name: 'Login',
  data(){
    return{
      email:'',
      password:'',
      notifications: []
    }
  },
  components:{
    NotificationList
  },
  methods:{
        async login(){
          const obj = { email:this.email, password:this.password};
          const res = await fetch('api/admin/login', {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj)
          })

          const data = await res.json()
          if(res.status === 200){
                localStorage.setItem('token',JSON.stringify(data.token))
                this.$router.push('restaurant')
            }else{
                this.showNotification(data.message,1001)
          }
        },
        removeNotification(id){
          this.notifications = this.notifications.filter((notif) => notif.id !== id)
        },
        showNotification(msg, nid){
          let show = true;
          this.notifications.forEach((notif) => {if(notif.id == nid){show = false}})
          if(show){this.notifications.push({id: nid, message: msg,type: 'dismissible'})}
        }
    }
}
</script>

<style scoped>
.idiv{
    height: 250px;
    width: 300px;
    margin: auto;
}

.idiv img{
    vertical-align: middle;
    height: 100%;
    width: 100%;
}

</style>
