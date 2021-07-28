import { App } from './scripts/App'
import { loaderAdd } from './scripts/Loader'

let app = new App()
app.init()

window.addEventListener('resize', () => {app.resize(window.innerWidth, window.innerHeight)})

loaderAdd()

app.start()