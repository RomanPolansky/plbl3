import * as PIXI from 'pixi.js'
import { cloudSS, cloudJSON, gameSS, gameJSON, bg } from './spriteData'
import { sprites } from './Global'

export function loaderAdd() {
    const baseTextureBG = new PIXI.BaseTexture(cloudSS)
    const spritesheetBG = new PIXI.Spritesheet(baseTextureBG, cloudJSON)

    const baseTextureGP = new PIXI.BaseTexture(gameSS)
    const spritesheetGP = new PIXI.Spritesheet(baseTextureGP, gameJSON)
    const bgTexture = new PIXI.BaseTexture(bg)

    const myLoader = PIXI.Loader.shared
 
    myLoader.resources['cloud'] = spritesheetBG
    myLoader.resources['game'] = spritesheetGP
    myLoader.resources['bg'] = {texture: bgTexture}
    
    spritesheetBG.parse(() => { })
    spritesheetGP.parse(() => { })

    myLoader.load((loader, resources) => {
        sprites.bg = new PIXI.Sprite(new PIXI.Texture(resources['bg'].texture))

        sprites.cloudLeft1   = new PIXI.Sprite(resources['cloud'].textures['left_1'])
        sprites.cloudLeft2   = new PIXI.Sprite(resources['cloud'].textures['left_2'])
        sprites.cloudLeft3   = new PIXI.Sprite(resources['cloud'].textures['left_3'])
        sprites.cloudLeft4   = new PIXI.Sprite(resources['cloud'].textures['left_4'])
        sprites.cloudLeft5   = new PIXI.Sprite(resources['cloud'].textures['left_5'])
        sprites.cloudLeft6   = new PIXI.Sprite(resources['cloud'].textures['left_6'])
        sprites.cloudRight1  = new PIXI.Sprite(resources['cloud'].textures['right_1'])
        sprites.cloudRight2  = new PIXI.Sprite(resources['cloud'].textures['right_2'])
        sprites.cloudRight3  = new PIXI.Sprite(resources['cloud'].textures['right_3'])
        sprites.cloudRight4  = new PIXI.Sprite(resources['cloud'].textures['right_4'])
        sprites.cloudRight5  = new PIXI.Sprite(resources['cloud'].textures['right_5'])

        sprites.bingo        = new PIXI.Sprite(resources['game'].textures['bingo'])
        sprites.button       = new PIXI.Sprite(resources['game'].textures['button'])
        sprites.circleBar    = new PIXI.Sprite(resources['game'].textures['circleBar'])
        sprites.coin         = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.luckyCoin    = new PIXI.Sprite(resources['game'].textures['luckyCoin'])
        sprites.playBtn      = new PIXI.Sprite(resources['game'].textures['playBtn'])
        sprites.puzzle       = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.questionMark = new PIXI.Sprite(resources['game'].textures['questionMark'])
        sprites.rect         = new PIXI.Sprite(resources['game'].textures['rect'])
        sprites.spinCircle   = new PIXI.Sprite(resources['game'].textures['spinCircle'])
        sprites.wheel        = new PIXI.Sprite(resources['game'].textures['wheel'])
        
        console.log(sprites)
    })
}