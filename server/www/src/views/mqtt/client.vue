<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="block">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入内容"
            v-model="currentMsg.client">
          </el-input>
          <div style="margin: 20px 0;"></div>
          <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="currentMsg.text">
          </el-input>
          <!--<el-input v-model="currentMsg.client" placeholder="msg"></el-input>-->
          <!--<el-input v-model="currentMsg.text" placeholder="msg"></el-input>-->
          <el-button type="success" @click="sendMsg(currentMsg.client, currentMsg.text)">发送</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <h5>已发送</h5>
          <ol>
            <li v-for="msg in sendedList">
              {{msg.timeStamp}} - {{ msg.msg }}

            </li>
          </ol>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <h5>已接收</h5>
          <ol>
            <li v-for="rcv in recievedList">
              {{rcv.date.toISOString().substring(0, 23)}} - {{rcv.text}}

            </li>
          </ol>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import Vuex from 'vuex';
  import mqttClient from '@/components/mqttClient';
  export default {
    data() {
      return {
        currentMsg: {
          topic: "",
          msg: ""
        },
        sendedList: []
      }
    },
    mounted() {
    },
    computed: {
      ...Vuex.mapState({
        recievedList: state => state.message.receiveMessages
      })
    },
    methods: {
      sendMsg(client, msg) {
        mqttClient.doPublish(client, msg);
        var msgObj = {
          timeStamp: new Date(),
          client: client,
          msg: msg
        };
        this.sendedList.push(msgObj);
      }
    },
    watch: {
      recievedList(){
        //nothing to 多
      }
    }
  };
</script>
