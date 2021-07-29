import * as PIXI from 'pixi.js'
import { Spin } from './spin'
import { SpinCenter } from './SpinCenter'
// import { sprites } from './Global'


export class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()
        
        // this.button = sprites.button        
        
        // this.rect = sprites.rect
        // this.questionMark = sprites.questionMark

        this.spin = new Spin()
        this.spinCenter = new SpinCenter()

        this.addChild(this.spin)
        this.addChild(this.spinCenter)
    }
    resize(width, height)
    {
        this.spin.resize(width, height)
        this.spinCenter.resize(width, height)
    }
}