import { Howl } from "howler";
import { back, click, scale, spawn, spin } from "./base64Data";

export const bgSound = new Howl({
    src: back,
    loop: true,
    autoplay: true,
})
export const clickSound = new Howl({ src: click });
export const scaleSound = new Howl({ src: scale })
export const spawnSound = new Howl({ src: spawn })
export const spinSound = new Howl({ src: spin })
