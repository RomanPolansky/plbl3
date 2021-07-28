import * as PIXI from 'pixi.js'
import { sprites } from './Global'

export class BackGround extends PIXI.Container
{
    constructor()
    {
        super()

        this.bg = sprites.bg
        this.addChild(this.bg)

        this.cloud()
    }
    cloud()
    {
        this.cloudLeft1 = sprites.cloudLeft1
        this.cloudLeft2 = sprites.cloudLeft2
        this.cloudLeft3 = sprites.cloudLeft3
        this.cloudLeft4 = sprites.cloudLeft4
        this.cloudLeft5 = sprites.cloudLeft5
        this.cloudLeft6 = sprites.cloudLeft6

        this.cloudRight1 = sprites.cloudRight1
        this.cloudRight2 = sprites.cloudRight2
        this.cloudRight3 = sprites.cloudRight3
        this.cloudRight4 = sprites.cloudRight4
        this.cloudRight5 = sprites.cloudRight5
        
        this.addChild(this.cloudLeft1)
        this.addChild(this.cloudLeft2)
        this.addChild(this.cloudLeft3)
        this.addChild(this.cloudLeft4)
        this.addChild(this.cloudLeft5)
        this.addChild(this.cloudLeft6)

        this.addChild(this.cloudRight1)
        this.addChild(this.cloudRight2)
        this.addChild(this.cloudRight3)
        this.addChild(this.cloudRight4)
        this.addChild(this.cloudRight5)

        this.cloudArrLeft = [
            this.cloudLeft1,
            this.cloudLeft2,
            this.cloudLeft3,
            this.cloudLeft4,
            this.cloudLeft5,
            this.cloudLeft6
        ]
        this.cloudArrRight = [
            this.cloudRight1,
            this.cloudRight2,
            this.cloudRight3,
            this.cloudRight4,
            this.cloudRight5
        ]
    }
    cloudPosition()
    {
        let isVertical; this.bg.height>this.bg.width ? isVertical=true : isVertical=false
       
        const nH = 250
        if (!isVertical)
        {
            this.setScaleAll(1)
            let scale = this.bg.height/(this.cloudLeft1.height + this.cloudLeft5.height + nH) / 1.2
            this.setScaleAll(scale)
        }
        if (isVertical)
        {
            this.setScaleAll(1)
            let scale = this.bg.width/(this.cloudLeft5.width + this.cloudRight5.width) * 1.1
            this.setScaleAll(scale)
        }
        if (this.bg.width - this.bg.height < this.bg.width/7)
        {
            this.setScaleAll(1)
            let scale = this.bg.width/(this.cloudLeft5.width + this.cloudRight5.width)
            this.setScaleAll(scale)
        }
        /*___________________________________Left_________________________________________*/
        this.cloudLeft5.anchor.set(0, 1)
        this.cloudLeft5.y = this.bg.height

        this.cloudLeft4.anchor.set(0, 1)
        this.cloudLeft4.y = this.cloudLeft5.y - this.cloudLeft5.height
        
        this.cloudLeft3.anchor.set(0, 1)
        this.cloudLeft3.y = this.cloudLeft5.y - this.cloudLeft3.height/3
        this.cloudLeft3.x = this.cloudLeft3.width/3

        this.cloudLeft1.x = this.cloudLeft1.width/2

        this.cloudLeft2.y = this.cloudLeft1.y + this.cloudLeft1.height/10

        this.cloudLeft6.y = this.cloudLeft2.y + this.cloudLeft2.height - this.cloudLeft6.height/2
        this.cloudLeft6.x = this.cloudLeft6.width * 1.3
        
        /*___________________________________Right________________________________________*/
        this.cloudRight5.anchor.set(1, 1)
        this.cloudRight5.x = this.bg.width
        this.cloudRight5.y = this.bg.height

        this.cloudRight4.anchor.set(1, 1)
        this.cloudRight4.x = this.cloudRight5.x
        this.cloudRight4.y = this.cloudRight5.y - this.cloudRight5.height/2

        this.cloudRight3.anchor.set(1, 1)
        this.cloudRight3.x = this.cloudRight5.x - this.cloudRight3.width/2.3
        this.cloudRight3.y = this.cloudRight5.y - this.cloudRight3.height/2

        this.cloudRight2.anchor.set(1, 0)
        this.cloudRight2.x = this.bg.width

        this.cloudRight1.anchor.set(1, 1)
        this.cloudRight1.x = this.cloudRight5.x
        this.cloudRight1.y = this.cloudRight5.y - this.cloudRight5.height/2
    }
    setScaleAll(scale)
    {
        this.cloudLeft1.scale.set(scale)
        this.cloudLeft2.scale.set(scale)
        this.cloudLeft3.scale.set(scale)
        this.cloudLeft4.scale.set(scale)
        this.cloudLeft5.scale.set(scale)
        this.cloudLeft6.scale.set(scale)

        this.cloudRight1.scale.set(scale)
        this.cloudRight2.scale.set(scale)
        this.cloudRight3.scale.set(scale)
        this.cloudRight4.scale.set(scale)
        this.cloudRight5.scale.set(scale)
    }
    startAnim()
    {
        this.cloudArrLeft.forEach(element => {})
        this.cloudArrRight.forEach(element => {})
    }
    resize(width, height)
    {
        this.bg.width = width
        this.bg.height = height

        this.cloudPosition()
    }
}