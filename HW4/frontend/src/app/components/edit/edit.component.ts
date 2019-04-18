import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../profile.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  profile: any = {};
  updateForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private profileService: ProfileService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      favorite_category: ''
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.profileService.getProfileById(this.id).subscribe(res => {
        this.profile = res;
        this.updateForm.get('first_name').setValue(this.profile.first_name);
        this.updateForm.get('last_name').setValue(this.profile.last_name);
        this.updateForm.get('favorite_category').setValue(this.profile.favorite_category);
      });
    });
  }

  updateProfile(first_name, last_name, favorite_category) {
    this.profileService.updateProfile(this.id, first_name, last_name, favorite_category).subscribe(() => {
      this.snackBar.open('Profile updated successfully', 'OK', {
        duration: 3000
      });
    });
  }

}
