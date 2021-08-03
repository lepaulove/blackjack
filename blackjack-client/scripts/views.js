const test = function(res){
    const view = document.getElementById('view')
    const html = `<h1>${res.message}</h1>`
    console.log(res.message)
    view.innerHTML = html
}

const initialView = function(){
    const view = document.getElementById('view')
    const html = `<section><p>Press button to test</p>
            <button id='test-button'>TEST</button></section>`
    view.innerHTML = html
    addController('test-button')
}
