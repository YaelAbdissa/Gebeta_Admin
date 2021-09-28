<template>
    <tr class="client" @click="$emit('see-client')">
        <td><span style="color:#35373a"><b>{{ client.first_name }} {{ client.last_name }}</b></span></td>
        <td><img :src="'/api/images/' + client._id + '/' + client.profile_picture"/></td>
        <td>{{client.no_of_orders}}</td>
        <td>{{client.email}}</td>
        <td>{{client.phone_no}}</td>
        <td>{{location}}</td>
        <td>{{client.created_at.split('T')[0]}}</td>
    </tr>
</template>

<script>
export default{
    name: 'Item',
    props: {
        client: Object,
        center: String
    },
    data(){
        return{
            location: ''
        }
    },
    methods:{
        async getAddress(lat, lng){
            const res =  await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&sensor=true&key=AIzaSyDsiGbsZBlyERrJPm49XOY8oBO5sTnmLx0', {
                method: 'GET',
            })
            const data = await res.json()
            return data.results[3].formatted_address.split(',')[0]
        },
    },
    async created(){
        try{
            let address = await JSON.parse(this.client.address)
            this.location = await this.getAddress(address.latitude,address.longtiude)
        }catch(e){console.log('loading')}
    }
}
</script>

<style scoped>
    .client{
        cursor: pointer;
        border-radius: 0.5em;
        background-color: #eff;
        box-shadow: 2px 2px rgba(190, 187, 186, 0.4);
    }

    .client:hover{
        box-shadow: 4px 4px rgba(148, 136, 133, 0.4);
    }

    td{
        padding: 0 20px;
        user-select: text;
        background-color: rgba(245, 245, 245, 0.644);
    }

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
</style>