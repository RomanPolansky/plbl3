import TWEEN from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { BackGround } from './BackGround'
import { SceneMain } from './SceneMain'
import { ScenePS } from './ScenePS'
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
        this.app.stage.sortableChildren = true
        document.body.appendChild(this.app.view)
        this.app.view.classList.add('cvs')
    }
    start()
    {
        this.bg = new BackGround()
        this.bg.zIndex = 0
        this.app.stage.addChild(this.bg)

        this.sceneMain = new SceneMain()
        this.sceneMain.zIndex = 2
        this.app.stage.addChild(this.sceneMain)

        this.app.ticker.add(this.update.bind(this))

        this.resize(window.innerWidth, window.innerHeight)

        app.eventer.on('gotPrize', ()=>{
            if (app.moveCount === 1)
            {
                this.scenePS = new ScenePS()
                this.app.stage.addChild(this.scenePS)
                this.scenePS.zIndex = 1
                this.scenePS.resize(this.app.renderer.width, this.app.renderer.height)

                this.scenePS.show(800)
                this.sceneMain.unShow(800)
                this.bg.animation(600, 800)
            }
        })
    }
    update()
    {
        this.deltaTime = this.app.ticker.deltaMS
        this.time += this.deltaTime
        TWEEN.update(this.time)
        this.bg.update(this.time)
    }
    resize(Width, Height)
    {
        this.app.renderer.resize(Width, Height);
        if (this.bg !== undefined) this.bg.resize(Width, Height)
        if (this.sceneMain !== undefined) this.sceneMain.resize(Width, Height)
        if (this.scenePS !== undefined) this.scenePS.resize(Width, Height)
    }
}