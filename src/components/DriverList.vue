<template>
    <li :class="['driver '+ driver.is_accepted ]" @click="$emit('see-driver')">
        <h3>
            {{ driver.first_name }} {{ driver.last_name }} {{driver.name}} 
        </h3>
        <hr style="width:80%;float:left"><br>
        <p><span style="color:#4b6769"><b>Car: </b></span>{{driver.car}}</p>
        <p><span style="color:#76a3a7"><b>Car Plate No: </b></span>{{driver.car_plate}}</p>
        <hr>
        <p><b><i>Phone: </i></b>{{driver.phone_no}}</p>
    </li>
</template>

<script>
export default{
    name: 'Item',
    props: {
        driver: Object,
        center: String
    } 
}
</script>

<style scoped>
    .driver{
        width: fit-content;
        list-style: none;
        margin-right: 1em;
        margin-bottom: 0.6em;
        display: inline-table;
        background: #fffdfd;
        cursor: pointer;
        padding: 15px 20px;
        border-radius: 0.5em;
        box-shadow: 2px 2px rgba(190, 187, 186, 0.4);
    }

    .driver:hover{
        box-shadow: 4px 4px rgba(148, 136, 133, 0.4);
    }

    .driver h3{
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin:0;
    }

    .driver.false{
        border-left: 3px solid #e0ac4a;
    }

    .driver.true{
        border-left: 3px solid green;
    }

    p{
        user-select: text;
        margin:2px 5px;
        background-color: rgba(245, 245, 245, 0.644);
    }
</style>s