import * as PIXI from 'pixi.js'
import { Spin } from './spin'
import { SpinCenter } from './SpinCenter'
import { PrizeBar } from './PrizeBar'
import { StoreButton } from './StoreButton'

export class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()

        this.spin = new Spin()
        this.spinCenter = new SpinCenter()
        this.prizeBar = new PrizeBar()
        this.storeButton = new StoreButton()

        this.addChild(this.spin, this.spinCenter, this.prizeBar)
        this.addChild(this.storeButton)

    }
    gameRatioPosition(ratio)
    {
    }
    resize(width, height)
    {
        console.log(this.x)
        this.spin.resize(width, height)
        this.spinCenter.resize(width, height)
        this.prizeBar.resize(width, height)
        this.storeButton.resize(width, height)

        let ratio = width > height ? 'horisontal' : 'vertical'

        if (ratio === 'vertical')
        {
            this.spin.x = 0
            this.spin.y = -this.spin.height/2 - this.prizeBar.height/2
            this.spinCenter.x = this.spin.x
            this.spinCenter.y = this.spin.y
            this.prizeBar.y = this.spin.y + this.spin.height/2 + this.prizeBar.height/2
            this.prizeBar.x = this.spin.x
        }
        if (ratio === 'horisontal')
        {
            this.spin.y = height/2 - this.storeButton.height
            this.spin.x = width/2 - this.prizeBar.width/2
            this.spinCenter.y = this.spin.y
            this.spinCenter.x = this.spin.x
            this.prizeBar.y = this.spin.y
            this.prizeBar.x = this.spin.x + this.spin.width/2 + this.prizeBar.width/2
        }
        
        if (ratio === 'horisontal')
        {
            
        }
        if (ratio === 'vertical')
        {
            
        }
        this.storeButton.y = height - this.storeButton.height/1.5
    }
}