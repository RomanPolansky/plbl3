import { App } from './scripts/App'
import { loaderAdd } from './scripts/Loader'
import { Eventer } from './scripts/Eventer'
import { app } from './scripts/Global'

let eventer = new Eventer()
app.eventer = eventer

let myApp = new App()

myApp.init()
loaderAdd()
window.addEventListener('resize', () => {
    myApp.resize(window.innerWidth*0.98, window.innerHeight*0.98)
})
myApp.start()