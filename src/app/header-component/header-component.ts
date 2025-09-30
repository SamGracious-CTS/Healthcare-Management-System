import { CommonModule } from '@angular/common';
import { Component, Input,Output,EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnInit } from '@angular/core';
//import { CommonModule } from "../../../node_modules/@angular/common/common_module.d";

@Component({
  selector: 'app-header-component',
  imports: [CommonModule],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css'
})
export class HeaderComponent implements OnInit {
 userName:string=""
 role = ''


constructor(private route: ActivatedRoute) {}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.userName = params['userName'];
    this.role = params['role'];
  });
}
}
