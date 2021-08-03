// const deck = require('../models/Deck')

class Dealer{
    constructor(card1, card2, deck){
        this.cards = [card1, card2];
        this.currentScore = deck.calculateCardTotal(this.cards);
    }
  
    resetDealer(card1, card2){
      this.cards = [card1, card2];
      this.currentScore = deck.calculateCardTotal(this.cards);
    }
    
  }

  module.exports = Dealer