<template>
      <transition-group name="fade" tag="div">
        <div class="modal-overlay" v-if="showCustomer" key="101"></div>
        <div v-if="showCustomer" class="modal" key="103">
            <span @click="$emit('close')" class="close">&times;</span>
            <p>Customer Details</p><hr>
            <p>{{ customer.first_name }} {{ customer.last_name }} </p>
            <p><i>ID: </i>{{ customer._id}}</p>
            <p><i>Email: </i> {{customer.email}}</p>
            <p><i>No of Orders: </i>{{customer.no_of_orders}}</p>
            <p><i>Phone: </i>{{ customer.phone_no}}</p>
            <p><span style="color:#4c3169"><b>Location: </b></span>{{customer.address}}</p>
            <p><b>catagorey: </b> {{customer.category}}</p>
            <p><i>Register time: </i>{{ customer.created_at }}</p>
        </div>
      </transition-group>
</template>

<script>
export default {
    props:{
        showCustomer: Boolean,
        customer: Object,
    }
}
</script>

<style scoped src="@/assets/styles/popup.css">
</style>