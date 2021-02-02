import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss']
})
export class SinglePlayerComponent implements OnInit {
  dMulti: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
