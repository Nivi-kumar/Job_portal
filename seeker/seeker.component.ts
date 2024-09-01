import { Router, Routes } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl,NgForm,NgModel } from "@angular/forms";
import { NodeutilityService } from '../nodeutility.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-seeker',
  templateUrl: './seeker.component.html',
  styleUrl: './seeker.component.css'
})
export class SeekerComponent implements OnInit {

  loginUserData : any = {}

  constructor(private _auth : NodeutilityService, private Route : Router) { }

  ngOnInit(): void {
  }

  onsubmit(login:NgForm){
    login.resetForm();
}

  loginUser(){
    this._auth.loginSeeker(this.loginUserData);
    
  }
  }
