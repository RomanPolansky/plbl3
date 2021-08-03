import * as PIXI from 'pixi.js'
import { Tween } from '@tweenjs/tween.js'
import { sprites, app } from './Global'

export class PrizeBar extends PIXI.Container
{
    constructor()
    {
        super()

        this.button = sprites.button        
        
        this.rect1 = sprites.rect1
        this.questionMark1 = sprites.questionMark1
        this.rect2 = sprites.rect2
        this.questionMark2 = sprites.questionMark2
        this.rect3 = sprites.rect3
        this.questionMark3 = sprites.questionMark3

        this.questionMark1.scale.set(1.5)
        this.questionMark2.scale.set(1.5)
        this.questionMark3.scale.set(1.5)

        this.qmPosition()

        this.addChild(this.rect1, this.rect2, this.rect3)
        this.addChild(this.questionMark1, this.questionMark2, this.questionMark3)

        this.anim(this.questionMark1)
        this.anim(this.questionMark2)
        this.anim(this.questionMark3)
    }
  
    anim(item, delay = 0)
    { 
        new Tween(item).to({scale : { x: 1.65, y: 1.65 } }, 450).delay(delay).yoyo(true).repeat(Infinity).start(app.game.time)
    }
    qmPosition()
    {
        this.questionMark1.x = this.rect1.x + 7
        this.questionMark2.x = this.rect2.x + 7
        this.questionMark3.x = this.rect3.x + 7

        this.questionMark1.y = this.rect1.y
        this.questionMark2.y = this.rect2.y
        this.questionMark3.y = this.rect3.y
    }
    resize(width, height, ratio)
    {   
        if (ratio === 'vertical')
        {
            this.rect3.y = 0
            this.rect1.y = 0

            this.rect3.x = this.rect1.width*1.1
            this.rect1.x = -this.rect1.width*1.1

        }
        if (ratio === 'horisontal')
        {
            this.rect3.x = 0
            this.rect1.x = 0

            this.rect3.y = this.rect1.width*1.1
            this.rect1.y = -this.rect1.width*1.1
        }
        this.qmPosition()
    }
}