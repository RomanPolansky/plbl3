import * as PIXI from 'pixi.js'

export class SceneMain extends PIXI.Container
{
    constructor()
    {
        super()

        this.wheel = sprites.wheel
        this.spinCircle = sprites.spinCircle
        this.circleBar = sprites.circleBar
        this.playBtn = sprites.playBtn 
        this.coin = sprites.coin
        this.bingo = sprites.bingo
        this.luckyCoin = sprites.luckyCoin
        this.puzzle = sprites.puzzle
        

        this.button = sprites.button        
        
        this.rect = sprites.rect
        this.questionMark = sprites.questionMark
    }
}