import { App } from './scripts/App'

let app = new App()
app.init()

window.addEventListener('resize', () => {app.resize(window.innerWidth, window.innerHeight)})