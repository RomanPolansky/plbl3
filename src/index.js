import { App } from './scripts/App'
import { loaderAdd } from './scripts/Loader'
import { Eventer } from './scripts/Eventer'
import { app } from './scripts/Global'
import { PerlinNoise, p } from './scripts/PerlinNoise'

let eventer = new Eventer()
app.eventer = eventer

let myApp = new App()

myApp.init()
loaderAdd()
window.addEventListener('resize', () => {
    myApp.resize(window.innerWidth*0.98, window.innerHeight*0.98)
})
myApp.start()


console.log(new PerlinNoise(p).noise(0, 0, 0))