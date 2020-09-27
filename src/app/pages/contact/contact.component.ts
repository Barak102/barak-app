import { Component, OnInit } from '@angular/core';
import { transition, style, animate, trigger } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('nameFadeIn', [
      transition('void => *', [
        style({ opacity: 0, marginLeft: '-400px', filter: 'blur(20px)'  }),
        animate(500, style({ opacity: 1, marginLeft: '0', filter: 'blur(0px)' }))
      ])
    ]),
    trigger('emailFadeIn', [
      transition('void => *', [
        style({ opacity: 0, marginLeft: '-400px', filter: 'blur(20px)' }),
        animate(700, style({ opacity: 1, marginLeft: '0', filter: 'blur(0px)' }))
      ])
    ]),
    trigger('phoneFadeIn', [
      transition('void => *', [
        style({ opacity: 0, marginLeft: '-400px', filter: 'blur(20px)' }),
        animate(1100, style({ opacity: 1, marginLeft: '0', filter: 'blur(0px)' }))
      ])
    ]),
    trigger('messageFadeIn', [
      transition('void => *', [
        style({ opacity: 0, marginLeft: '-400px', filter: 'blur(20px)' }),
        animate(1200, style({ opacity: 1, marginLeft: '0', filter: 'blur(0px)'  }))
      ])
    ]),
  ]
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  resetCommand(): void {
    
  }

}
