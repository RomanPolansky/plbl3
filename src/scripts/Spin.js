import TWEEN from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { sprites, app } from './Global'

export class Spin extends PIXI.Container
{
    constructor()
    { 
        super()

        this.wheel = sprites.wheel
        this.wheel.scale.set(0.6)
        this.wheel.pivot.x = this.width/2
        this.wheel.pivot.y = this.height/2

        this.addChild(this.wheel)

        this.pivot.x = this.width/2
        this.pivot.y = this.height/2

        this.fillWheel()

        app.eventer.on('wheelStart', () => {
            this.roll()
        })
    }
    roll()
    {
        let newAngle = this.angle+330 + 360
        new TWEEN.Tween(this).to({angle : newAngle }, 5000).easing(TWEEN.Easing.Back.Out).start(app.game.time).onComplete(() => {
            app.eventer.emit('wheelStop')
        })
    }
    fillWheel()
    {
        this.luckyCoin1 = sprites.luckyCoin1
        this.luckyCoin1.scale.set(0.7)
        this.luckyCoin1.x = 239
        this.luckyCoin1.y = 177
        this.luckyCoin1.angle = -30

        this.coin1 = sprites.coin1
        this.coin1.scale.set(0.7)
        this.coin1.x = 326
        this.coin1.y = 155
        
        this.puzzle1 = sprites.puzzle1
        this.puzzle1.scale.set(0.62)
        this.puzzle1.x = 420
        this.puzzle1.y = 175
        this.puzzle1.angle = 33

        this.bingo1 = sprites.bingo1
        this.bingo1.scale.set(0.65)
        this.bingo1.x = 478
        this.bingo1.y = 245
        this.bingo1.angle = 60

        this.coin2 = sprites.coin2
        this.coin2.scale.set(0.7)
        this.coin2.x = 503
        this.coin2.y = 333
        this.coin2.angle = 90

        this.puzzle2 = sprites.puzzle2
        this.puzzle2.scale.set(0.62)
        this.puzzle2.x = 482
        this.puzzle2.y = 426
        this.puzzle2.angle = 120

        this.luckyCoin2 = sprites.luckyCoin2
        this.luckyCoin2.scale.set(0.7)
        this.luckyCoin2.x = 411
        this.luckyCoin2.y = 487
        this.luckyCoin2.angle = 150

        this.coin3 = sprites.coin3
        this.coin3.scale.set(0.7)
        this.coin3.x = 326
        this.coin3.y = 510
        this.coin3.angle = 180

        this.puzzle3 = sprites.puzzle3
        this.puzzle3.scale.set(0.62)
        this.puzzle3.x = 231
        this.puzzle3.y = 490
        this.puzzle3.angle = -150

        this.bingo2 = sprites.bingo2
        this.bingo2.scale.set(0.65)
        this.bingo2.x = 174
        this.bingo2.y = 422
        this.bingo2.angle = -120

        this.coin4 = sprites.coin4
        this.coin4.scale.set(0.7)
        this.coin4.x = 147
        this.coin4.y = 330
        this.coin4.angle = -90

        this.puzzle4 = sprites.puzzle4
        this.puzzle4.scale.set(0.62)
        this.puzzle4.x = 170
        this.puzzle4.y = 238
        this.puzzle4.angle = -60

        this.addChild(this.coin1)
        this.addChild(this.puzzle1)
        this.addChild(this.luckyCoin1)
        this.addChild(this.bingo1)
        this.addChild(this.coin2)
        this.addChild(this.puzzle2)
        this.addChild(this.luckyCoin2)
        this.addChild(this.coin3)
        this.addChild(this.puzzle3)
        this.addChild(this.bingo2)
        this.addChild(this.coin4)
        this.addChild(this.puzzle4)
    }
}