class Deck{
    constructor(){
        let suit;
        let value;
        this.suits = ['\u2660', '\u2666', '\u2665', '\u2663'];
        this.values = ['A', 'K', 'Q', 'J', 10, 9, 8, 7, 6, 5, 4, 3, 2];
        this.deck = [];
        this.card = [];
        this.dealCounter = 0;
        for( suit of this.suits){
            for( value of this.values){
                this.card.push({value, suit});
            }
        }
        this.shuffle(this.card);
    }
    getDeckSet(){
        return new Set(this.card);
    }

    // getShuffledDeckSet(){
    //     return new Set(this.shuffle(this.deck));
    // }

    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        this.dealCounter = 0;
        return a;
    }

    deal(){
        return this.card[this.dealCounter++];
    }

    calculateCardTotal(cards){
        let total = 0;
        let ace = [];
        let item;
        let a
        for(item of cards){
            if(item.value == "A"){
                ace.push(item);
            }else if((typeof item.value) == "number"){
                total += item.value;
            }else{
                total += 10;
            } 
        }
        for( a in ace){
            if(total <= 10){
                total += 11;
            }else{
                total += 1;
            }
        }
        return total;
    }

    checkBust(score){
        if(score > 21){
            return true;
        }
    }

}

module.exports = Deck