<template>
    <div class="item">
        <h3>
            {{ item.first_name }} {{ item.last_name }} {{item.name}} 
            <img @click="$emit('delete-item')" src="../assets/trash-alt-regular.png" class="mod"/>
        </h3>
        <hr style="width:80%;float:left"><br>
        <p><b>Email: </b> {{item.email}}</p>
        <p v-show="item.is_approved">Approved: {{item.is_approved}}</p>
        <p v-show="item.address"><span style="color:#4c3169"><b>Location: </b></span>{{item.address}}</p>
        <p v-show="item.car"><span style="color:#4b6769"><b>Car: </b></span>{{item.car}}</p>
        <p v-show="item.car_plate"><span style="color:#76a3a7"><b>Car Plate No: </b></span>{{item.car_plate}}</p>
        <hr>
        <p><b><i>Phone: </i></b>{{item.phone_no}}</p>
    </div>
</template>

<script>
export default{
    name: 'Item',
    props: {
        item: Object
    }  
}
</script>

<style scoped>
    .item{
        background: #fffdfd;
        margin-bottom: 20px;
        padding: 1px 20px;
        border-left: 5px solid rgb(224, 172, 74);
        border-radius: 5px;
        box-shadow: 3px 2px rgba(88, 76, 73, 0.4);
    }

    .item h3{
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0%;
    }

    p{
        user-select: text;
        background-color: rgba(245, 245, 245, 0.644);
    }

    img{
        cursor: pointer;
    }
</style>