import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfile } from '../models/user-profile.model';

@Component({
  standalone: true,
  selector: 'profile-page',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name = '';
  isDiabetic = false;
  
  sex: 'male' | 'female' = 'male';

  age = 0;
  weight = 0;
  height = 0;
  
  activityLevel: 'low' | 'medium' | 'high' = 'medium';
  
  goal: 'lose' | 'maintain' | 'gain' = 'maintain';

  saved = false;

  ngOnInit() {

    const raw = localStorage.getItem('nh_profile');
  
    if (raw) {
  
      const parsed = JSON.parse(raw);
  
      this.name = parsed.name ?? '';
      this.isDiabetic = parsed.isDiabetic ?? false;
  
      this.sex = parsed.sex ?? 'male';
  
      this.age = parsed.age ?? 0;
      this.weight = parsed.weight ?? 0;
      this.height = parsed.height ?? 0;
  
      this.activityLevel =
        parsed.activityLevel ?? 'medium';
  
      this.goal =
        parsed.goal ?? 'maintain';
    }
  }

  save() {

    const profile: UserProfile = {
  
      name: this.name,
  
      isDiabetic: this.isDiabetic,
  
      sex: this.sex,
  
      age: this.age,
  
      weight: this.weight,
  
      height: this.height,
  
      activityLevel: this.activityLevel,
  
      goal: this.goal
    };
  
  
    localStorage.setItem(
      'nh_profile',
      JSON.stringify(profile)
    );
  
  
    this.saved = true;
  
    setTimeout(() => {
      this.saved = false;
    }, 2000);
  }
}
