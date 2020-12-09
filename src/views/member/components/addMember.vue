<template>
  <div class="wrap">
    <div class="form-wrap">
      <el-form label-width="100px" :model="form" :rules="rules">
        <el-form-item label="会员名称" prop="name">
          <el-input v-model="form.name" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="form.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="充值金额" v-if="isNewMember">
          <el-input v-model="form.amount" placeholder="充值金额"></el-input>
        </el-form-item>
        <el-form-item label="备注" v-if="isNewMember">
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
  import { addMember, updateMember } from '@/api/member.js';
  import { isDecimalForN } from '@/utils/validate.js';
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
          name: '',
          phone: '',
          sex: '',
          amount: '',
          remark: ''
        },
        sexOptions: ['男', '女'],
        rules: {
          name: [
            { required: true, message: '请输入会员名称', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入手机号码', trigger: 'blur' }
          ]
        }
      };
    },
    computed: {
      isNewMember() {
        return !this.memberInfo.memberCode;
      }
    },
    created() {
      if (this.memberInfo.memberCode) {
        this.form = {
          name: this.memberInfo.name,
          phone: this.memberInfo.phone,
          sex: this.memberInfo.sex,
          memberCode: this.memberInfo.memberCode,
          orginPhone: this.memberInfo.phone
        };
      }
    },
    methods: {
      submit() {
        // this.form.name = this.form.name + '1';
        // this.form.phone = this.form.phone + '2';
        let ajaxFn = this.isNewMember ? addMember : updateMember;
        let params = this.form;
        if (!params.name) {
          this.$message.warning('请输入会员名称');
          return;
        }
        if (!params.phone) {
          this.$message.warning('请输入手机号码');
          return;
        }
        if (params.amount && !isDecimalForN(params.amount)) { // !最多2位小数的正数
          this.$message.warning('请输入最多2位小数的正数');
          return;
        }
        this.$showLoading();
        ajaxFn(params).then((res) => {
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
