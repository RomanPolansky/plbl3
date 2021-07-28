import * as PIXI from 'pixi.js'
import { cloudSS, cloudJSON, bg } from './spriteData'
import { sprites } from './Global'

export function loaderAdd() {
    let baseTexture = new PIXI.BaseTexture(cloudSS)
    let spritesheet = new PIXI.Spritesheet(baseTexture, cloudJSON)
    let bgTexture = new PIXI.BaseTexture(bg)

    const myLoader = PIXI.Loader.shared
 
    myLoader.resources['cloud'] = spritesheet
    myLoader.resources['bg'] = {texture: bgTexture}
    
    spritesheet.parse(() => { })

    myLoader.load((loader, resources) => {
        sprites.bg = new PIXI.Sprite(new PIXI.Texture(resources['bg'].texture))

        sprites.cloudLeft1 = new PIXI.Sprite(resources['cloud'].textures['left_1'])
        sprites.cloudLeft2 = new PIXI.Sprite(resources['cloud'].textures['left_2'])
        sprites.cloudLeft3 = new PIXI.Sprite(resources['cloud'].textures['left_3'])
        sprites.cloudLeft4 = new PIXI.Sprite(resources['cloud'].textures['left_4'])
        sprites.cloudLeft5 = new PIXI.Sprite(resources['cloud'].textures['left_5'])
        sprites.cloudLeft6 = new PIXI.Sprite(resources['cloud'].textures['left_6'])
        sprites.cloudRight1 = new PIXI.Sprite(resources['cloud'].textures['right_1'])
        sprites.cloudRight2 = new PIXI.Sprite(resources['cloud'].textures['right_2'])
        sprites.cloudRight3 = new PIXI.Sprite(resources['cloud'].textures['right_3'])
        sprites.cloudRight4 = new PIXI.Sprite(resources['cloud'].textures['right_4'])
        sprites.cloudRight5 = new PIXI.Sprite(resources['cloud'].textures['right_5'])
        
        console.log(sprites)
    })
}