import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import { sprites, app, prizes } from './Global'
import { StoreButton } from './StoreButton'

export class ScenePS extends PIXI.Container
{
    constructor()
    {
        super()
        this.container = new PIXI.Container()
        this.packshotBlock = sprites.packshotBlock
        this.logo = sprites.logo
        this.packshotBlock.y = this.logo.height/4
        this.logo.y = this.packshotBlock.y - this.packshotBlock.height/2
        
        this.storeButton = new StoreButton(sprites.button2)
        this.storeButton.scale.set(0.85)
        this.storeButton.y = this.packshotBlock.y + this.packshotBlock.height/2 - this.storeButton.height
        this.storeButton.animation()

        this.text = new PIXI.Text('Collect your rewards\nin the game', {
            fontFamily : 'BQ',
            fontSize: 50,
            fill: 0xffffff,
            stroke: 0x0066cf,
            strokeThickness: 4.7,
            align: 'center'
        })
        this.text.anchor.set(0.5)
        this.text.y = this.packshotBlock.y + this.text.height*0.6

        this.textStyle =  {
            fontFamily : 'BQ',
            fontSize: 50,
            fill: 0xffffff,
            stroke: 0x0066cf,
            strokeThickness: 9,
            align: 'center'
        }

        this.container.addChild(this.packshotBlock, this.logo, this.text, this.storeButton)

        this.addChild(this.container)
        this.container.scale.set(0.15)
    }
    initPrize()
    {
        this.prize1 = sprites.winCoin
        this.prize2 = sprites.winPuzzle
        this.prize3 = prizes.luckyCoin > prizes.bingo ? sprites.winLuckyCoin : sprites.winBingo
        this.prize1.scale.set(1)
        this.prize2.scale.set(1)
        this.prize3.scale.set(1)

        this.prize2.y = this.packshotBlock.y - this.packshotBlock.height/2 + this.logo.height/2 + this.prize2.height/2
        this.prize1.y = this.prize3.y = this.prize2.y + 12
        this.prize1.x = -this.prize2.width*1.3
        this.prize3.x = this.prize2.width*1.3

        this.prizeText1 = new PIXI.Text(0, this.textStyle)
        this.prizeText1.anchor.set(0.5)
        this.prizeText2 = new PIXI.Text(prizes.puzzle, this.textStyle)
        this.prizeText2.anchor.set(0.5)
        this.prizeText3 = new PIXI.Text(prizes.bingo, this.textStyle)
        this.prizeText3.anchor.set(0.5)

        this.prizeText1.x = this.prize1.x
        this.prizeText2.x = this.prize2.x
        this.prizeText3.x = this.prize3.x

        this.prizeText1.y = this.prizeText2.y = this.prizeText3.y = this.prize2.y + this.prize2.height/1.4

        this.prize1.scale.set(0)
        this.prize2.scale.set(0)
        this.prize3.scale.set(0)
        this.prizeText1.scale.set(0)
        this.prizeText2.scale.set(0)
        this.prizeText3.scale.set(0)

        this.container.addChild(this.prizeText1, this.prizeText2, this.prizeText3, this.prize1, this.prize2, this.prize3)
    }
    show(delay = 0)
    {
        new TWEEN.Tween(this.container).to({ scale : { x : 1, y: 1 } }, 1100).delay(delay).easing(TWEEN.Easing.Back.Out).start(app.game.time).onComplete(()=>{
            this.prizeCount()
        })
    }
    prizeCount()
    {
        this.initPrize()

        let prizeObj = {
            value1 : prizes.coin,
            value2 : prizes.puzzle,
            value3 : prizes.luckyCoin > prizes.bingo ? prizes.luckyCoin : prizes.bingo,
        }
        let tObj = {
            value1 : 0,
            value2 : 0,
            value3 : 0
        }
        let getBackOut = (s) => {
            return function(t) {
                return --t * t * ((s + 1) * t + s) + 1
            }
        }
        new TWEEN.Tween(this.prize1).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
        new TWEEN.Tween(this.prizeText1).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time).onComplete(()=>{
            new TWEEN.Tween(this.prize2).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
            new TWEEN.Tween(this.prizeText2).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time).onComplete(()=>{
                new TWEEN.Tween(this.prize3).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
                new TWEEN.Tween(this.prizeText3).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time)
                new TWEEN.Tween(tObj).to({ value3 : prizeObj.value3 }, 1000).start(app.game.time).onUpdate(()=>{
                    this.prizeText3.text = Math.round(tObj.value3)
                }).onComplete(()=>{
                    new TWEEN.Tween(this.prize3).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
                })
            })
            new TWEEN.Tween(tObj).to({ value2 : prizeObj.value2 }, 1000).start(app.game.time).onUpdate(()=>{
                this.prizeText2.text = Math.round(tObj.value2)
            }).onComplete(()=>{
                new TWEEN.Tween(this.prize2).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
            })
        })
        new TWEEN.Tween(tObj).to({ value1 : prizeObj.value1 }, 1000).start(app.game.time).onUpdate(()=>{
            this.prizeText1.text = Math.round(tObj.value1)
        }).onComplete(()=>{
            new TWEEN.Tween(this.prize1).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
        })
    }
    resize(width, height)
    {
        this.x = width/2
        this.y = height/2

        this.scale.set(1)
        let scaleW = width/(this.width/this.container.scale.x * 1.4)
        let scaleH = height/(this.height/this.container.scale.x * 1.1)
        this.scale.set(scaleW < scaleH  ? scaleW : scaleH)
    }
}