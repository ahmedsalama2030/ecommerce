import { animate, state, style, transition, trigger, useAnimation } from "@angular/animations";
import { opacityAnimate } from "./reuse-animations";
// open close menu
export let openClose = trigger('openClose', [
  state('void', style({
    height: '80vh',
    visibility: 'visible'

  })),
  state('*', style({
    height: '0px',
    visibility: 'hidden'


  })),
  transition('void => *', [
    animate('.3s'),

  ]),
  transition('*=> void', [
    animate('.3s')
  ]),
]);


export let Fade = trigger('Fade', [
  transition('void => *', useAnimation(opacityAnimate, { params: { duration: '.3s' } })),
  transition('*=> void', useAnimation(opacityAnimate, { params: { duration: '.3s' } }))
]) 
 
export let FadeCarousel = trigger('FadeCarousel', [
  transition('void => *', useAnimation(opacityAnimate, { params: { duration: '.5s' } })),
  transition('*=> void', useAnimation(opacityAnimate, { params: { duration: '.5s' } }))
])