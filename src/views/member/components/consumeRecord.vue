<template>
  <div class="wrap">
    <el-scrollbar style="height:100%" class="my-scrollbar">
      <div style="padding: 20px;">
        <p>账户余额(元)：<strong>{{ memberInfo.amount }}</strong></p>
        <ul>
          <li :class="item.operateType" v-for="(item,index) in recordArr" :key="index">
            <span class="remark">{{ item.remark }}</span>
            <span class="date">{{ item.createTime }}</span>
            <span class="consume">{{ item.operateType === 'plus' ? '+' : '-' }} {{ item.operateAmount }}</span>
          </li>
        </ul>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import { getConsumeRecord } from '@/api/member.js';
  // import { getFullDate, isToday, isYesterday, getTime } from '@/utils/date';
  // import dayjs from 'dayjs';
  export default {
    props: {
      memberInfo: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        recordArr: []
      };
    },
    components: {},
    created() {
      this._getConsumeRecord();
    },
    methods: {
      _getConsumeRecord() {
        this.vloading = true;
        let params = {
          memberCode: this.memberInfo.memberCode
        };
        getConsumeRecord(params).then((res) => {
          if (res.success) {
            this.recordArr = res.content;
          } else {
            this.$message.error(res.message);
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.vloading = false;
        });
      }
      // calculateTime(time) {
      //   time = dayjs(time).unix();// !返回 Unix 时间戳 (秒)。
      //   if (isToday(new Date(time * 1000))) {
      //     return '今天  ' + getTime(new Date(time * 1000));
      //   } else if (isYesterday(time * 1000)) {
      //     return '昨天  ' + getTime(new Date(time * 1000));
      //   } else {
      //     return getFullDate(new Date(time * 1000)); 
      //   }
      // }
    }
  };
</script>
<style lang='scss' scoped>
  .wrap{
    height: 100%;
    p{
      font-size: 18px;margin-bottom: 20px;
      strong{color: rgb(255, 88, 99)}
    }
    li{
      height: 40px;display: flex;align-items: center;border-bottom: 1px solid #DCDFE6;
      >span{font-size: 14px;}
      .remark{flex:1;color:#333;}
      .date{
        width: 150px;text-align: right;color: #999;
      }
      .consume{
        width: 80px;text-align: right;
      }
      &.plus{
        .consume{
          color: #67C23A;
        }
      }
      &.minus{
        .consume{
          color: #F56C6C;
        }
      }
    }
  }
</style>
