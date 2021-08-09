import * as PIXI from 'pixi.js'
import { Spin } from './spin'
import { SpinCenter } from './SpinCenter'
import { PrizeBar } from './PrizeBar'
import { PrizeItem } from './PrizeItem'
import { StoreButton } from './StoreButton'
import { sprites, app, prizes } from './Global'
import { Tween } from '@tweenjs/tween.js'
import { myLoader } from './Loader'
export class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()
        this.sortableChildren = true

        this.fadeRect = new PIXI.Graphics()
        this.fadeRect.zIndex = 3
        this.fadeRect.beginFill(0)
        this.fadeRect.drawRect(0, 0, 120, 120)
        this.fadeRect.pivot.set(60, 60)
        this.fadeRect.scale.set(25, 15)
        this.fadeRect.alpha = 0

        this.arrow = sprites.arrow
        this.arrow.zIndex = 2
        this.arrow.scale.set(0.2)
        this.arrow.anchor.set(0.5)
        this.spin = new Spin()
        this.spinCenter = new SpinCenter()
        this.prizeBar = new PrizeBar()
        this.storeButton = new StoreButton(sprites.button1)
        this.storeButton.animation()

        this.hand = sprites.hand
        this.hand.alpha = 0
        this.hand.scale.set(0.8)
        
        this.addChild(this.spin, this.spinCenter, this.prizeBar, this.arrow)
        this.addChild(this.storeButton, this.hand, this.fadeRect)

        app.eventer.on('wheelStop', () =>{
            let tElem = this.spin.data[0]
            this.spin.data.forEach(element => {
                if (tElem.toGlobal({ x: 0, y: 0}).y > element.toGlobal({ x: 0, y: 0}).y)
                {
                    tElem = element
                }
            })
            let tElemNum = this.spin.dataNum[0]
            this.spin.dataNum.forEach(element => {
                if (tElemNum.toGlobal({ x: 0, y: 0}).y > element.toGlobal({ x: 0, y: 0}).y)
                {
                    tElemNum = element
                }
            })
            
            if (tElem.type === 'coin') prizes.coin += parseInt(tElemNum.text)
            if (tElem.type === 'puzzle') prizes.puzzle += parseInt(tElemNum.text)
            if (tElem.type === 'luckyCoin') prizes.luckyCoin += parseInt(tElemNum.text)
            if (tElem.type === 'bingo') prizes.bingo += parseInt(tElemNum.text)

            this.showPrize(tElem.type, tElemNum.text)
        })
        app.eventer.on('wheelStart', () =>{
            this.particle()
        })

        setTimeout(() => {
            this.showHand(600)
        }, 100);
    }
    particle()
    {
        for (let i = 0; i < 35; i++)
        {
            let delay = 70

            this.ball = new PIXI.Sprite(myLoader.resources['game'].textures['ball'])
            this.ball.zIndex = 1
            this.ball.anchor.set(0.5)
            this.ball.scale.set(0.15)
            this.ball.x = this.arrow.x
            this.ball.y = this.arrow.y + this.arrow.height/2 - this.ball.height
            this.addChild(this.ball)

            let vectorY = 1
            if (Math.random() > 0.44) vectorY = -1
            let xPos = (140 + 80*Math.random()) * -1 
            let yPos = (60*Math.random()) * (0.1 + Math.random()) * vectorY

            new Tween(this.ball).to({ scale:{x:0.35 - (i/250),y:0.35 - (i/250)} }, 50).delay(delay*i + 15*i).start(app.game.time)
            new Tween(this.ball).to({ x : this.ball.x + xPos, y : this.ball.y + yPos}, 450).delay(delay*i + 15*i).start(app.game.time)
            new Tween(this.ball).to({ alpha : 0 }, 350-(i*1.5)).delay(delay*i + 15*i + 150-(i*1.5)).start(app.game.time)
        }
    }
    unShow(delay = 0)
    {
        new Tween(this).to({ scale : { x : this.scale.x*3, y: this.scale.y*3 }, alpha : 0 }, 300).delay(delay).start(app.game.time)
    }
    resize(width, height)
    {
        this.x = width/2
        this.y = height/2

        let ratio = width >= height ? 'horisontal' : 'vertical'

        this.prizeBar.resize(width, height, ratio)

        if (ratio === 'horisontal')
        {
            let scale = height/(this.spin.height + this.storeButton.height + this.storeButton.height)
            this.scale.set(scale)
        } 
        if (ratio === 'vertical')
        {
            let scale1 = width/(this.spin.width + this.spin.width*0.1)
            let scale2 = height/(this.spin.height + this.prizeBar.height + this.storeButton.height + this.storeButton.height)
            let scale
            if (scale1 > scale2)
            {
                scale = scale2
            } else 
            {
                scale = scale1
            }
            this.scale.set(scale)
        }

        if (ratio === 'vertical')
        {
            this.spin.x = 0
            this.spin.y = - this.prizeBar.height/2 - this.storeButton.height/2
            this.spinCenter.x = 0
            this.spinCenter.y = this.spin.y
            this.prizeBar.y = this.spin.y + this.spin.height/2 + this.prizeBar.height/2
            this.prizeBar.x = 0
            this.storeButton.y = this.prizeBar.y + this.prizeBar.height/2 + this.storeButton.height/1.4
            this.storeButton.x = 0
        }
        if (ratio === 'horisontal')
        {
            this.spin.y = -this.storeButton.height/2
            this.spin.x = -this.prizeBar.width/2
            this.spinCenter.y = this.spin.y
            this.spinCenter.x = this.spin.x
            this.prizeBar.y = this.spin.y
            this.prizeBar.x = this.spin.x + this.spin.width/2 + this.prizeBar.width/2
            this.storeButton.x = this.spin.x
            this.storeButton.y = this.spin.y + this.spin.height/2 + this.storeButton.height/2
        }
        this.arrow.x = this.spin.x
        this.arrow.y = this.spin.y - this.spin.height/2 + this.arrow.height/10
    }
    fade()
    {
        new Tween(this.fadeRect).to({ alpha : 0.8 }, 300).start(app.game.time).onComplete(()=>{
            new Tween(this.fadeRect).to({ alpha : 0 }, 300).delay(700).start(app.game.time)
        })
    }
    showPrize(type, num)
    {
        this.fade()
        let prizeItem = new PrizeItem(type, num, this.prizeBar)
        prizeItem.zIndex = 3
        this.addChild(prizeItem)
    }
    showHand(delay)
    {
        this.hand.x = this.spinCenter.x + this.hand.width*0.7
        this.hand.y = this.spinCenter.y - this.hand.height*1.5

        let xPos = this.spinCenter.x
        let yPos = this.spinCenter.y

        app.eventer.on('wheelStart', ()=>{
            this.hand.alpha = 0
        })

        new Tween(this.hand).to({ alpha : 1 }, 100).delay(delay).start(app.game.time)
        new Tween(this.hand).to({ x : xPos, y : yPos }, 300).delay(delay).start(app.game.time).onComplete(()=>{
            new Tween(this.hand).to({ x : xPos + 50, y : yPos - 50}, 260).yoyo(true).repeat(2).start(app.game.time).onComplete(()=>{
                new Tween(this.hand).to({ alpha : 0 }, 200).start(app.game.time)
            })
        })
    }
}