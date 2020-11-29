class Token{
    token ="";
    expiryDate = new Date()

    constructor(tokenItem){
      this.token = tokenItem;
      this.expiryDate.setDate(this.expiryDate.getDate()+1)      
    }
}

export default Token;