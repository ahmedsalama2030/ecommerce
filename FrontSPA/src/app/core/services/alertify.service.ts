import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  //defaults

  defaults = alertify.defaults = {
    // dialogs defaults
    autoReset: true,
    basic: false,
    closable: true,
    closableByDimmer: true,
    frameless: false,
    maintainFocus: true, // <== global default not per instance, applies to all dialogs
    maximizable: true,
    modal: true,
    movable: true,
    moveBounded: false,
    overflow: true,
    padding: true,
    pinnable: true,
    pinned: true,
    preventBodyShift: false, // <== global default not per instance, applies to all dialogs
    resizable: true,
    startMaximized: false,
    transition: 'pulse',

    // notifier defaults
    notifier: {
      // auto-dismiss wait time (in seconds)  
      delay: 2,
      // default position
      position: 'bottom-left',
      // adds a close button to notifier messages
      closeButton: false
    },

    

    // theme settings
    theme: {
      // class name attached to prompt dialog input textbox.
      input: 'ajs-input',
      // class name attached to ok button
      ok: 'ajs-ok',
      // class name attached to cancel button 
      cancel: 'ajs-cancel'
    }
  }

  constructor() { }
  
   
  success(message: string) {
    alertify.success(message).dismissOthers();
  }

  error(message: string) {
    alertify.error(message).dismissOthers() ;
  }
  warning(message: string) {
    alertify.warning(message).dismissOthers();
  }
  message(message: string) {
    alertify.message(message).dismissOthers();
  }
 
    
}

//////////////////////////
 


