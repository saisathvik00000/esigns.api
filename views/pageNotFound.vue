<template>
  <div>
        <div class="division" style="margin-top:10%">
            <img src="@/assets/notFound.svg">
        </div>
        <div class="division" style="margin-top:20px">
            <h1 class="heading">Page not found</h1>
        </div>
        <div class="division" style="margin-top:20px">
            <p class="para">Sorry, it's 404 page error.We can't find the page that you're looking for:(</p>
        </div>
        <div class="division">
            <p class="para">Please check the URL and try again.</p>
        </div>
        <div class="division" style="margin-top:20px">
            <el-button type="danger" @click="backToHome">Back to Home</el-button>
        </div>
  </div>
</template>

<script>
export default {
  name: 'views-pageNotFound',
  methods:{
      backToHome(){
        this.$router.push({
        path: "/",
      });
      }
  }
}
</script>
<style>
.division{
text-align:center;
}
.para{
font-size: 19px;
font-weight:300;
color:rgb(0,0,0);
}
.heading{
font-size: 33px;
font-weight: 500;
color:black;
}
</style>