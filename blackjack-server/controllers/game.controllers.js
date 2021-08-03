const game = require('../models/game.model')

class Controllers{
    test(request,  response){
        response.json({'message': 'IT WORKED AGAIN!!'})
    }

    newGame(request, response){
        const {start, end} = request.query
        const id = game.create()
        response.json(game.get(id))
    }

    getGame(request, response){
        const id = request.params.id
        const data = game.get(id)
        if(data){
            data['success'] = true
            response.json(data)
        }else{
            response.json({'success': false})
        }
    }

    resetGame(request, response){
        const id = request.params.id
        // const playerBet = request.params.playerBet
        console.log(request.params.playerBet)
        game.reset(id, 10)
        response.json(game.get(id))
    }

    dealCard(request, response){
        const id = request.params.id
        let theCard = game.get(id).deck.deal()
        response.json(theCard)
    }

    hit(request, response){
        const id = request.params.id
        const myGame = game.get(id)
        let player = myGame.player
        let theCard = myGame.deck.deal()
        player.cards.push(theCard)
        player.currentScore = game.calculateCardTotal(player.cards)
        player.bust = (player.currentScore > 21 ? true : false)
        response.json(player)
    }

    stay(request, response){
        const id = request.params.id
        const myGame = game.get(id)
        let dealer = myGame.dealer
        // let theCard = myGame.deck.deal()
        // dealer.cards.push(theCard)
        // dealer.currentScore = game.calculateCardTotal(dealer.cards)
        // dealer.bust = (dealer.currentScore > 21 ? true : false)
        while(dealer.currentScore < 17){
            let theCard = myGame.deck.deal()
            dealer.cards.push(theCard)
            dealer.currentScore = game.calculateCardTotal(dealer.cards)
            dealer.bust = (dealer.currentScore > 21 ? true : false)
        }
        const winStatus = game.winnerCircle(myGame.player, myGame.dealer)
        let gameResult = {dealer, winStatus}
        response.json(gameResult)
    }

    setBet(request,response){
        const id = request.params.id
        const bet = request.params.bet
        const myGame = game.get(id)
        game.setPlayerBet(bet)
    }

}

module.exports = new Controllers()