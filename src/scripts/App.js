import * as PIXI from 'pixi.js'
import { Loader } from './Loader'
import { SceneMain } from './SceneMain'

export class App
{
    init()
    {
        this.app = new PIXI.Application({
            resizeTo:window
        })
        this.bg = new PIXI.Sprite()
        document.body.appendChild(this.app.view)

        this.loader = new Loader(this.app.loader)
        this.loader.preload().then(() => this.start())
    }
    start()
    {
        console.log('started')
        this.scene = new SceneMain()
        this.app.stage.addChild(this.scene)
    }
}