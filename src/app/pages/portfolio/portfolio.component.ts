import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ImageItem } from 'src/app/barak-shared/models/image-item/image-item';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {


  imageCollection: ImageItem[] = [
    { image: 'data:image/jpeg;base64,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', title: 'Zanzibar 1' },
    { image: 'https://www.barakasafaris.co.ke/wp-content/uploads/2019/06/zanzibars.jpg', title: 'Zanzibar 2' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTeBXfjDUrq4opmck0Snixp4tQS_u_6o8W9iqCUumUcCuxvohu6&usqp=CAU', title: 'Sri Lanka 1' },
    { image: 'https://i.pinimg.com/originals/e7/01/ef/e701ef08d033612fa93ef481d0209fb0.jpg', title: 'Sri Lanka 2' },
    { image: 'https://wallup.net/wp-content/uploads/2015/12/240690-nature-landscape-railway-sunset-palm_trees-clouds-shrubs-Sri_Lanka-tropical.jpg', title: 'Sri Lanka 3' },
    { image: 'https://store-images.s-microsoft.com/image/apps.54924.14396255878217840.41399773-ce07-493b-a619-f214dd2ae4f7.2abe9710-a132-4eb2-943f-938b670092a4?w=672&h=378&q=80&mode=letterbox&background=%23FFE4E4E4&format=jpg', title: 'Sri Lanka 4' }
  ];

  constructor() { }
  
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }



}