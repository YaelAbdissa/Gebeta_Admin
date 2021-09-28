<template>
      <transition-group name="fade" tag="div">
        <div class="modal-overlay" v-if="showRest" key="101"></div>
        <div class="modal" v-if="showRest" key="103">
            <span @click="$emit('close')" class="close">&times;</span>
            <div class="trade_l">
                <h1>{{rest.name}}</h1> 
                <hr>
                <span><b style="color:#4c3169">Phone:  </b>{{rest.phone_no}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <b style="color:#4c3169">Email: </b>{{rest.email}}</span>
                <hr>
                <p><b><i>Trade License</i></b></p>
                <embed v-bind:src="'/api/images/'+ rest._id + '/' + rest.business_license" width="800px" height="400px" />
            </div>
            <p><b><i>ID Card</i></b></p>
            <embed v-bind:src="'/api/images/'+ rest._id + '/'+rest.idCard"  width="400px" height="300px" /><hr>
            <div>
                <p><span style="color:#4c3169"><b><i>Restaurant Location</i></b></span></p>
                <span>{{"'" + JSON.parse(rest.address).lat + "&nbsp;&nbsp;&nbsp;"}} 
                    {{"'" + JSON.parse(rest.address).lat}}</span>
                <GoogleMap
                    v-if="rest.address.charAt(0)=='{'"
                    api-key=""
                    style="width: 100%; height: 300px; margin-bottom: 5px;"
                    :center="JSON.parse(rest.address)"
                    :zoom="20">
                    <Marker :options="{ position: center }" />
                </GoogleMap> 
            </div>
            <div>
                <hr>
                <p v-if="!rest.is_approved">Is the Restaurant qualified?</p><br>
                <button @click="$emit('approve',true)" v-if="!rest.is_approved">Yes</button>
                <button @click="$emit('approve',false)">{{rest.is_approved? 'Deny permission' : 'No'}}</button>
            </div>
        </div>
      </transition-group>
</template>

<script>
import { GoogleMap, Marker } from 'vue3-google-map'
export default {
    props:{
        showRest: Boolean,
        rest: Object,
        center: String
    },
    components:{
        GoogleMap, 
        Marker
    } 
}
</script>

<style scoped>
.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 98;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal{
    position: absolute;
    top: 115%;
    padding-bottom: 20px;
    transform: translate(15%,-50%);
    z-index: 98;
    max-width: 80%;
    background-color: rgb(243, 228, 225);
    border-radius: 16px; 
    padding: 10px 20px;
}

.modal h1{
    color: rgba(148, 37, 37, 0.884);
}

button{
    color: white;
    margin:0 1.5em;
    padding: 10px 20px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: linear-gradient(to right, #914d3c, #dd6f5d);
    font-weight: 700;
    box-shadow: 3px 3px rgb(54 52 52 / 40%);
    transition: 0.4s ease-out;
}

button:hover{
    box-shadow: 1px 1px rgba(87, 81, 81, 0.6);
}

.close{
    font-size: 2em;
    color: red;
    float: right;
    cursor: pointer;
}

.close:hover{
    font-weight: bold;
}

.modal p{
    margin-bottom:0;
}

i{
    font-weight: bold;
    margin-right: 0.3em;
    color: corals;
}

.fade-enter-from{
    opacity: 0;
}
.fade-enter-to{
    opacity: 1;
}
.fade-enter-active{
    transition: opacity 0.3s ease;
}

.fade-leave-from{
    opacity: 1;
}
.fade-leave-to{
    opacity: 0;
}
.fade-leave-active{
    transition: opacity 0.3s ease;
}
</style>