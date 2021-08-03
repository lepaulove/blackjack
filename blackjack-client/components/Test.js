class Test extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            message: 'No Response'
        }
        this.clicked = this.clicked.bind(this)
    }

    async clicked(){
        const url = `http://localhost:3000/api/game/test`
        const response = await fetch(url)
        const data = await response.json()
        this.setState({message: data.message})
        test(data)
    }

    render(){
        return(
            <div>
                <button type='button' onClick={this.clicked}>CLICK to Test</button>
                <h1>{this.state.message}</h1>
            </div>
        )
    }
}