import { Tween } from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { sprites, app } from './Global'

export class SpinCenter extends PIXI.Container
{
    constructor()
    {
        super()

        this.isClicked = false
        
        this.spinCircle = sprites.spinCircle
        this.spinCircle.anchor.set(0.5)
        this.spinCircle.scale.set(0.6)

        this.btnCont = new PIXI.Container()

        this.circleBar = sprites.circleBar
        this.circleBar.anchor.set(0.5)
        this.circleBar.scale.set(1)
        this.playBtn = sprites.playBtn
        this.playBtn.anchor.set(0.5)
        this.playBtn.scale.set(0.65)

        this.btnCont.addChild(this.circleBar)
        this.btnCont.addChild(this.playBtn)

        this.addChild(this.spinCircle)
        this.addChild(this.btnCont)

        this.btnCont.interactive = true
        this.btnCont.buttonMode = true
        this.btnCont.on('pointerup', () => {
            this.click()
        })

        app.eventer.on('wheelStop', () => {
            this.isClicked = false
        })
    }
    resize(width, height)
    {
        this.x = width/2
        this.y = height/2
    }
    btnAnim()
    {
        new Tween(this.btnCont).to({scale : { x: 1.1, y: 1.1} }, 400).yoyo(true).repeat(Infinity).start(app.game.time)
    }
    click()
    {
        if (!this.isClicked)
        {
            this.isClicked = true
            new Tween(this.btnCont).to({scale : { x: 0.87, y: 0.87} }, 200).yoyo(true).repeat(1).start(app.game.time).onComplete(() => {
                app.eventer.emit('wheelStart')
            })
        }
    }
}