import TWEEN from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { sprites, app, prizes } from './Global'

export class Spin extends PIXI.Container
{
    constructor()
    { 
        super()

        this.data = []
        this.dataNum = []

        this.wheel = sprites.wheel
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
        let getBackOut = (s) => {
            return function(t) {
                return --t * t * ((s + 1) * t + s) + 1
            }
        }
        let randomInteger = (min, max) => {
            let rand = min - 0.5 + Math.random() * (max - min + 1)
            return Math.round(rand)
        }
        let newAngle
        if (app.moveCount === 0) newAngle = this.angle + 720 + randomInteger(1, 4)*90
        if (app.moveCount === 1) newAngle = this.angle + 720 + randomInteger(1, 4)*90 - 30
        if (app.moveCount === 2) newAngle = this.angle + 720 + randomInteger(1, 4)*90 - 30

        if (newAngle !== undefined)
        {
            new TWEEN.Tween(this).to({angle : newAngle }, 4500).easing(getBackOut(0.5)).start(app.game.time).onComplete(() => {
                app.eventer.emit('wheelStop')
            })            
        }
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

        this.addChild(this.coin1, this.coin2, this.coin3, this.coin4)
        this.addChild(this.puzzle1, this.puzzle2, this.puzzle3, this.puzzle4)
        this.addChild(this.luckyCoin1, this.luckyCoin2)
        this.addChild(this.bingo1, this.bingo2)

        this.data.push(this.coin1, this.coin2, this.coin3, this.coin4, this.puzzle1, this.puzzle2, this.puzzle3, this.puzzle4, this.luckyCoin1, this.luckyCoin2, this.bingo1, this.bingo2)

        let textStyle = {
            fontFamily : 'BQ',
            fontSize: 50,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 6,
            align: 'center'
        }
        this.text1 = new PIXI.Text('150', textStyle)
        this.text1.anchor.set(0.5)
        this.text1.x = this.coin1.x
        this.text1.y = this.coin1.y - 85

        this.text2 = new PIXI.Text('3', textStyle)
        this.text2.anchor.set(0.5)
        this.text2.angle = this.puzzle1.angle
        this.text2.x = this.puzzle1.x + 40
        this.text2.y = this.puzzle1.y - 70

        this.text3 = new PIXI.Text('10', textStyle)
        this.text3.anchor.set(0.5)
        this.text3.angle = this.bingo1.angle
        this.text3.x = this.bingo1.x + 75
        this.text3.y = this.bingo1.y - 40

        this.text4 = new PIXI.Text('200', textStyle)
        this.text4.anchor.set(0.5)
        this.text4.angle = this.coin2.angle
        this.text4.x = this.coin2.x + 80
        this.text4.y = this.coin2.y

        this.text5 = new PIXI.Text('5', textStyle)
        this.text5.anchor.set(0.5)
        this.text5.angle = this.puzzle2.angle
        this.text5.x = this.puzzle2.x + 65
        this.text5.y = this.puzzle2.y + 40

        this.text6 = new PIXI.Text('1', textStyle)
        this.text6.anchor.set(0.5)
        this.text6.angle = this.luckyCoin2.angle
        this.text6.x = this.luckyCoin2.x + 45
        this.text6.y = this.luckyCoin2.y + 75

        this.text7 = new PIXI.Text('100', textStyle)
        this.text7.anchor.set(0.5)
        this.text7.angle = this.coin3.angle
        this.text7.x = this.coin3.x
        this.text7.y = this.coin3.y + 85

        this.text8 = new PIXI.Text('7', textStyle)
        this.text8.anchor.set(0.5)
        this.text8.angle = this.puzzle3.angle
        this.text8.x = this.puzzle3.x - 38
        this.text8.y = this.puzzle3.y + 68

        this.text9 = new PIXI.Text('3', textStyle)
        this.text9.anchor.set(0.5)
        this.text9.angle = this.bingo2.angle
        this.text9.x = this.bingo2.x - 75
        this.text9.y = this.bingo2.y + 40

        this.text10 = new PIXI.Text('500', textStyle)
        this.text10.anchor.set(0.5)
        this.text10.angle = this.coin4.angle
        this.text10.x = this.coin4.x - 82
        this.text10.y = this.coin4.y

        this.text11 = new PIXI.Text('9', textStyle)
        this.text11.anchor.set(0.5)
        this.text11.angle = this.puzzle4.angle
        this.text11.x = this.puzzle4.x - 70
        this.text11.y = this.puzzle4.y - 40

        this.text12 = new PIXI.Text('2', textStyle)
        this.text12.anchor.set(0.5)
        this.text12.angle = this.luckyCoin1.angle
        this.text12.x = this.luckyCoin1.x - 43
        this.text12.y = this.luckyCoin1.y - 75

        this.addChild(this.text1, this.text2, this.text3, this.text4, this.text5, this.text6, this.text7, this.text8, this.text9, this.text10, this.text11, this.text12)

        this.dataNum.push(this.text1, this.text2, this.text3, this.text4, this.text5, this.text6, this.text7, this.text8, this.text9, this.text10, this.text11, this.text12)
    }
}