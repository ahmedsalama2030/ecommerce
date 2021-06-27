import { animate, animation, keyframes, query, style } from "@angular/animations";


export let opacityAnimate=animation([
    animate('{{duration}}', keyframes([
         style({
          offset: 0,
           opacity: '0',
         }),
        style({
          offset: 1,
          opacity: '1',
            }) 
  
      ]))
],{params:{duration:'.5s'}})


export let SlideAnimate=animation([
    animate('{{duration}}', keyframes([
         style({
          offset: 0,
          transform: 'translate3d({{slideX}}, {{slideY}}, {{slideZ}})',
          visibility: 'visible'
         }),
        style({
          offset: 1,
          transform: 'translate3d(0, 0, 0)'
            }) 
  
      ]))
],{params:{duration:'.5s',slideX:'0',slideY:'0',slideZ:'0'}})