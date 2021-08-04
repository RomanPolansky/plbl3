import * as PIXI from 'pixi.js'
import { Tween } from '@tweenjs/tween.js'
import { sprites, app } from './Global'

export class PrizeBar extends PIXI.Container
{
    constructor()
    {
        super()

        this.elCont = []
        this.sprites = [ sprites.rect1, sprites.rect2, sprites.rect3 ]
        this.questionMarks = [ sprites.questionMark1, sprites.questionMark2, sprites.questionMark3 ]

        for (let i = 2; i >= 0; i--)
        {
            this.elCont[i] = new PIXI.Container();
            this.addChild(this.elCont[i]);

            this.elCont[i].addChild(this.sprites[i]);
            this.elCont[i].addChild(this.questionMarks[i]);

            this.questionMarks[i].scale.set(1.5)
            this.questionMarks[i].x = this.sprites[i].x + 7
            this.questionMarks[i].y = this.sprites[i].y
            this.anim(this.questionMarks[i])
        }
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
            this.elCont[0].y = 0
            this.elCont[2].y = 0

            this.elCont[0].x = -this.sprites[0].width*1.1
            this.elCont[2].x = this.sprites[2].width*1.1
        }
        if (ratio === 'horisontal')
        {
            this.elCont[0].x = 0
            this.elCont[2].x = 0

            this.elCont[0].y = -this.sprites[0].width*1.1
            this.elCont[2].y = this.sprites[2].width*1.1
        }
    }
}