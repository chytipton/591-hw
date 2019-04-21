import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 

import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private profileService: ProfileService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      favorite_category: ['']
    });
  }

  addProfile(first_name, last_name, favorite_category) {
    console.log('hi');
    this.profileService.addProfile(first_name, last_name, favorite_category).subscribe(() => {
      this.router.navigate(['/joke']);
    });
  }

  ngOnInit() {
  }

}
