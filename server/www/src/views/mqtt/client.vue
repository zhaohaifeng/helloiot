<template>
  <div>
    <el-row :gutter="20" justify="center">
      <el-col :span="12">
        <div class="block">
          <div style="margin: 20px;">
            <el-input
              type="textarea"
              autosize
              placeholder="clientUserName"
              v-model="currentMsg.client">
            </el-input>
            <div style="margin: 20px 0;"></div>
            <el-input
              type="textarea"
              placeholder="message"
              v-model="currentMsg.text">
            </el-input>
          </div>
          <div style="margin: 20px;">
            <el-button type="success" @click="sendMsg(currentMsg.client, currentMsg.text)">发送</el-button>
            <el-button type="default" @click="clear">清空</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="grid-content bg-purple" style="margin: 20px;">
          <h5>已发送</h5>
          <ol>
            <li v-for="msg in sendedList">
              {{msg.timeStamp}} - {{ msg.msg }}


            </li>
          </ol>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple" style="margin: 20px;">
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
      },
      clear() {
        this.currentMsg = {
          topic: "",
          msg: ""
        }
      }
    },
    watch: {
      recievedList(){
        //nothing to 多
      }
    }
  };
</script>
