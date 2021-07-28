import * as PIXI from 'pixi.js'
import { BackGround } from './BackGround'
import { SceneMain } from './SceneMain'
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
    }
    start()
    {
        this.bg = new BackGround()
        this.app.stage.addChild(this.bg)
        
        this.resize(window.innerWidth, window.innerHeight)
    }
    resize(Width, Height)
    {
        this.app.renderer.resize(Width, Height);
        if (this.bg !== undefined)
        {
            this.bg.resize(Width, Height)
        }
    }
}