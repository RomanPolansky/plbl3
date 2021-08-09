import TWEEN from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { BackGround } from './BackGround'
import { Clouds } from './Clounds'
import { SceneMain } from './SceneMain'
import { app } from './Global'
export class App
{
    constructor()
    {
        this.time = 0.0
        this.deltaTime = 0.0

        app.game = this
    }
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
        this.resize(window.innerWidth, window.innerHeight)

        this.bg = new BackGround()
        this.app.stage.addChild(this.bg)
        this.bg.zIndex = 0
        this.clouds = new Clouds(this.bg.bg)
        this.clouds.zIndex = 2
        this.app.stage.addChild(this.clouds)

        this.sceneMain = new SceneMain()
        this.sceneMain.zIndex = 3
        this.app.stage.addChild(this.sceneMain)

        this.app.ticker.add(this.update.bind(this))

       this.resize(window.innerWidth, window.innerHeight)

        app.eventer.on('gotPrize', ()=>{
            if (app.moveCount === 3)
            {
                this.sceneMain.unShow(750)
                this.clouds.animation(900, 700)
                this.clouds.goToPS(900)
            }
        })
    }
    update()
    {
        this.deltaTime = this.app.ticker.deltaMS
        this.time += this.deltaTime
        TWEEN.update(this.time)
        this.clouds.update(this.time)
    }
    resize(Width, Height)
    {
        this.app.renderer.resize(Width, Height);
        if (this.bg !== undefined) this.bg.resize(Width, Height)
        if (this.clouds !== undefined) this.clouds.resize(Width, Height)
        if (this.sceneMain !== undefined) this.sceneMain.resize(Width, Height)
    }
}