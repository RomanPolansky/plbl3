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

        sprites.cloudLeft7  = new PIXI.Sprite(resources['cloud'].textures['left_1'])
        sprites.cloudLeft8  = new PIXI.Sprite(resources['cloud'].textures['left_1'])

        sprites.cloudRight1  = new PIXI.Sprite(resources['cloud'].textures['right_1'])
        sprites.cloudRight2  = new PIXI.Sprite(resources['cloud'].textures['right_2'])
        sprites.cloudRight3  = new PIXI.Sprite(resources['cloud'].textures['right_3'])
        sprites.cloudRight4  = new PIXI.Sprite(resources['cloud'].textures['right_4'])
        sprites.cloudRight5  = new PIXI.Sprite(resources['cloud'].textures['right_5'])

        sprites.cloudRight6  = new PIXI.Sprite(resources['cloud'].textures['left_4'])
        sprites.cloudRight7  = new PIXI.Sprite(resources['cloud'].textures['left_1'])
        sprites.cloudRight8  = new PIXI.Sprite(resources['cloud'].textures['right_4'])

        /* __________________________________________________________________________________ */
        sprites.bingo1 = new PIXI.Sprite(resources['game'].textures['bingo'])
        sprites.bingo1.anchor.set(0.5)
        sprites.bingo1.type = 'bingo'

        sprites.bingo2 = new PIXI.Sprite(resources['game'].textures['bingo'])
        sprites.bingo2.anchor.set(0.5)
        sprites.bingo2.type = 'bingo'

        sprites.coin1 = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.coin1.anchor.set(0.5)
        sprites.coin1.type = 'coin'

        sprites.coin2 = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.coin2.anchor.set(0.5)
        sprites.coin2.type = 'coin'

        sprites.coin3 = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.coin3.anchor.set(0.5)
        sprites.coin3.type = 'coin'

        sprites.coin4 = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.coin4.anchor.set(0.5)
        sprites.coin4.type = 'coin'

        sprites.luckyCoin1 = new PIXI.Sprite(resources['game'].textures['luckyCoin'])
        sprites.luckyCoin1.anchor.set(0.5)
        sprites.luckyCoin1.type = 'luckyCoin'

        sprites.luckyCoin2 = new PIXI.Sprite(resources['game'].textures['luckyCoin'])
        sprites.luckyCoin2.anchor.set(0.5)
        sprites.luckyCoin2.type = 'luckyCoin'

        sprites.puzzle1 = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.puzzle1.anchor.set(0.5)
        sprites.puzzle1.type = 'puzzle'

        sprites.puzzle2 = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.puzzle2.anchor.set(0.5)
        sprites.puzzle2.type = 'puzzle'

        sprites.puzzle3 = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.puzzle3.anchor.set(0.5)
        sprites.puzzle3.type = 'puzzle'

        sprites.puzzle4 = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.puzzle4.anchor.set(0.5)
        sprites.puzzle4.type = 'puzzle'
        /* __________________________________________________________________________________ */

        sprites.arrow        = new PIXI.Sprite(resources['game'].textures['arrow'])
        sprites.wheel        = new PIXI.Sprite(resources['game'].textures['wheel'])
        sprites.button1      = new PIXI.Sprite(resources['game'].textures['buttonShadow'])
        sprites.button2      = new PIXI.Sprite(resources['game'].textures['button'])
        sprites.circleBar    = new PIXI.Sprite(resources['game'].textures['circleBar'])
        sprites.playBtn      = new PIXI.Sprite(resources['game'].textures['playBtn'])
        sprites.spinCircle   = new PIXI.Sprite(resources['game'].textures['spinCircle'])
        
        sprites.questionMark1 = new PIXI.Sprite(resources['game'].textures['questionMark'])
        sprites.questionMark1.anchor.set(0.5)

        sprites.questionMark2 = new PIXI.Sprite(resources['game'].textures['questionMark'])
        sprites.questionMark2.anchor.set(0.5)

        sprites.questionMark3 = new PIXI.Sprite(resources['game'].textures['questionMark'])
        sprites.questionMark3.anchor.set(0.5)

        sprites.rect1 = new PIXI.Sprite(resources['game'].textures['rect'])
        sprites.rect1.anchor.set(0.5)

        sprites.rect2 = new PIXI.Sprite(resources['game'].textures['rect'])
        sprites.rect2.anchor.set(0.5)

        sprites.rect3 = new PIXI.Sprite(resources['game'].textures['rect'])
        sprites.rect3.anchor.set(0.5)

        /* __________________________________________________________________________________ */

        sprites.winCoin = new PIXI.Sprite(resources['game'].textures['coin'])
        sprites.winCoin.anchor.set(0.5)

        sprites.winBingo = new PIXI.Sprite(resources['game'].textures['bingo'])
        sprites.winBingo.anchor.set(0.5)

        sprites.winLuckyCoin = new PIXI.Sprite(resources['game'].textures['luckyCoin'])
        sprites.winLuckyCoin.anchor.set(0.5)
    
        sprites.winPuzzle = new PIXI.Sprite(resources['game'].textures['puzzle'])
        sprites.winPuzzle.anchor.set(0.5)

        sprites.spark = new PIXI.Sprite(resources['game'].textures['spark'])
        sprites.spark.anchor.set(0.5)

        /* __________________________________________________________________________________ */

        sprites.packshotBlock = new PIXI.Sprite(resources['game'].textures['packshotBlock'])
        sprites.packshotBlock.anchor.set(0.5)
        sprites.logo = new PIXI.Sprite(resources['game'].textures['logo'])
        sprites.logo.anchor.set(0.5)
    })
}