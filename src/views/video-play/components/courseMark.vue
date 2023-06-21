<template>
  <div class="container">
<!--    <div id="star"></div>-->
    <img src="../../../assets/wujiaoxing.png"/>
  </div>
</template>

<script>
export default {
  name: "courseMark"
};
</script>

<style scoped>
.container{
  /*background-color: #67c23a;*/
  padding: 5px;
  width: 40%;
  height: 78px;
}
.container img {
  width: 100%;
  height: 100%;
}
#star {
  position: relative;
  margin: 200px auto;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 70px 100px;
  transform: rotate(35deg);
}

#star::before {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  top: -128px;
  left: -95px;
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 80px 30px;
  transform: rotate(-35deg);
}

#star::after {
  position: absolute;
  content: '';
  width: 0;
  height: 0;
  top: -45px;
  left: -140px;
  border-style: solid;
  border-color: transparent transparent red transparent;
  border-width: 70px 100px;
  transform: rotate(-70deg);
}
</style>
