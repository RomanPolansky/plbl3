import * as PIXI from 'pixi.js'
import { sprites, app, prizes } from './Global'
import TWEEN from '@tweenjs/tween.js'

export class PrizeItem extends PIXI.Container
{
    constructor(type, num, bar)
    {
        super()

        this.bar = bar
        this.prizeArr = []

        if (type === 'coin') this.sprite = sprites.winCoin
        if (type === 'puzzle') this.sprite = sprites.winPuzzle
        if (type === 'luckyCoin') this.sprite = sprites.winLuckyCoin
        if (type === 'bingo') this.sprite = sprites.winBingo

        this.spark = sprites.spark

        this.text = new PIXI.Text(num, {
            fontFamily : 'BQ',
            fontSize: 110,
            fill: 0xffffff,
            stroke: 0x000000,
            strokeThickness: 10,
            align: 'center'
        })
        this.text.anchor.set(0.5)

        this.text.y = this.text.height*1.18
        this.spark.y = this.sprite.y

        this.sprite.scale.set(0)
        this.spark.scale.set(0)
        this.spark.alpha = 0
        this.spark.angle = 0
        this.text.scale.set(0)

        this.spriteScale = 1.9
        if (type === 'puzzle') this.spriteScale /= 1.3

        new TWEEN.Tween(this.spark).to({ angle : 360 }, 4000).repeat(Infinity).start(app.game.time)
        new TWEEN.Tween(this.spark).to({scale : { x : 2.5, y : 2.5 }, alpha : 1 }, 350).easing(TWEEN.Easing.Back.Out).start(app.game.time)
        new TWEEN.Tween(this.sprite).to({scale : { x : this.spriteScale, y : this.spriteScale } }, 1000).easing(TWEEN.Easing.Back.Out).start(app.game.time)
        new TWEEN.Tween(this.text).to({scale : { x : 1, y : 1 } }, 1000).delay(150).easing(TWEEN.Easing.Back.Out).start(app.game.time).onComplete(()=>{
            new TWEEN.Tween(this.spark).to({ scale : { x : 0, y : 0 }, alpha : 0 }, 350).start(app.game.time)
            new TWEEN.Tween(this.text).to({ scale : { x : 0, y : 0 }, alpha : 0 }, 350).delay(50).start(app.game.time).onComplete(()=>{
                this.moveToBar()
            })
        })
        this.addChild(this.spark, this.sprite, this.text)
    }
    moveToBar()
    {
        app.moveCount++
        let targetElCont = this.bar.elCont[app.moveCount-1];
        let position = this.toGlobal(new PIXI.Point(0, 0));
        targetElCont.addChild(this);
        position = targetElCont.toLocal(position);
        this.x = position.x;
        this.y = position.y;
        new TWEEN.Tween(this).to({ x : 0, y : 0 }, 200).easing(TWEEN.Easing.Quadratic.Out).start(app.game.time)
        new TWEEN.Tween(this).to({ scale : { x : 0.65, y : 0.65 } }, 300).easing(TWEEN.Easing.Back.Out).start(app.game.time)

        new TWEEN.Tween(targetElCont.children[1]).to({ alpha : 0 }, 200).start(app.game.time)
        app.eventer.emit('gotPrize')
    }
}