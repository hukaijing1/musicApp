<template>
    <div class="result">
        
        <img src="../../common/images/logo2.png">
        <div>抱歉暂无搜索结果</div>
    </div>
</template>
<style scoped>
    .result{
       display: flex;
       align-items: center;
       justify-content: center;
       flex-direction: column; 
       height: 60vh;
    }
    .result div{
        color: #888;
    }
    .result img{
        margin-bottom: 1rem;
        width: 8rem;
        filter: blur(0.3px) brightness(40%);
    }

</style>

