class Player{

    constructor(card1, card2, deck, jellyBeans){
        this.jellyBeans = jellyBeans;
        this.cards = [card1, card2];
        this.currentScore = deck.calculateCardTotal(this.cards);
        this.bust = false;
    }

    hit(){
        this.cards.push(deck.deal());
        this.currentScore = deck.calculateCardTotal(this.cards);
        this.bust = deck.checkBust(deck.calculateCardTotal(this.cards));
        console.log("From player: " + dealer.currentScore);
        if(this.bust){
            printPlayerBust();
            this.stay();
        }
    }

    stay(){
        console.log(dealer.currentScore);
        while(dealer.currentScore < 17){
            console.log("inner");
          dealer.cards.push(deck.deal());
          dealer.currentScore = deck.calculateCardTotal(dealer.cards);
        }

    // updateJellybeanTotal = (status) =>{
    //     if(status == 'win'){
    //         this.jellyBeans = parseInt(this.jellyBeans) + parseInt(10);
    //         console.log(this.jellyBeans)
    //     }else if(status == 'lose'){
    //         this.jellyBeans = parseInt(this.jellyBeans) - parseInt(10);
    //         console.log(this.jellyBeans)
    //     } 
    // }


        // if(dealer.currentScore <= 21 && player.currentScore <= 21){
        //     if(dealer.currentScore < player.currentScore){
        //         printStatus("YOU WIN!!");
        //         this.jellyBeans += bet;
        //     }

        //     if(dealer.currentScore > player.currentScore){
        //         printStatus("You Lose");
        //         this.jellyBeans -= bet;
        //     }

        //     if(dealer.currentScore == player.currentScore){
        //         printStatus("DRAW");
        //     }
        // }

        // if(dealer.bust){
        //     if(player.currentScore <= 21){
        //         printStatus("YOU WIN!!");
        //         this.jellyBeans += bet;
        //     }

        //     if(player.bust){
        //         printStatus("DRAW");
        //     }
        // }

        // if(player.bust && dealer.currentScore <= 21){
        //     printStatus("You Lose");
        //     this.jellyBeans -= bet;
        // }

        if((this.bust && dealer.bust) || (this.currentScore == dealer.currentScore)){
            printStatus("DRAW")
        }else if((dealer.bust) || dealer.currentScore < this.currentScore){
            printStatus("YOU WIN!!");
            this.jellyBeans += bet;
        }else if((this.bust) || ((this.currentScore < dealer.currentScore) && !(dealer.bust))){
            printStatus('You Lose');
            this.jellyBeans -= bet;
        }

        printplayerJellybeanTotal();
        playAgainButton.disabled = false;
        hitButton.disabled = true;
        stayButton.disabled = true;
    }

    resetPlayer(card1, card2){
        this.cards = [card1, card2];
        this.currentScore = deck.calculateCardTotal(this.cards);
        this.bust = false;
    }

}

module.exports = Player