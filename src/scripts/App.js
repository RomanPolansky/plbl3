import * as PIXI from 'pixi.js'
import { Loader } from './Loader'
import { SceneMain } from './SceneMain'
import { Global } from './Global'

export class App
{
    init()
    {
        this.app = new PIXI.Application({
            width: 16,
            height: 16,
            antialias: true,
            transparent: false,
            resolution: 1,
            autoDensity : false,
            backgroundColor : 0x000000
        })
        
        document.body.appendChild(this.app.view)
        this.app.view.classList.add('cvs')

        this.loader = new Loader(this.app.loader)
        this.loader.preload().then(() => this.start())
    }
    start()
    {
        this.scene = new SceneMain()
        this.app.stage.addChild(this.scene)
        this.resize(window.innerWidth, window.innerHeight)

        this.bg = new PIXI.Sprite(Global.resources['bg'].texture)
        this.bg.width = this.app.view.width
        this.bg.height = this.app.view.height
        this.app.stage.addChild(this.bg)
    }
    resize(Width, Height)
    {
        this.app.renderer.resize(Width, Height);
        if (this.bg !== undefined)
        {
            this.bg.width = this.app.view.width
            this.bg.height = this.app.view.height
        }
    }
}