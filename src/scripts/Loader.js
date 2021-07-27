import { Global } from './Global'
import bg from '../sprites/bg.jpg'
import coin from '../sprites/coin.png'

export class Loader 
{
    constructor(loader)
    {
        this.loader = loader
    }
    preload()
    {
        return new Promise(resolve => {
            this.loader
                    .add('bg', bg)
                    .add('coin', coin)
                    .load((loader, resources) => {
                Global.resources = resources
                resolve()
            })
        })
    }
}