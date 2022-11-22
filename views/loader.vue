<template>
  <section>
    <div class="test">
    <img :class="this.templateIdViewId ? 'pencilSize' : 'pencil'" src="@/assets/img/logo-whiteloader.svg" id="image"/>
    <div :class="this.templateIdViewId ? 'lineSize' : 'line'"></div>
    <!-- <h5 class="cont">Please wait, we are getting things ready for you.</h5> -->
    </div>
  </section>
</template>
<script>
export default {
    data(){
        return{
            modalLoading:false
        }
    },
  components: {},
  props:["templateIdViewId"],
  mounted(){
    console.log("calling",this.templateIdViewId)
  },
  methods:{
test(){
    setTimeout(()=>{
    var imageUrl = '@/assets/img/logo-whiteloader.svg';
    document.getElementById('image').src = imageUrl;
    document.getElementById('msgStyle1').innerHTML = 'Image ready';
}, 3000);
    //document.getElementById('image').src =
}
  },
};
</script>
<style lang="scss" scoped>
.test{
    display:block;
  //  background-color:rgba(202, 197, 197, 0.173);

}
$pencil-green: #f754a2;
.test {
  height: 600px;
}
.pencilSize {
    width: 100px;
    height: 60px;
    margin-top: 9%;
    margin-left: 36%;
  transform: translateY(-50%);
  transform: rotate(45deg);
  animation: pencil-animation 4s infinite;
  @keyframes pencil-animation {
    0% {
      transform: rotate(135deg);
    }

    20% {
      transform: rotate(315deg);
    }

    45% {
      transform: translateX(164px) rotate(315deg);
    }

    55% {
      transform: translateX(165px) rotate(495deg);
    }

    100% {
      transform: rotate(495deg);
    }
  }
}
.pencil {
    width: 100px;
    height: 60px;
    margin-top: 12%;
    margin-left: 39%;
  transform: translateY(-50%);
  transform: rotate(45deg);
  animation: pencil-animation 5s infinite;
  @keyframes pencil-animation {
    0% {
      transform: rotate(135deg);
    }

    20% {
      transform: rotate(315deg);
    }

    45% {
      transform: translateX(164px) rotate(315deg);
    }

    55% {
      transform: translateX(165px) rotate(495deg);
    }

    100% {
      transform: rotate(495deg);
    }
  }
}
.lineSize{
  background-color: #f754a2;
  margin-top: -18px;
  height: 3px;
  width: 760px;
  margin-left: 41%;
  margin-bottom: 2px;
  border-radius: 50px;
  transform: scaleX(0);
  transform-origin: left;
  animation: line-animation 4s infinite;
  @keyframes line-animation {
    0% {
      transform: scaleX(0);
    }
    20% {
      transform: scaleX(0);
    }

    45% {
      transform: scaleX(0.24);
    }

    55% {
      transform: scaleX(0.24);
    }

    100% {
      transform: scaleX(0);
    }
  }
}

.line {
  background-color: #f754a2;
  margin-top: -18px;
  height: 3px;
  width: 650px;
  margin-left: 44%;
  margin-bottom: 2px;
  border-radius: 50px;
  transform: scaleX(0);
  transform-origin: left;
  animation: line-animation 5s infinite;
  @keyframes line-animation {
    0% {
      transform: scaleX(0);
    }
    20% {
      transform: scaleX(0);
    }

    45% {
      transform: scaleX(0.24);
    }

    55% {
      transform: scaleX(0.24);
    }

    100% {
      transform: scaleX(0);
    }
  }
}
.cont{
    margin-left: 36%;
    margin-top: 20px;
}
</style>
