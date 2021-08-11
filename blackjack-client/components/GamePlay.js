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
        const url = `/api/game/${id}/hit`
        const response = await fetch(url)
        let data = await response.json()
        await this.setState({player: data})
        if(this.state.player.bust){
            this.stay()
        }
        console.log(data)
    }

    async stay(){
        await this.setState({showDealerHand: true})
        let id = this.state.gameID
        const url = `/api/game/${id}/stay`
        const response = await fetch(url)
        let data = await response.json()
        await this.setState({dealer: data.dealer, displayStatus: data.winStatus})
        console.log(data)
        // this.setState({showDealerHand: true})
        this
        this.reset()
        this.setState({displayWinner: true})
    }

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
        const url = `/api/game/${id}/reset` //security flaw
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