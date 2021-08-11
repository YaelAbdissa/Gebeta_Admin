<template>
    <div @dblclick="$emit('toggle-avaliablity')" 
        :class="[item.isServed ? 'avaliablity' : '', 'item']">
        <h3>
            {{item.foodName}}  
            <img @click="$emit('delete-item')" src="../assets/trash-alt-regular.png" class="mod"/>
        </h3>
        <hr style="width:80%;float:left"><br>
        <p style="margin-right: 100px;"><span class="desc">Description: </span>{{item.description}}</p>
        <div class="images">
            <div v-for="image in item.imgLocation" :key="image" class="img-wrap">
                <span class="close" @click="deleteImg(item._id, image)">&times;</span>
                <img v-bind:src="'/api/images/'+ item._id + '/' + image" /> 
            </div>
        </div>
        <hr>
        <p @click="$emit('edit-item', id)" class="under"> 
            <span class="price"><span class="desc">Price: </span>{{item.price}} Birr</span>
            <span class="btn">Edit <img src="../assets/edit-regular.png" class="mod"/></span>
        </p>
    </div>
</template>

<script>
export default{
    name: 'Item',
    props: {
        item: Object
    },
    methods:{
        deleteImg(id, img){
            this.$emit('delete-img', id, img)
        }
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

    .images{
        display: flex;
        flex-direction: row;
        align-content: space-between;
        background-color: rgb(243, 243, 234);
    }

    img{
        max-width:200px;
        height:auto;
        margin-left: 10px;
        border-radius: 5px;
        box-shadow: 3px 2px rgba(121, 109, 106, 0.4);
    }

    img:hover{
        box-shadow: 4px 3px rgba(65, 62, 61, 0.4);
    }

    .img-wrap {
        position: relative;
    }

    .img-wrap .close {
        position: absolute;
        top: 5px;
        right: 8px;
        background-color: #FFF;
        padding: 4px 3px;
        cursor: pointer;
        font-size: 22px;
        line-height: 10px;
        border-radius: 50%;
        border:2px solid red;
    }

    .close:hover {
        font-size: 28px;
        line-height: 14px;
    }

    .item.avaliablity{
        border-left: 5px solid green;
    }

    @media (max-width:800px){
        .images{
            flex-direction: column;
        }

        .img-wrap{
            margin-bottom: 10px;
        }

        .img-wrap .close{
            top: 4px;
            left: 16px;
            border: none;
            background-color: transparent;
        }
    }

    .desc{
        font-size: 18px;
        color: darkslategrey;
        font-family: 'Trebuchet MS', sans-serif;;        
    }

    .desc, .price{
        font-weight: bolder;
    }

    p{
        user-select: text;
        background-color: rgba(245, 245, 245, 0.644);
    }

    .mod{
        width: 20px;
        height: auto;
    }

    .under{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .mod, .btn{
        cursor: pointer;
        box-shadow: 1px px rgba(250, 72, 72, 0.4);
    }
    .mod:hover{
        box-shadow: 3px 3px rgba(70, 14, 14, 0.4);
    }
</style>