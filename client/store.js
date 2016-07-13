var store = {
  state: {
    screenMessage: ''
  },
  setMessage: function (message) {
    console.log(message);
    this.state.screenMessage = message;
  }
};

export default store;
