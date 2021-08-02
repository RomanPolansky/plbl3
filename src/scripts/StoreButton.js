import * as PIXI from 'pixi.js'
import { Tween } from '@tweenjs/tween.js'
import { sprites } from './Global'

export class StoreButton extends PIXI.Container
{
    constructor()
    {
        super()
        this.button = sprites.button
        this.button.scale.set(0.5)
        this.button.anchor.set(0.5)

        this.addChild(this.button)
    }
}