<template>
  <div>
    <div class="block">
      <el-input v-model="currentMsg.msg" placeholder="msg"></el-input>
      <el-button type="success" @click="sendMsg(currentMsg.topic, currentMsg.msg)">发送</el-button>
    </div>
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
            <li v-for="msg in recievedList">
              {{msg.timeStamp}} - {{ msg.msg }}
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
//      bus.$on("MsgCome", function (msg) {
//          console.log("msg comes", msg);
//          var msgObj = {
//            timeStamp: new Date(),
//            msg :msg
//          };
//
//          this.recievedList.push(msgObj);
//      })
    },
    computed: {
      ...Vuex.mapState({
        recievedList: state => state.message.receiveMessages
      })
    },
    methods: {
      sendMsg(topic, msg) {
//        topic = mqttClient.options.commonTopic;
//        mqttClient.doPublish(topic, msg);
//        var msgObj = {
//          timeStamp: new Date(),
//          msg: msg
//        };
//        this.sendedList.push(msgObj);
      }
    },
    watch: {
      recievedList(){
        //nothing to 多
      }
    }
  };
</script>
