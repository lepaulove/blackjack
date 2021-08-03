const shortid = require('shortid')
const Player = require('../models/Player')
const Dealer = require('../models/Dealer')
const Deck = require('../models/Deck')

class Game{

    constructor(){
        this.games = {},
        this.player,
        this.dealer,
        this.deck,
        this.playerBet
    }

    test(request, response){
        response.json({'success': true})
    }

    create(){
        const id = shortid.generate()
        this.deck = new Deck()
        this.player = new Player(this.deck.deal(), this.deck.deal(), this.deck, 25)
        this.dealer = new Dealer(this.deck.deal(), this.deck.deal(), this.deck)
        this.games[id] = {'gameID': id, 'player': this.player, 'dealer': this.dealer, 'deck': this.deck}
        console.log(this.games)
        return id
    }

    get(id){
        if(this.games[id]){
            const {number, ...data} = this.games[id]
            return data
        }else{
            return null
        }
    }

    reset(id, playerBet){
        this.deck = new Deck()
        // this.playerBet = playerBet
        this.player = new Player(this.deck.deal(), this.deck.deal(), this.deck, this.player.jellyBeans)
        this.dealer = new Dealer(this.deck.deal(), this.deck.deal(), this.deck)
        this.games[id] = {'gameID': id, 'player': this.player, 'dealer': this.dealer, 'deck': this.deck}
    }

    getCard(id){
        let theCard = this.games[id].deck.deal()
        console.log(theCard)
        return theCard
    }

    calculateCardTotal(cards){
        let total = 0
        let ace = []
        let item
        let a
        // console.log(cards)
        for(item of cards){
            if(item.value == "A"){
                ace.push(item);
            }else if((typeof item.value) == "number"){
                total += item.value
            }else{
                total += 10
            } 
        }
        for( a in ace){
            if(total <= 10){
                total += 11
            }else{
                total += 1
            }
        }
        return total
    }

    winnerCircle = (player, dealer) =>{
        if(player.bust && dealer.currentScore < 21){
            this.updateJellybeanTotal('lose')
            return "You Lose"
        }else if(dealer.bust && player.currentScore < 21){
            this.updateJellybeanTotal('win')
            return "WINNER!!!" 
        }else if(player.currentScore < dealer.currentScore){
            this.updateJellybeanTotal('lose')
            return "You Lose" 
        }else if(dealer.currentScore < player.currentScore){
            this.updateJellybeanTotal('win')
            return "WINNER!!!" 
        }else if(dealer.bust && player.bust){
            return "DRAW" 
        }else{
            return "DRAW"
        }
    }

    updateJellybeanTotal = (status) =>{
        // console.log(this.player.jellyBeans)
        // console.log(this.playerBet)
        if(status == 'win'){
            this.player.jellyBeans = parseInt(this.player.jellyBeans) + parseInt(this.playerBet);
            // console.log(this.player.jellyBeans)
        }else if(status == 'lose'){
            this.player.jellyBeans = parseInt(this.player.jellyBeans) - parseInt(this.playerBet);
            // console.log(this.player.jellyBeans)
        } 
    }

    setPlayerBet = (theBet) =>{
        this.playerBet = theBet
    }

}

module.exports = new Game()