import * as PIXI from 'pixi.js'
import { Tween } from '@tweenjs/tween.js'
import { app } from './Global'

export class StoreButton extends PIXI.Container
{
    constructor(sprite)
    {
        super()
        this.button = sprite
        this.button.anchor.set(0.5)      
        this.text = new PIXI.Text('PLAY NOW', {
            fontFamily : 'BQ',
            fontSize: 70,
            fill: 0xffffff,
            stroke: 0x36930b,
            strokeThickness: 10,
            align: 'center'
        })
        this.text.anchor.set(0.5)
        
        this.addChild(this.button, this.text)

        this.interactive = true
        this.buttonMode = true

        this.on('pointerup', ()=>{
            console.log('скачать')
        })
    }
    animation()
    {
        new Tween(this).to({scale : { x: this.scale.x*1.1, y: this.scale.y*1.1} }, 450).yoyo(true).repeat(Infinity).start(app.game.time)
    }
}