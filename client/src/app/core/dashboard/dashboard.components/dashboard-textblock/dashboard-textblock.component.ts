import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-textblock',
  templateUrl: './dashboard-textblock.component.html',
  styleUrls: ['./dashboard-textblock.component.css']
})
export class DashboardTextblockComponent implements OnInit {
  
  @Input()
  text: string;
 
  constructor() { }

  ngOnInit() {
  }

}
