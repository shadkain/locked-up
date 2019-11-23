import SerialGenerator from "framework/generator/SerialGenerator";
import * as PIXI from 'pixi.js';

let a = new PIXI.Application();

let g = new SerialGenerator(-22)

enum Events {
    frameChanged = g.gen,
    nothingHappened = g.gen,
    lol = g.gen,
}

Object.defineProperty(window, 'Events', {value: Events});
Object.defineProperty(window, 'a', {value: a});