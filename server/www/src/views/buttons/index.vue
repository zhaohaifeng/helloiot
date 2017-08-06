<el-input v-model="listData"></el-input>

<template>
  <el-button
    plain
    @click="triggerBuzzer">
    trigger Buzzer
  </el-button>
</template>

<script>
  import { getButtonList,triggerBuzzer } from '@/api/buttons';

  export default {
    data() {
      return {
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        this.listLoading = true;
        getButtonList().then(response => {
          this.listData = response.data;
          this.list = response.data.items;
          this.listLoading = false;
        })
      },
      triggerBuzzer() {
        triggerBuzzer().then(response => {
          this.openNotify("triggerBuzzer", "成功");
        })
      },
      openNotify(title, msg) {
        const h = this.$createElement;

        this.$notify({
          title: 'title',
          message: h('i', { style: 'color: teal'}, msg)
        });
      },
    }
  };
</script>
