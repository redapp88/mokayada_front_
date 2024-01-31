import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-image-maximize',
  templateUrl: './image-maximize.component.html',
  styleUrls: ['./image-maximize.component.css']
})
export class ImageMaximizeComponent  implements OnInit {

  constructor(  @Inject(MAT_DIALOG_DATA) public data: { url: string }) { }
  image_url=""
  ngOnInit(): void {
    this.image_url=this.data.url
  }


}
