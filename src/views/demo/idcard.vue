<template>
  <div id="app">
    <div>
      <el-cascader
        size="large"
        :options="options"
        v-model="selectedOptions"
        @change="handleChange"
      >
      </el-cascader>
    </div>
    <div class="flex">
      <el-input v-model="year" placeholder="年"></el-input>
      <el-input v-model="month" placeholder="月"></el-input>
      <el-input v-model="day" placeholder="日"></el-input>
    </div>
    <div>
      <el-radio-group v-model="sex">
        <el-radio :label="1">男</el-radio>
        <el-radio :label="2">女</el-radio>
      </el-radio-group>
    </div>
    <div>
      <el-button type="primary" @click="handleClick">生成idcard</el-button>
    </div>
    <div>身份证号码：</div>
    <div v-html="idcardHtml"></div>
  </div>
</template>

<script>
  import { regionData, CodeToText } from 'element-china-area-data';
  // 获取num个身份证
  function Get_CarNo(d6, b8, sex, num) {
    console.log(d6, b8, sex, num); // 440111 19901112 1 5  440111就是白云区
    var i = 0;
    var q17;
    var reCarNo = '';
    while (i < num) {
      var sjs = getRandom(100, 999); // !获取 100到999之间的随机数
      if (sex == 1) {
        if ((sjs % 2) !== 0) {
          console.log(sjs);
          q17 = d6 + b8 + sjs;
          i++;
          reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        }
      } else {
        if ((sjs % 2) == 0) {
          q17 = d6 + b8 + sjs;
          i++;
          reCarNo = reCarNo + "<div class='Noid'>" + to18(q17) + '<br/></div>';
        }
      }
    }
    return reCarNo;
  }
  function getRandom(m, n) {
    return Math.round((Math.random() * (n - m) + m));
  }
  function strsub(str, i) {
    return str.substr(i - 1, 1);
  }
  function to18(str17) {
    var num = 0;
    var wei;
    var xis;
    var jmod = 0;
    var restr;
    for (var i = 1; i <= 17; i++) {
      wei = Number(strsub(str17, i));
      xis = Math.pow(2, 18 - i) % 11;
      num = num + (wei * xis);
    }
    jmod = num % 11;
    switch (jmod) {
      case 0:
        restr = '1';
        break;
      case 1:
        restr = '0';
        break;
      case 2:
        restr = 'X';
        break;
      case 3:
        restr = '9';
        break;
      case 4:
        restr = '8';
        break;
      case 5:
        restr = '7';
        break;
      case 6:
        restr = '6';
        break;
      case 7:
        restr = '5';
        break;
      case 8:
        restr = '4';
        break;
      case 9:
        restr = '3';
        break;
      case 10:
        restr = '2';
        break;
    }
    return str17 + restr;
  }
  export default {
    data() {
      return {
        options: regionData,
        selectedOptions: [],
        idcardHtml: '',
        areaCode: '',
        year: '1990',
        month: '11',
        day: '11',
        sex: 1
      };
    },

    methods: {
      handleChange() {
        var loc = '';
        for (let i = 0; i < this.selectedOptions.length; i++) {
          console.log(this.selectedOptions[i]);
          loc += CodeToText[this.selectedOptions[i]];
        }
        this.areaCode = this.selectedOptions[2];
        console.log(loc);
      },
      handleClick() {
        let date = this.year + this.month + this.day;
        this.idcardHtml = Get_CarNo(this.areaCode, date, this.sex, 5); // 区号、年月日、性别1男/2女、生成数量
      }
    }
  };
</script>
<style lang='scss' scoped>
.flex{
  display: flex;width: 300px;
}
</style>
