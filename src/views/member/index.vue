<template>
  <div v-loading="vloading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.5)">
    <div class="search-bar">
      <el-form label="100px" :inline="true" :model="form">
        <el-form-item label="会员名称">
          <el-input v-model="form.name" @keyup.enter.native="resetCurrentPage" placeholder="会员名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="form.phone" @keyup.enter.native="resetCurrentPage" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="resetCurrentPage">搜索</el-button>
          <el-button @click="handleDownload">导出</el-button>
        </el-form-item>
      </el-form>
      <el-button class="add" type="primary" icon="el-icon-plus" @click="addMember">新增会员</el-button>
    </div>

    <el-table border :data="tableData" stripe>
      <el-table-column type="index" label="序号" width="50" align="left"></el-table-column>
      <el-table-column prop="name" label="会员名称" align="left"></el-table-column>
      <el-table-column prop="phone" label="手机号" align="left"></el-table-column>
      <el-table-column prop="sex" label="性别" align="left"></el-table-column>
      <el-table-column prop="amount" label="余额(元)" align="left"></el-table-column>
      <el-table-column prop="lastConsumeTime" label="最近一次消费时间" align="left"></el-table-column>
      <el-table-column prop="lastConsumeContent" label="最近一次消费内容" align="left"></el-table-column>
      <el-table-column label="操作" fixed="right" align="left" width="250">
        <template slot-scope="scope">
          <el-button type="text" @click="editMember(scope.row)">编辑</el-button>
          <el-button type="text" @click="operateMoney(scope.row)">充值/消费</el-button>
          <el-button type="text" @click="consumeRecord(scope.row)">缴费记录</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background
      :current-page="currentPage"
      :page-size="pageSize" 
      :page-sizes="[10, 20, 100, 5000, 10000]"
      :total="pageTotal" 
      layout="sizes, prev, pager, next"
      @size-change="handleSizeChange"
      @current-change="changePage">
    </el-pagination>

    <kh-dialog :title=" isNewMember ? '新增会员' : '编辑会员'" :visible.sync="visibleDialog" width="500px">
      <add-member :memberInfo="memberInfo" @confirmCallback="confirmCallback" @cancelCallback="visibleDialog = false"></add-member>
    </kh-dialog>
    <kh-dialog title="充值/消费金额" :visible.sync="visibleDialogMoney" width="500px">
      <operate-money :memberInfo="memberInfo" @confirmCallback="confirmCallbackMoney" @cancelCallback="visibleDialogMoney = false"></operate-money>
    </kh-dialog>
    <slide-dialog-full title="缴费记录" width="400px" :visible.sync="visibleSlideDialog">
      <consume-record :memberInfo="memberInfo"></consume-record>
    </slide-dialog-full>
  </div>
</template>

<script>
  import addMember from './components/addMember.vue';
  import operateMoney from './components/operateMoney.vue';
  import consumeRecord from './components/consumeRecord.vue';
  import { getMemberList } from '@/api/member.js';
  export default {
    components: {
      addMember,
      operateMoney,
      consumeRecord
    },
    data() {
      return {
        tableData: [],
        form: {
          name: '',
          phone: ''
        },
        vloading: false,
        pageSize: 10,
        currentPage: 1,
        pageTotal: 0,
        visibleDialog: false,
        isNewMember: true,
        memberInfo: {},
        visibleDialogMoney: false,
        visibleSlideDialog: false
      };
    },
    created() {
      this._getMemberList();
    },
    methods: {
      handleDownload() {
        this.$showLoading();
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['名称', '手机号', '性别', '余额', '最近一次消费时间', '最近一次消费内容'];
          const filterVal = ['name', 'phone', 'sex', 'amount', 'lastConsumeTime', 'lastConsumeContent'];
          const data = this.formatJson(filterVal);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '导出数据'
          });
          this.$hideLoading();
        });
      },
      formatJson(filterVal) {
        return this.tableData.map(v => {
          const arr = filterVal.map(j => {
            return v[j];
          });
          return arr;
        });
      },
      addMember() {
        this.isNewMember = true;
        this.memberInfo = {};
        this.visibleDialog = true;
      },
      editMember(row) {
        this.isNewMember = false;
        this.memberInfo = row;
        this.visibleDialog = true;
      },
      _getMemberList() {
        this.vloading = true;
        let params = {
          'pageNo': this.currentPage,
          'pageSize': this.pageSize,
          name: this.form.name,
          phone: this.form.phone
        };
        getMemberList(params).then((res) => {
          if (res.success) {
            let arr = res.content.list;
            arr.forEach((item) => {
              item.amount = item.amount || 0;
            });
            this.tableData = arr;
            this.pageTotal = res.content.total;
          } else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.vloading = false;
        });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this._getMemberList();
      },
      changePage(v) {
        this.currentPage = v;
        this._getMemberList();
      },
      resetCurrentPage() {
        this.currentPage = 1;
        this._getMemberList();
      },
      operateMoney(row) {
        this.memberInfo = row;
        this.visibleDialogMoney = true;
      },
      consumeRecord(row) {
        this.memberInfo = row;
        this.visibleSlideDialog = true;
      },
      confirmCallback() {
        this.visibleDialog = false;
        this.resetCurrentPage();
      },
      confirmCallbackMoney() {
        this.visibleDialogMoney = false;
        this.resetCurrentPage();
      }
    }
  };
</script>

<style lang='scss' scoped>
  .search-bar{
    position: relative;
    .add{
      position: absolute;right: 0;top: 0;
    }
  }
</style>
