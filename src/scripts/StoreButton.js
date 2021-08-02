import * as PIXI from 'pixi.js'
import { Tween } from '@tweenjs/tween.js'
import { sprites, app } from './Global'

export class StoreButton extends PIXI.Container
{
    constructor()
    {
        super()
        this.button = sprites.button
        this.button.scale.set(0.5)
        this.button.anchor.set(0.5)

        this.text = new PIXI.Text('PLAY NOW', {
            fontFamily : 'BQ',
            fontSize: 83,
            fill: 0x000000,
            stroke: 0xffffff,
            strokeThickness: 10,
            align: 'center'
        })
        this.text.anchor.set(0.5)
        new Tween(this).to({scale : { x: 1.1, y: 1.1} }, 450).yoyo(true).repeat(Infinity).start(app.game.time)
        this.addChild(this.button, this.text)

        this.interactive = true
        this.buttonMode = true

        this.on('pointerup', ()=>{
            console.log(1)
        })
    } 
}