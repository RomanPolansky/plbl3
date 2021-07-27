import bg from '../sprites/bg.jpg'

export class Loader 
{
    constructor(loader)
    {
        this.loader = loader
    }
    preload()
    {
        return new Promise(resolve => {
            this.loader.add('bg', bg)
            this.loader.load((loader, resources) => {
                resolve()
            })
        })
    }
}