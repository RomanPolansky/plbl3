import { Tween } from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { sprites, app } from './Global'
import { clickSound } from './sound'
export class SpinCenter extends PIXI.Container
{
    constructor()
    {
        super()

        this.isClicked = false 
        
        this.spinCircle = sprites.spinCircle
        this.spinCircle.anchor.set(0.5)

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

        app.eventer.on('gotPrize', () => {
            this.isClicked = false
        })
        this.animation()
    }
    animation()
    {
        let tween = new Tween(this.btnCont).to({scale : { x: 1.15, y: 1.15} }, 250).yoyo(true).repeat(3)
        
        let time = 500
        let spinRoll = false
        const func = () => {
            time -= app.game.app.ticker.deltaMS
            if (time < 0)
            {
                time = 2500
                if (!spinRoll && app.isGameplay) tween.start(app.game.time)
            }
        }
        app.game.app.ticker.add(func)
        app.eventer.on('wheelStart', ()=>{
            spinRoll = true
        })
        app.eventer.on('gotPrize', ()=>{
            spinRoll = false
            time = 500
        })
    }
    click()
    {
        if (!this.isClicked && app.isGameplay && app.moveCount < 3)
        {
            this.isClicked = true
            app.eventer.emit('spinClick')
            app.eventer.emit('wheelStart')
            clickSound.play()
        }
    }
}