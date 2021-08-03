
async function testFunction(){
    console.log('Button pressed')
    const url = `http://localhost:3000/api/game/test`
    const response = await fetch(url)
    const data = await response.json()
    something = data.message
    test(data)
}