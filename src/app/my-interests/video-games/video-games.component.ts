import { Component, OnInit } from '@angular/core';
import { animate, stagger, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-video-games',
  templateUrl: './video-games.component.html',
  styleUrls: ['./video-games.component.css'],
  animations: [
    trigger('stagger', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger(500, [animate('.2s', style({ opacity: 1 }))])
        ], { optional: true }
        )
      ])
    ])
  ]
})
export class VideoGamesComponent implements OnInit {

  onDetailsBtnClick(detailsIndex: number) {
    this.currentDetails = detailsIndex;
  }

  constructor() { }

  ngOnInit() { }

  currentDetails: number = 0;
  videoGameDetails: string[][] = [
    [
      "Starcraft",
      "Gears of War",
      "Super Smash Bros.",
      "Ghost Recon Phantoms",
      "Age of Empires II",
      "Zelda (BotW, OoT, LttP)",
    ],
    [ 
      "PC",
      "N64",
      "SNES",
      "Xbox 360",
      "GameCube",
      "Nintendo Switch",
     
    ],
    [
      "Real-time Strategy",
      "Battle Royale",
      "Action-adventure",
      "Stealth",
      "Sandbox"
    ]
  ];

  videoGameImages: string[] = [
    "assets/images/video-games/botw.jpg",
    "assets/images/video-games/aoe.jpg",
    "assets/images/video-games/pubg.jpg",
    "assets/images/video-games/masseffect.jpg",
    "assets/images/video-games/crysis.jpg",
    "assets/images/video-games/supersmash.jpg",
    "assets/images/video-games/megamanx.jpg",
  ];
}
