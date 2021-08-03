const {Card, CardHeader, CardImg, CardTitle, CardFooter, CardDeck} = Reactstrap;

class CardRender extends React.Component{
    render(){
        const textformat = "bg-dark text-light text-center";
        return(
            <div style={{width:"75px", display:"inline-block", margin: "5px"}}>
                <Card color className={textformat}>
                <CardHeader>{this.props.value}</CardHeader>
                <CardTitle>{this.props.suit}</CardTitle>
                </Card>
            </div>
            
        );
    }
}