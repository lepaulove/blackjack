const getCallbacks = function(){
    const callbacks = {}
    callbacks['test-button'] = testFunction
    return callbacks
}

const addController = function(...buttonIDs){
    const callbacks = getCallbacks();
    for(let id of buttonIDs){
        const button = document.getElementById(id)
        button.addEventListener('click', callbacks[id])
    }
}