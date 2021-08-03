class GamePlay extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            player: this.props.game.player,
            dealer: this.props.game.dealer,
            deck: this.props.game.deck,
            displayStatus: `<h3>WINNER!!!</h3>`,
            bet: this.props.playerBet,
            showDealerHand: false,
            displayWinner: false,
            replay: false,
            gamePlay: true,
            gameID: this.props.game.gameID
        }
        this.updateJellybeanTotal = this.updateJellybeanTotal.bind(this)
        this.stay = this.stay.bind(this)
        this.reset = this.reset.bind(this)
        // this.deal = this.deal.bind(this)
        this.hit = this.hit.bind(this)
    }

    async hit(){
        let id = this.state.gameID
        const url = `http://localhost:3000/api/game/${id}/hit`
        const response = await fetch(url)
        let data = await response.json()
        await this.setState({player: data})
        if(this.state.player.bust){
            this.stay()
        }
        console.log(data)

        // await this.setState(prevState => {
        //     let player = Object.assign({}, prevState.player)
        //     player.cards.push(theCard)
        //     player.currentScore = this.calculateCardTotal(player.cards)
        //     player.bust = (player.currentScore > 21 ? true : false)
        //     return { player }
        // })
    }

    // async deal(button){
    //     let id = this.state.gameID
    //     const url = `http://localhost:3000/api/game/${id}/deal` //security flaw
    //     const response = await fetch(url)
    //     let data = await response.json()
    //     if(this.state.player.bust){
    //         this.stay(data)
    //         return
    //     }else{
    //         this.hit(data)
    //     }
    // }

    async stay(){
        await this.setState({showDealerHand: true})
        let id = this.state.gameID
        const url = `http://localhost:3000/api/game/${id}/stay`
        const response = await fetch(url)
        let data = await response.json()
        await this.setState({dealer: data.dealer, displayStatus: data.winStatus})
        console.log(data)
        // this.setState({showDealerHand: true})
        // while(this.state.dealer.currentScore < 17){
        //     await this.setState(prevState => {
        //         let dealer = Object.assign({}, prevState.dealer);
        //         dealer.cards.push(theCard)
        //         dealer.currentScore = this.calculateCardTotal(dealer.cards) 
        //         dealer.bust = (dealer.currentScore > 21 ? true : false)               
        //     return { dealer }
        //       })
        // }
        // this.winnerCircle(this.state.player, this.state.dealer)
        this
        this.reset()
        this.setState({displayWinner: true})
    }

    // calculateCardTotal = (cards) =>{
    //     let total = 0
    //     let ace = []
    //     let item
    //     let a
    //     console.log(cards)
    //     for(item of cards){
    //         if(item.value == "A"){
    //             ace.push(item);
    //         }else if((typeof item.value) == "number"){
    //             total += item.value
    //         }else{
    //             total += 10
    //         } 
    //     }
    //     for( a in ace){
    //         if(total <= 10){
    //             total += 11
    //         }else{
    //             total += 1
    //         }
    //     }
    //     return total
    // }

    winnerCircle = (player, dealer) =>{
        if(player.bust && dealer.currentScore < 21){
            this.updateJellybeanTotal('lose')
            this.setState({playerStatus: <h3>You Lose</h3>}) 
        }else if(dealer.bust && player.currentScore < 21){
            this.updateJellybeanTotal('win')
            this.setState({playerStatus: <h3>WINNER!!!</h3>}) 
        }else if(player.currentScore < dealer.currentScore){
            this.updateJellybeanTotal('lose')
            this.setState({playerStatus: <h3>You Lose</h3>}) 
        }else if(dealer.currentScore < player.currentScore){
            this.updateJellybeanTotal('win')
            this.setState({playerStatus: <h3>WINNER!!!</h3>}) 
        }else if(dealer.bust && player.bust){
            this.setState({playerStatus: <h3>DRAW</h3>}) 
        }else{
            this.setState({playerStatus: <h3>DRAW</h3>}) 
        }
        this.reset()
    }

    displayCards = (cards) =>{
        const elements = cards
        const items = []

        for(let card of elements){
            items.push(<CardRender value={card.value} suit={card.suit}/>)
        }

        return(
            <div>
                {items}
            </div>)
    }

    // displayCards = (cards)=>{
    //     if(cards.length > 6){ 
    //         return(
    //             <div>
    //                 <CardRender value={cards[0].value} suit={cards[0].suit} />
    //                 <CardRender value={cards[1].value} suit={cards[1].suit} />
    //                 <CardRender value={cards[2].value} suit={cards[2].suit} />
    //                 <CardRender value={cards[3].value} suit={cards[3].suit} />
    //                 <CardRender value={cards[4].value} suit={cards[4].suit} />
    //                 <CardRender value={cards[5].value} suit={cards[5].suit} />
    //                 <CardRender value={cards[6].value} suit={cards[6].suit} />
    //             </div> )}
    //     if(cards.length > 5){ 
    //         return(
    //             <div>
    //                 <CardRender value={cards[0].value} suit={cards[0].suit} />
    //                 <CardRender value={cards[1].value} suit={cards[1].suit} />
    //                 <CardRender value={cards[2].value} suit={cards[2].suit} />
    //                 <CardRender value={cards[3].value} suit={cards[3].suit} />
    //                 <CardRender value={cards[4].value} suit={cards[4].suit} />
    //                 <CardRender value={cards[5].value} suit={cards[5].suit} />
    //             </div> )}
    //     if(cards.length > 4){ 
    //         return(
    //             <div>
    //                 <CardRender value={cards[0].value} suit={cards[0].suit} />
    //                 <CardRender value={cards[1].value} suit={cards[1].suit} />
    //                 <CardRender value={cards[2].value} suit={cards[2].suit} />
    //                 <CardRender value={cards[3].value} suit={cards[3].suit} />
    //                 <CardRender value={cards[4].value} suit={cards[4].suit} />
    //             </div> )}
    //     if(cards.length > 3){ 
    //         return(
    //             <div>
    //                 <CardRender value={cards[0].value} suit={cards[0].suit} />
    //                 <CardRender value={cards[1].value} suit={cards[1].suit} />
    //                 <CardRender value={cards[2].value} suit={cards[2].suit} />
    //                 <CardRender value={cards[3].value} suit={cards[3].suit} />
    //             </div> )}
    //     if(cards.length > 2){ 
    //         return(
    //             <div>
    //                 <CardRender value={cards[0].value} suit={cards[0].suit} />
    //                 <CardRender value={cards[1].value} suit={cards[1].suit} />
    //                 <CardRender value={cards[2].value} suit={cards[2].suit} />
    //             </div> )}
    //     return(
    //         <div>
    //             <CardRender value={cards[0].value} suit={cards[0].suit} />
    //             <CardRender value={cards[1].value} suit={cards[1].suit} />
    //         </div> )
    // }

    async updateJellybeanTotal(status){
        await this.setState(prevState => {
            let player = Object.assign({}, prevState.player); 
            if(status == 'win'){
                player.jellyBeans = parseInt(player.jellyBeans) + parseInt(this.state.bet);
                console.log(player.jellyBeans)
            }else if(status == 'lose'){
                player.jellyBeans = parseInt(player.jellyBeans) - parseInt(this.state.bet);
                console.log(player.jellyBeans)
            }
            return { player };
        })  
    }

    startAgain = ()=>{
        this.props.toggleView()
    }

    async reset(){
        console.log(this.state.gameID)
        let id = this.state.gameID
        let playerBet = this.state.bet
        // let newTotal = this.state.player.jellyBeans
        const url = `http://localhost:3000/api/game/${id}/reset` //security flaw
        const response = await fetch(url)
        const data = await response.json()
        // this.setState({game: data, nextPhase: true})
        this.props.resetGame(data)
        console.log(data)
    }

    render(){
        let dealerHand
        let winner
        let playAgain
        let replay
        let gamePlay

        if(this.state.showDealerHand){
            dealerHand = (
                <div>
                    <p id='print-dealer-cards'>{this.displayCards(this.state.dealer.cards)}</p>
                    <p id='print-dealer-total'>Dealer Card total: {this.state.dealer.currentScore}</p>
                </div>
            )

            winner = this.state.displayStatus
            playAgain = (
                <button onClick = {this.startAgain}>PLAY AGAIN</button>
            )
        }

        if(this.state.replay){
            replay = <App />
        }

        if(!this.state.replay){
            gamePlay = (
                <div>
                    <h1>Game Phase</h1>
                    <h3>GOOD LUCK!</h3>
                    <p id='print-bet'>Your wager: {this.props.playerBet} Jellybeans</p>
                    {this.displayCards(this.state.player.cards)}
                    <p id='print-player-total'>Your Card Total: {this.state.player.currentScore}</p>
                    <p id='player-bust'></p>
                    <button id='hit' onClick = {this.hit}>HIT</button>
                    <button id='stay'onClick = {this.stay}>STAY</button>
                </div>
            )
        }

        return(
            <div>
                {gamePlay}
                {dealerHand}
                <h3>{winner}</h3>
                {playAgain}
                {replay}
            </div>
        );
    }
}