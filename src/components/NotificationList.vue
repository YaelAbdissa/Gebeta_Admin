<template>
  <div class="notifications-list">
      <Notification 
        @remove-notification="this.$emit('remove-notification',notification.id)"
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"/>
  </div>
</template>

<script>
import Notification from './Notification';

export default {
    name: 'NotificationList',
    props:{
        notifications: Array
    },
    components: {
        Notification
    }
}
</script>

<style>
    .notifications-list{
        position: fixed;
        bottom: 0;
        right: 0;
        margin-right: 15px;
        width: 320px;
    }
</style>