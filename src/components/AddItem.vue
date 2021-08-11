<template>
    <img class="watermark" src="../assets/logo.png"/>
    <form @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label for="foodName">Food Item</label>
            <input type="text" v-model="foodName" name="foodName" :placeholder="update ? itm.foodName : 'Add food name'">
        </div>
        <div class="form-control">
            <label for="description">Item Description</label>
            <textarea type="text" v-model="description" name="description" :placeholder="update ? itm.description : 'write some description about the food'"/>
        </div>
        <div class="form-control">
            <label for="price">Price </label><span v-if="update">{{itm.price}}</span>
            <input type="text" v-model="price" name="price">
        </div>
        <div class="form-control form-control-check">
            <label for="isServed">Is avaliable?</label>
            <span v-if="update && itm.isServed">&#10003;</span>
            <input type="checkbox" v-model="isServed" name="isServed"/>
        </div>
        <div class="form-control">
            <label for="itemImg">Add Items picture</label>
            <span v-if="update">{{itm.imgLocation}}</span>
            <input type="file" ref="itemImg" @change="selectFile" multiple accept=".jpg, .jpeg, .png, .gif, .bmp"/>
        </div>
        <input class="btn" type="submit" :value="update ? 'Update Item' : 'Save Item' ">
    </form>
</template>

<script>

export default{
    name:'AddItem',
    props: {
        itm: Object,
        update: Boolean
    }, 
    data(){
        return{
            foodName: '',
            description: '',
            price: 0,
            isServed: false,
            itemImg: null
        }
    },
    methods: {
        onSubmit(e){
            e.preventDefault()

            if(!this.foodName){
                this.showNotification("Food name Empty!")
                return
            }

            if(!this.itemImg && !this.update){
                this.showNotification('Please at least add one image')
                return
            }

            if(!this.itemImg && this.update){
                this.$emit('add-item', null , this.newItem(this.itm.imgLocation))
                this.clearFields()
                return
            }
            const imgData = this.checkImages()
            if(imgData){
                this.$emit('add-item', imgData[0] , this.newItem(imgData[1]))
                this.clearFields()
            }
        },
        selectFile(){
            this.itemImg = this.$refs.itemImg.files
        },
        showNotification(msg){
            this.$emit('add-notification',{id: 0,message: msg,type: 'dismissible'})
        },
        newItem(img){
            return {
                foodName: this.foodName,
                description: this.description,
                price: this.price,
                isServed: this.isServed,
                imgLocation: img
            }
        },
        checkImages(){
            var formData = new FormData()
            
            var len = this.itemImg.length;
            if(len>5 || (this.update && this.itm.imgLocation.length + len) > 5){
                this.showNotification('Too much files selected! (max is 5)')
                return
            }

            var images = []
            let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png','image/gif','image/bmp'];
            for(var i = 0; i < len; i++)
            {
                var file = this.itemImg[i];
                if(allowedExtension.indexOf(file.type)==-1){
                    this.showNotification('unsupported '+file.type+' file selected!')
                    return
                }
                images[i] = Math.floor(Math.random() * 1000000) + '.' + file.name.split('.').pop()
                formData.append("itemImg", file)
            } 
            formData.append("imgs", JSON.stringify(images))
            if(this.update){images = [...this.itm.imgLocation, ...images]}
            return [formData , images]
        },
        clearFields(){
            this.foodName = ''
            this.description = ''
            this.price = 0
            this.isServed= false
            this.$refs.itemImg.value = null
            this.itemImg = null
        }
    },
    emits: ["add-item","add-notification"]
}
</script>

<style scoped>
.add-form{
    margin-top: 20px;
    margin-bottom: 20px;
}

.form-control{
    margin: 20px 0;
}

.form-control label{
    display: block;
    font-weight: bold;
}

.form-control input, textarea{
    width: 55%;
    height: 40px;
    margin: 5px;
    padding: 3px 7px;
    font-size: 17px;
}

textarea{
    height: 100px;
}

.form-control-check{
    display: inline;
    justify-content: space-between;
}

.form-control-check label{
    flex: 1;
}

.form-control-check input{
    flex: 2;
    width: 20%;
    height: 20px;
}

.btn{
    display: inline-block;
    width: 60%;
    background: rgba(107, 155, 107, 0.911);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    margin: 5px;
    font-size: 15px;
}

.form-control span{
    font-size: 16px;
    color: rgb(114, 77, 77);
    display: inline;
}

.watermark { 
  user-select: none;
  position: absolute;
  opacity: 0.15;
  z-index: 1;
  right: 0;
  max-height: 95%;
  max-width: 95%;
}

@media (max-width:900px) {
    .watermark { 
        max-width:50%;
    }
}
</style>