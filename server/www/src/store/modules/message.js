const message = {
  state: {
    receiveMessages: [],
    sendMessages: []
  },
  mutations: {
    pushReceiveMessages(state, message){
      state.receiveMessages.push(message);
    },
    pushsendMessages(state, message){
      state.sendMessages.push(message);
    }
  }
};


export default message;
