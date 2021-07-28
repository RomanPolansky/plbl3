import { App } from './scripts/App'
import { loaderAdd } from './scripts/Loader'

let app = new App()
app.init()

window.addEventListener('resize', () => {app.resize(window.innerWidth*0.98, window.innerHeight*0.98)})

loaderAdd()

app.start()