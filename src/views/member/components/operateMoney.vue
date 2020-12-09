<template>
  <div class="wrap">
    <div class="form-wrap">
      <el-form ref="ruleForm" label-width="120px" :model="form" :rules="rules">
        <el-form-item label="充值/消费金额" prop="amount">
          <el-input v-model="form.amount" placeholder="充值/消费金额"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="kh-dialog-btn" style="justify-content:flex-end">
      <div class="item_info">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { operateMoney } from '@/api/member.js';
  import { isNumber } from '@/utils/validate.js';
  export default {
    props: {
      memberInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        form: {
          amount: '',
          remark: ''
        },
        rules: {
          amount: [
            { required: true, message: '值不能为空', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                // !需要限制2位小数
                if (isNumber(value)) {
                  // callback();
                  if (value.includes('.')) {
                    let reg = /.+\./;
                    let matchVal = value.replace(reg, '');
                    if (matchVal.length > 2) {
                      callback(new Error('最多只能输入2位小数'));
                    } else {
                      callback();
                    }
                  } else {
                    callback();
                  }
                } else {
                  callback(new Error('请输入正确的数字'));
                }
              },
              trigger: 'blur' }
          ] 
        }
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      submit() {
        this.$refs.ruleForm.validateField('amount', (err) => {
          console.log(err); // 有错误 就有值,没错误的话为空
          if (!err) {
            let amount = parseFloat(this.form.amount);
            let operateType = amount > 0 ? 'plus' : 'minus';
            let operateAmount = Math.abs(amount);
            let amountAfterOperate = this.memberInfo.amount + amount;
            amountAfterOperate = amountAfterOperate + '';
            if (amountAfterOperate.includes('.')) {
              let reg = /.+\./;
              let matchVal = amountAfterOperate.replace(reg, '');
              if (matchVal.length > 2) {
                matchVal = matchVal.substr(0, 2);
              }
              amountAfterOperate = parseInt(amountAfterOperate) + '.' + matchVal;
            }
            let remark = this.form.remark;
            let memberCode = this.memberInfo.memberCode;

            let params = {
              memberCode,
              operateType,
              remark,
              operateAmount,
              amountAfterOperate
            };
            console.log(params);
            this.$showLoading();
            operateMoney(params).then((res) => {
              console.log(res);
              if (res.success) {
                this.$message.success(res.message);
                this.$emit('confirmCallback');
              } else {
                this.$message.error(res.message);
              }
            }).catch((err) => {
              console.log(err);
            }).finally(() => {
              this.$hideLoading();
            });
          }
        });
      },
      cancel() {
        this.$emit('cancelCallback');
      }
    }
  };
</script>

<style lang='scss' scoped>
  .wrap{
    padding: 20px 15px 0;
  }
  .form-wrap{
    padding-right: 45px;
  }
</style>
