const message = {
  state: {
    receiveMessages: [],
    sendMessages: []
  },
  mutations: {
    pushReceiveMessages(state, message){
      var msgObj = {
        date : new Date(),
        text : message.toString()
      };
      state.receiveMessages.push(msgObj);
    },
    pushsendMessages(state, message){

      state.sendMessages.push(message);
    }
  }
};


export default message;
