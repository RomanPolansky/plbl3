import * as PIXI from 'pixi.js'
import TWEEN from '@tweenjs/tween.js'
import { sprites, app, prizes } from './Global'
import { StoreButton } from './StoreButton'
import { myLoader } from './Loader'
import { scaleSound } from './sound'
export class ScenePS extends PIXI.Container
{
    constructor()
    {
        super()

        this.prizeArr =[]
        this.prizeTextArr =[]

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
        if (app.moveCount === 0)
        {
            this.chest = sprites.chest
            this.chest.scale.set(0)
            this.chest.y = -35

            this.chestSpark = sprites.chestSpark
            this.chestSpark.alpha = 0.6
            this.chestSpark.scale.set(0)
            this.chestSpark.x = this.chest.x
            this.chestSpark.y = this.chest.y

            this.light = sprites.light
            this.light.alpha = 0
            this.light.scale.set(0)
            this.light.y = -20
            this.light.x = 0

            new TWEEN.Tween(this.chestSpark).to({ angle : 360 }, 3000).repeat(Infinity).start(app.game.time)
            new TWEEN.Tween(this.chestSpark).to({ scale : { x : 1.7, y : 1.7 } }, 200).start(app.game.time)
            new TWEEN.Tween(this.chest).to({ scale : { x : 0.4, y : 0.4 } }, 450).delay(30).easing(TWEEN.Easing.Back.Out).start(app.game.time)
            new TWEEN.Tween(this.light).to({
                scale : { x : 0.6, y : 0.6 },
                x : this.chest.x + 33,
                y : this.chest.y - 80,
                alpha : 0.6
            }, 450).delay(30).easing(TWEEN.Easing.Back.Out).start(app.game.time).onComplete(()=>{
                new TWEEN.Tween(this.light).to({ scale : { x : this.light.scale.x*1.1, y: this.light.scale.y*1.1 }, alpha : 1 }, 800).yoyo(true).repeat(Infinity).start(app.game.time)
                new TWEEN.Tween(this.chestSpark).to({ scale : { x : this.chestSpark.scale.x*1.1, y: this.chestSpark.scale.y*1.1 }, alpha : 1 }, 800).yoyo(true).repeat(Infinity).start(app.game.time)
                this.particle()
            })

            this.container.addChild(this.chestSpark, this.chest, this.light)
        }
        if (app.moveCount >= 1) 
        {
            this.prize1 = sprites.winCoin
            this.prizeText1 = new PIXI.Text(0, this.textStyle)
            this.prizeArr.push(this.prize1)
            this.prizeTextArr.push(this.prizeText1)
        }
        if (app.moveCount >= 2) 
        {
            this.prize2 = sprites.winPuzzle
            this.prizeText2 = new PIXI.Text(0, this.textStyle)
            this.prizeArr.push(this.prize2)
            this.prizeTextArr.push(this.prizeText2)
        }
        if (app.moveCount === 3) 
        {
            this.prize3 = prizes.luckyCoin > prizes.bingo ? sprites.winLuckyCoin : sprites.winBingo
            this.prizeText3 = new PIXI.Text(0, this.textStyle)
            this.prizeArr.push(this.prize3)
            this.prizeTextArr.push(this.prizeText3)
        }
        let step = this.packshotBlock.width/(this.prizeArr.length + 1)
        for (let i = 0; i < this.prizeArr.length; i++)
        {
            this.prizeArr[i].scale.set(1)
            this.prizeArr[i].x = -this.packshotBlock.width/2 + step*(i+1)
            this.prizeArr[i].y = this.packshotBlock.y - this.packshotBlock.height/2 + this.logo.height/2 + this.prizeArr[i].height/2
            if (i !== 1) this.prizeArr[i].y += 30

            this.prizeTextArr[i].anchor.set(0.5)
            this.prizeTextArr[i].x = this.prizeArr[i].x
            if (i === 0) { this.prizeTextArr[i].y = this.prizeArr[i].y + 100 }
            else { this.prizeTextArr[i].y = this.prizeTextArr[i-1].y }
            
            this.prizeArr[i].scale.set(0)
            this.prizeTextArr[i].scale.set(0)
            this.container.addChild(this.prizeArr[i], this.prizeTextArr[i])
        }
    }
    particle()
    {
        app.game.app.ticker.add(()=>{
            let star = new PIXI.Sprite(myLoader.resources['game'].textures['chestStar'])
            star.anchor.set(0.5)
            star.scale.set(0.25)

            let sqrtRho = Math.sqrt(Math.random());
            let angle = Math.random() * Math.PI * 2.0;

            star.x = 15 + (sqrtRho * Math.cos(angle)) * 120 / 2.0;
            star.y = -55 + (sqrtRho * Math.sin(angle)) * 45 / 2.0;

            let xPos = star.x > 0 ? star.x+250*Math.random() : star.x-250*Math.random()
            let yPos = -400

            new TWEEN.Tween(star).to({ alpha : 0 }, 100).delay(300).start(app.game.time)
            new TWEEN.Tween(star).to({ scale : { x : 0.3, y: 0.3 }, x : xPos, y : yPos }, 900).start(app.game.time).onComplete(()=>{
                star.destroy()
            })
            this.container.addChild(star)
        })
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
        if (app.moveCount >= 1) {
            new TWEEN.Tween(this.prize1).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
            new TWEEN.Tween(this.prizeText1).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time).onComplete(()=>{
                if (app.moveCount >= 2) {
                    new TWEEN.Tween(this.prize2).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
                    new TWEEN.Tween(this.prizeText2).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time).onComplete(()=>{
                        if (app.moveCount === 3)
                        {
                            new TWEEN.Tween(this.prize3).to({ scale : { x : 1, y: 1 } }, 300).easing(getBackOut(3)).start(app.game.time)
                            new TWEEN.Tween(this.prizeText3).to({ scale : { x : 1, y: 1 } }, 200).start(app.game.time)
                            new TWEEN.Tween(tObj).to({ value3 : prizeObj.value3 }, 1000).start(app.game.time).onUpdate(()=>{
                                this.prizeText3.text = Math.round(tObj.value3)
                            }).onComplete(()=>{
                                new TWEEN.Tween(this.prize3).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
                                scaleSound.play()
                            })
                        }
                    })
                    new TWEEN.Tween(tObj).to({ value2 : prizeObj.value2 }, 1000).start(app.game.time).onUpdate(()=>{
                        this.prizeText2.text = Math.round(tObj.value2)
                    }).onComplete(()=>{
                        new TWEEN.Tween(this.prize2).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
                        scaleSound.play()
                    })
                }
            })
            new TWEEN.Tween(tObj).to({ value1 : prizeObj.value1 }, 1000).start(app.game.time).onUpdate(()=>{
                this.prizeText1.text = Math.round(tObj.value1)
            }).onComplete(()=>{
                new TWEEN.Tween(this.prize1).to({ scale : { x : 1.2, y: 1.2 } }, 200).yoyo(true).repeat(1).start(app.game.time)
                scaleSound.play()
            })
        }
    }
    resize(width, height)
    {
        this.x = width/2
        this.y = height/2

        this.scale.set(1)
        let scaleW = width/(this.packshotBlock.width/this.packshotBlock.scale.x * 1.3)
        let scaleH = height/(this.packshotBlock.height/this.packshotBlock.scale.x * 1.4)
        this.scale.set(scaleW < scaleH  ? scaleW : scaleH)
    }
}