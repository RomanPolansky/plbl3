import * as PIXI from 'pixi.js'
import { sprites, app, prizes } from './Global'
import TWEEN from '@tweenjs/tween.js'

export class PrizeItem extends PIXI.Container
{
    constructor(type, num)
    {
        super()

        if (type === 'coin') this.sprite = sprites.winCoin
        if (type === 'puzzle') this.sprite = sprites.winPuzzle
        if (type === 'luckyCoin') this.sprite = sprites.winLuckyCoin
        if (type === 'bingo') this.sprite = sprites.winBingo

        this.spark = sprites.spark

        this.text = new PIXI.Text('150', {
            fontFamily : 'BQ',
            fontSize: 120,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 12,
            align: 'center'
        })
        this.text.anchor.set(0.5)

        this.sprite.y -= this.text.height/1.9
        this.text.y += this.text.height/1.9
        this.spark.y = this.sprite.y

        this.sprite.scale.set(0)
        this.spark.scale.set(0)
        this.spark.alpha = 0
        this.text.scale.set(0)
        new TWEEN.Tween(this.spark).to({ angle : 360 }, 4000).repeat(Infinity).start(app.game.time)
        new TWEEN.Tween(this.spark).to({scale : { x : 1.5, y : 1.5 }, alpha : 0.5  }, 350).easing(TWEEN.Easing.Back.Out).start(app.game.time)
        new TWEEN.Tween(this.sprite).to({scale : { x : 1.65, y : 1.65 } }, 1000).easing(TWEEN.Easing.Back.Out).start(app.game.time)
        new TWEEN.Tween(this.text).to({scale : { x : 1, y : 1 } }, 1000).delay(150).easing(TWEEN.Easing.Back.Out).start(app.game.time)

        // let num = { value: 0 }
        // new TWEEN.Tween(num).to({ value : 100 }, 500).delay(300).start(app.game.time).onUpdate(() => {
        //     text.text = Math.round(num.value)
        // })

        this.addChild(this.spark, this.sprite, this.text)
    }
    moveTo(xPos, yPos)
    {
        new TWEEN.Tween(this).to({x : xPos, y : yPos}, 250).delay(1100).start(app.game.time)
    }
}