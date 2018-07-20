<template>
    <div id='loading'>
        <img src="./loading.gif" alt="图片载入">
        <p>{{message}}</p></p>
    </div>
</template>
<script>
export default {
    props:{
        message:{
            type:String,
            default:'载入中...'
        }
    }
}
</script>

<style scoped>
#loading{
    display: flex;
    align-items: center;
    justify-content: center;
    width:100vw;
    flex-direction: column;
}
    img{
        height: 2rem;
        width:2rem;
    }
    p{
        margin-bottom: 2rem;
        margin-top: 0.5rem;
    }
</style>
