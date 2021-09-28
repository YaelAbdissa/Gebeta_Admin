<template>
    <li :class="[rest.is_approved ? 'rest active':'rest' ]" @click="$emit('see-rest')">
        <h3>
            {{ rest.first_name }} {{ rest.last_name }} {{rest.name}} 
        </h3>
        <hr style="width:80%;float:left"><br>
        <p><span style="color:#4b6769">Email: </span> {{rest.email}}</p>
        <hr>
        <p><b><i>Phone: </i></b>{{rest.phone_no}}</p>
    </li>
</template>

<script>
export default{
    name: 'Item',
    props: {
        rest: Object,
        center: String
    },
}
</script>

<style scoped>
    .rest{
        width: fit-content;
        list-style: none;
        margin-right: 1em;
        margin-bottom: 0.6em;
        display: inline-table;
        background: #fffdfd;
        cursor: pointer;
        padding: 1px 20px;
        border-left: 5px solid rgb(224, 172, 74);
        border-radius: 5px;
        box-shadow: 3px 2px rgba(88, 76, 73, 0.4);
    }
    
    .rest.active{
        border-left: 5px solid rgb(23, 85, 15);
    }

    .rest h3{
        margin: 5px;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0%;
    }

    p{
        margin: 5px;
        user-select: text;
        background-color: rgba(245, 245, 245, 0.644);
    }

    img{
        cursor: pointer;
    }
</style>