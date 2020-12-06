<template>
  <div class="wrap">
    <div class="form-wrap">
      <el-form label-width="120px" :model="form">
        <el-form-item label="充值/消费金额">
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
        }
      };
    },
    computed: {
    },
    created() {
    },
    methods: {
      submit() {
        let amount = parseFloat(this.form.amount);
        let operateType = amount > 0 ? 'plus' : 'minus';
        let operateAmount = Math.abs(amount);
        let amountAfterOperate = this.memberInfo.amount + amount;
        let remark = this.form.remark;
        let memberCode = this.memberInfo.memberCode;

        this.$showLoading();
        let params = {
          memberCode,
          operateType,
          remark,
          operateAmount,
          amountAfterOperate
        };
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
