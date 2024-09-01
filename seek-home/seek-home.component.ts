import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seek-home',
  templateUrl: './seek-home.component.html',
  styleUrl: './seek-home.component.css'
})
export class SeekHomeComponent {

  constructor(private route:Router) {
    if (typeof localStorage !== 'undefined') {
      // Use localStorage here
      let u:any = localStorage.getItem('name');
    if(u==null || u=='')
      {
        this.route.navigateByUrl('/login');
      }
    } else {
      console.log('localStorage is not available.');
    }
  }

  logout(){
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('name');
    this.route.navigateByUrl('/seeker')
      // Use localStorage here
    } else {
      console.log('localStorage is not available.');
    }
    
    
  }

}

