<template>
      <transition-group name="fade" tag="div">
        <div class="modal-overlay" v-if="showDriver" key="101"></div>
        <div v-if="showDriver" class="modal" key="103">
            <span @click="$emit('close')" class="close">&times;</span>
            <h3>Driver Details</h3><hr>
            <p><b>Name: </b>{{ driver.first_name }} {{ driver.last_name }} {{driver.name}} </p>
            <p><b>Email: </b> {{driver.email}}</p>
            <p><i>Status: </i>{{ driver.isActive?'offline':'online'}}</p>
            <img :src="'/api/images/'+ driver._id + '/' + driver.driving_license" style="width:250px;height:150px"/>
            <p><i>Plate No: </i>{{driver.car_plate}}</p>
            <p><i>Car: </i>{{driver.car}}</p>
            <p><b>Address: </b> {{driver.address}}</p>
            <p><i>Joined : </i>{{ driver.created_at.split('T')[0] }}</p>
            <div>
                <hr>
                <button @click="$emit('approve',true)" v-if="!driver.is_accepted">Accept</button>
                <button @click="$emit('approve',false)">Decline</button>
            </div>
        </div>
      </transition-group>
</template>

<script>
export default {
    props:{
        showDriver: Boolean,
        driver: Object,
    }
}
</script>

<style scoped src="@/assets/styles/popup.css">
</style>