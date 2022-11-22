<template>
  <div class="full">
    <div class="errsty">
      <i class="el-icon-error" style="width:100%"></i>
      </div>
      <div>
         <img class="logosty" src="@/assets/img/eSignsLogoBlack.svg"
      />
      </div>
    
    <div class="pop">

      <img
        class="img_sty"
        alt="Document Sent"
        src="@/assets/img/CompletedAnimation.gif"
      />
      <p class="p_sty">Congrats! Document is complete</p>

      <p class="f_text">Once document is completed by all users,you will recieve a copy of document
      </p>
      <p class="booo"></p>
      <p class="f_text1">eSigns is an all-in-one document automation solution with advanced capabilities,simple and easy to use for teams of all sizes.
      </p>
      <p>Don't you have an account?
        <a
          style="color:#f562b3;text-decoration: none"
          href="url"
        > create one</a>
      </p>
    </div>
  </div>

</template>
<script>
export default {
  name: "Global-complete_doc"
};
</script>
<style>
.text-dark {
  font-size: 20px;
}

.f_text {
  width: 310px;
  margin-left:150px;
  margin-top:-10px;
  
  
}


.f_text1 {
  width: 480px;
  margin-left: 100px;

  
}
.p_sty {
  font-size: 25px;
  color: #303133;
  
}
.img_sty {
  width: 200px;
  height: 200px;

}
.pop{
    align-items: center;
    align-self: center;
  width:50%;
  margin-left:330px;
  border: 1px solid #E1E1E1;
  border-radius:3px;
  margin-top:3%;
  
}
.booo{
  border-bottom:1px dashed #DCDFE6;;
}
.logosty{
  margin-left:-1100px;
  margin-top: -20%;
}
.errsty{
  margin-left:95%;
  margin-top:-20px;
  
}
.el-icon-error{
  font-size: 2rem;
}


</style>