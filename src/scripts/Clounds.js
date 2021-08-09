import { Tween } from '@tweenjs/tween.js'
import * as PIXI from 'pixi.js'
import { app, sprites } from './Global'
import { p, PerlinNoise } from './PerlinNoise'
import { ScenePS } from './ScenePS'
export class Clouds extends PIXI.Container
{
    constructor(bg)
    {
        super()
        this.bg = bg
        this.fix = false
        this.sortableChildren = true
        this.cloud()
        this.perlinNoise = new PerlinNoise(p)
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

        /*Доп облака________*/
        this.cloudLeft7 = sprites.cloudLeft7
        this.cloudLeft8 = sprites.cloudLeft8
        this.addChild(this.cloudLeft7)
        this.addChild(this.cloudLeft8)
        this.cloudRight6 = sprites.cloudRight6
        this.cloudRight6.angle = 170
        this.cloudRight6.anchor.set(0, 1)
        this.cloudRight7 = sprites.cloudRight7
        this.cloudRight7.anchor.set(1, 0)
        this.cloudRight8 = sprites.cloudRight8
        this.cloudRight8.angle = 180
        this.addChild(this.cloudRight6)
        this.addChild(this.cloudRight7)
        this.addChild(this.cloudRight8)
        /*__________________*/

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
            this.cloudLeft6,
            this.cloudLeft7,
            this.cloudLeft8
        ]
        this.cloudArrRight = [
            this.cloudRight1,
            this.cloudRight2,
            this.cloudRight3,
            this.cloudRight4,
            this.cloudRight5,
            this.cloudRight6,
            this.cloudRight7,
            this.cloudRight8
        ]
    }
    cloudPosition()
    {
        let ratio;
        if (this.bg.height/this.bg.width > 1)
        {
            ratio = 'vertical'
        }else 
        if (this.bg.width/this.bg.height < 1.1)
        {
            ratio = 'rectangle'
        }else
        {
            ratio = 'horisontal'
        } 
       
        const nH = 250
        if (ratio === 'horisontal')
        {
            this.setScaleAll(1)
            let scale = this.bg.height/(this.cloudLeft1.height + this.cloudLeft5.height + nH) / 1.3
            this.setScaleAll(scale)
        }
        if (ratio === 'rectangle')
        {
            this.setScaleAll(1)
            let scale = this.bg.height/(this.cloudLeft1.height + this.cloudLeft5.height + nH) / 1.1
            this.setScaleAll(scale)
        }
        if (ratio === 'vertical')
        {
            this.setScaleAll(1)
            let scale = this.bg.width/(this.cloudLeft5.width + this.cloudRight5.width) * 1
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
        this.cloudLeft5.x = 0

        this.cloudLeft4.anchor.set(0, 1)
        this.cloudLeft4.y = this.cloudLeft5.y - this.cloudLeft5.height
        this.cloudLeft4.x = 0
        
        this.cloudLeft3.anchor.set(0, 1)
        this.cloudLeft3.y = this.cloudLeft5.y - this.cloudLeft3.height/3
        this.cloudLeft3.x = this.cloudLeft3.width/3

        this.cloudLeft1.x = this.cloudLeft1.width/2
        this.cloudLeft1.y = 0

        this.cloudLeft2.y = this.cloudLeft1.y + this.cloudLeft1.height/10
        this.cloudLeft2.x = 0

        this.cloudLeft6.y = this.cloudLeft2.y + this.cloudLeft2.height - this.cloudLeft6.height/2
        this.cloudLeft6.x = this.cloudLeft6.width * 1.3

        this.cloudLeft7.y = this.cloudLeft2.y + this.cloudLeft2.height/1.1
        this.cloudLeft7.x = -this.cloudLeft7.width/3

        this.cloudLeft8.y = this.cloudLeft3.y - this.cloudLeft3.height - this.cloudLeft8.height/2
        this.cloudLeft8.x = this.cloudLeft8.width*1.3
        
        /*___________________________________Right________________________________________*/
        this.cloudRight5.anchor.set(1, 1)
        this.cloudRight5.x = this.bg.width
        this.cloudRight5.y = this.bg.height

        this.cloudRight4.anchor.set(1, 1)
        this.cloudRight4.x = this.cloudRight5.x
        this.cloudRight4.y = this.cloudRight5.y - this.cloudRight5.height/1.8

        this.cloudRight3.anchor.set(1, 1)
        this.cloudRight3.x = this.cloudRight5.x - this.cloudRight3.width/2.3
        this.cloudRight3.y = this.cloudRight5.y - this.cloudRight3.height/1.9

        this.cloudRight2.anchor.set(1, 0)
        this.cloudRight2.x = this.bg.width
        this.cloudRight2.y = -this.amplitudeY*2

        this.cloudRight1.anchor.set(1, 1)
        this.cloudRight1.x = this.cloudRight5.x + this.cloudRight1.width/4
        this.cloudRight1.y = this.cloudRight5.y - this.cloudRight5.height/1.5

        this.cloudRight6.x = this.cloudRight2.x + this.cloudRight6.width/10
        this.cloudRight6.y = this.cloudRight2.y + this.cloudRight6.height/1.3

        this.cloudRight7.x = this.cloudRight4.x - this.cloudRight7.width
        this.cloudRight7.y = this.cloudRight4.y - this.cloudRight4.height/2 - this.cloudRight7.height/1.5

        this.cloudRight8.x = this.cloudRight2.x - this.cloudRight2.width
        this.cloudRight8.y = this.cloudRight2.y + this.cloudRight2.height/1.2

        this.cloudArrLeft.forEach(element => {
            element.startX = element.x;
            element.startY = element.y;
        });
        this.cloudArrRight.forEach(element => {
            element.startX = element.x;
            element.startY = element.y;
        });
    }
    setScaleAll(scale)
    {
        this.cloudLeft1.scale.set(scale)
        this.cloudLeft2.scale.set(scale)
        this.cloudLeft3.scale.set(scale)
        this.cloudLeft4.scale.set(scale)
        this.cloudLeft5.scale.set(scale)
        this.cloudLeft6.scale.set(scale)
        this.cloudLeft7.scale.set(scale)
        this.cloudLeft8.scale.set(scale)

        this.cloudRight1.scale.set(scale)
        this.cloudRight2.scale.set(scale)
        this.cloudRight3.scale.set(scale)
        this.cloudRight4.scale.set(scale)
        this.cloudRight5.scale.set(scale)
        this.cloudRight6.scale.set(scale)
        this.cloudRight7.scale.set(scale)
        this.cloudRight8.scale.set(scale)
    }
    update(time)
    {
        let i = 0;
        this.cloudArrLeft.forEach(element => {
            element.x = element.startX - this.perlinNoise.noise(i + 0, time / 1000.0 * 0.1, 0) * this.amplitudeX
            element.y = element.startY + this.perlinNoise.noise(i + 1, time / 1000.0 * 0.1, 0) * this.amplitudeY
            i += 4
        })
        this.cloudArrRight.forEach(element => {
            element.x = element.startX + this.perlinNoise.noise(i + 0, time / 1000.0 * 0.1, 0) * this.amplitudeX
            element.y = element.startY + this.perlinNoise.noise(i + 1, time / 1000.0 * 0.1, 0) * this.amplitudeY
            i += 4
        })
    }
    animation(time, delay)
    {
        this.fix = true
        let arr1 = this.cloudArrLeft
        let arr2 = this.cloudArrRight
        for (let i = 0; i < arr1.length; i++)
        {
            new Tween(arr1[i]).to({ scale : { x : arr1[i].scale.x*1.15 ,y : arr1[i].scale.y*1.15 } }, time).delay(delay).start(app.game.time)
            if (i == 0 || i == 1 || i == 5 || i == 6)
            {
                new Tween(arr1[i]).to({ startX : arr1[i].startX - arr1[i].width/3 }, time).delay(delay).start(app.game.time)
                new Tween(arr1[i]).to({ startY : arr1[i].startY - arr1[i].height/3 }, time).delay(delay).start(app.game.time)
            } else
            {
                new Tween(arr1[i]).to({ startX : arr1[i].startX - arr1[i].width/3 }, time).delay(delay).start(app.game.time)
                new Tween(arr1[i]).to({ startY : arr1[i].startY + arr1[i].height/3 }, time).delay(delay).start(app.game.time)
            }
        }
        for (let i = 0; i < arr2.length; i++)
        {
            new Tween(arr2[i]).to({ scale : { x : arr2[i].scale.x*1.15 ,y : arr2[i].scale.y*1.15 } }, time).delay(delay).start(app.game.time)
            if (i == 1 || i == 5)
            {
                new Tween(arr2[i]).to({ startX : arr2[i].startX + arr2[i].width/3 }, time).delay(delay).start(app.game.time)
                new Tween(arr2[i]).to({ startY : arr2[i].startY - arr2[i].height/3 }, time).delay(delay).start(app.game.time)
            } else 
            if (i == 7)
            {
                new Tween(arr2[i]).to({ startY : arr2[i].startY - arr2[i].height/3.5 }, time).delay(delay).start(app.game.time)
            } else
            {
                new Tween(arr2[i]).to({ startX : arr2[i].startX + arr2[i].width/3 }, time).delay(delay).start(app.game.time)
                new Tween(arr2[i]).to({ startY : arr2[i].startY + arr2[i].height/3 }, time).delay(delay).start(app.game.time)
            }
        }
    }
    goToPS(delay)
    {
        this.scenePS = new ScenePS()
        
        this.scenePS.resize(app.game.app.renderer.width, app.game.app.renderer.height)
        this.scenePS.show(delay)
        this.cloudLeft1.zIndex = 0
        this.cloudLeft2.zIndex = 1
        this.cloudLeft3.zIndex = 2
        this.cloudLeft4.zIndex = 3
        this.cloudLeft5.zIndex = 3
        this.cloudLeft6.zIndex = 3

        this.cloudRight1.zIndex = 0
        this.cloudRight2.zIndex = 1
        this.cloudRight3.zIndex = 2
        this.cloudRight4.zIndex = 4
        this.cloudRight5.zIndex = 4

        this.scenePS.zIndex = 3

        this.addChild(this.scenePS)
    }
    resize(width, height)
    {
        this.amplitudeX = width / 8
        this.amplitudeY = height / 19
        this.cloudPosition()
        if (this.scenePS !== undefined) this.scenePS.resize(width, height)

        if (this.fix)
        {
            setTimeout(() => {
                this.cloudPosition()
            }, 310)
            setTimeout(() => {
                this.cloudPosition()
            }, 620)
            setTimeout(() => {
                this.cloudPosition()
            }, 930)
        }
    }
}