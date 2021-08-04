import * as PIXI from 'pixi.js'
import { Spin } from './spin'
import { SpinCenter } from './SpinCenter'
import { PrizeBar } from './PrizeBar'
import { PrizeItem } from './PrizeItem'
import { StoreButton } from './StoreButton'
import { sprites, app, prizes } from './Global'
export class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()

        this.arrow = sprites.arrow
        this.arrow.scale.set(0.2)
        this.arrow.anchor.set(0.5)
        this.spin = new Spin()
        this.spinCenter = new SpinCenter()
        this.prizeBar = new PrizeBar()
        this.storeButton = new StoreButton()

        this.addChild(this.spin, this.spinCenter, this.prizeBar, this.arrow)
        this.addChild(this.storeButton)

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
            console.log(prizes)
        })
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
    showPrize(type, num)
    {
        let prizeItem = new PrizeItem(type, num, this.prizeBar)
        this.addChild(prizeItem)
    }
}