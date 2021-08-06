import * as PIXI from 'pixi.js'
import { sprites } from './Global'
export class BackGround extends PIXI.Container
{
    constructor()
    {
        super()

        this.bg = sprites.bg
        this.addChild(this.bg)
    }
    resize(width, height)
    {
        this.bg.width = width
        this.bg.height = height
    }
}