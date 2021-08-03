class Game extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            gameID: '',
            game: {},
            nextPhase: false,
            viewToggle: true,
            playerBet: 0,
            count: 0
        }
        this.startGame = this.startGame.bind(this)
        this.findGame = this.findGame.bind(this)
    }

    async startGame(){
        const url = `http://localhost:3000/api/game/newGame`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({gameID: data.gameID, game: data, nextPhase: true})
        console.log(data)
    }

    async findGame(){
        console.log(this.state.gameID)
        let id = this.state.gameID
        const url = `http://localhost:3000/api/game/${id}`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({game: data, nextPhase: true})
        console.log(data)
    }

    findGames = () =>{
        this.setState({count: ++this.state.count})
        if(this.state.count % 2 == 0){
            console.log('Send them that username buddd!!!!!')
        }else{
            console.log('I said send the username, NOW!!!!!')
        }
    }

    captureInput = (event) => {
        this.setState({gameID: event.target.value})
    }

    captureUsername = (event) => {
        this.setState({gameID: event.target.value})
    }

    toggleViews(){
        this.setState({viewToggle: !this.state.viewToggle})
    }

    async setBet(bet){
        await this.setState({playerBet: bet})
    }

    async resetGame(newGame){
        this.setState({game: newGame})
    }

    render(){

        if(this.state.nextPhase){
            if(this.state.viewToggle){
                return(
                <BetPhase 
                    game = {this.state.game} 
                    toggleView = {this.toggleViews.bind(this)}
                    setBet = {this.setBet.bind(this)}/>
                )
            }

            if(!this.state.viewToggle){
                if(!this.state.viewToggle){
                    return (
                     <GamePlay 
                        game = {this.state.game}
                        toggleView = {this.toggleViews.bind(this)}
                        playerBet = {this.state.playerBet}
                        resetGame = {this.resetGame.bind(this)}
                        //  updatePlayerJelleybeans = {this.updatePlayerJelleybeans.bind(this)}
                         />)
                 }
            }
            
        }else{
            return (
                <div>
                    <button type='button' onClick={this.startGame}>Start a new Game</button>
                    <section>
                            Enter a Game ID below to start a new game<br></br>
                            <input id='room-code' type='text' onChange={this.captureInput} ></input>
                            <button id='find-game-button' onClick={this.findGame}>Find Game</button><br></br>
                            Enter your Username below<br></br>
                            <input type='text' onChange={this.captureUsername}></input>
                            <button id='find-user-button' onClick={this.findGames}>Find Game</button>
                    </section>
                    <h1>{this.state.message}</h1>
                </div>
            )
        }
        
    }
}