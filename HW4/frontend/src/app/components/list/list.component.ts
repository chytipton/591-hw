import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';

import { Profile } from '../../profile.model';
import { ProfileService } from '../../profile.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  profile: Profile[];

  displayedColumns = ['first_name', 'last_name', 'favorite_category', 'actions'];

  constructor(private profileService: ProfileService, private router: Router) { }

  ngOnInit() {
    this.fetchProfile();
  }
  fetchProfile() {
    this.profileService
    .getProfile()
    .subscribe((data: Profile[]) => {
      this.profile = data;
      console.log('Data requested ... ');
      console.log(data);
    });
  }
  editProfile(id) {
    this.router.navigate([`/edit/${id}`]);
  }
  deleteProfile(id) {
    this.profileService.deleteProfile(id).subscribe(() => {
      this.fetchProfile();
    });
  }
}
