<template>
  <div id="app">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="form">
      <el-form-item label="input1" prop="input1">
        <el-input v-model="ruleForm.input1"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" class="item-required">
        <div class="row row1">
          <span>手机号码</span>
          <el-form-item prop="input2">
            <el-input v-model="ruleForm.input2" @input="clearRule('input3')"></el-input>
          </el-form-item>
        </div>
        <div class="row">
          <span>固定电话</span>
          <el-form-item prop="input3">
            <el-input v-model="ruleForm.input3" @input="clearRule('input2')"></el-input>
          </el-form-item>
        </div>
      </el-form-item>
      <el-form-item label="input1" prop="input4">
        <el-input v-model="ruleForm.input4"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
 
  export default {
    data() {
      var validateNum = (rule, value, callback) => {
        if (!this.ruleForm.input2 && !this.ruleForm.input3) {
          callback(new Error('手机号码、固定电话至少填写一项'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          input1: '',
          input2: '',
          input3: '',
          input4: ''
        },
        rules: {
          input1: [{ required: true, trigger: 'blur' }],
          input2: [{ required: true, validator: validateNum, trigger: 'blur' }],
          input3: [{ required: true, validator: validateNum, trigger: 'blur' }],
          input4: [{ required: true, trigger: 'blur' }]
        }
      };
    },
    methods: {
      clearRule(obj) {
        this.$refs.ruleForm.clearValidate(obj);
      }
    }

  };
</script>
<style lang='scss' scoped>
.item-required ::v-deep {
  > .el-form-item__label:before{
    content: "*";
    color: #F56C6C;
    margin-right: 4px;
  }
  .row{
    display: flex;
    span{
      width: 100px;
    }
    >div{flex: 1;}
    
  }
  .row1{
    margin-bottom: 22px;
  }
}
</style>
