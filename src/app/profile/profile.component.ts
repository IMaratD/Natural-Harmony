import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'profile-page',
  imports: [FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  name = '';
  isDiabetic = false;
  saved = false;

  ngOnInit() {
    const raw = localStorage.getItem('nh_profile');
    if (raw) {
      const parsed = JSON.parse(raw);
      this.name = parsed.name ?? '';
      this.isDiabetic = parsed.isDiabetic ?? false;
    }
  }

  save() {
    localStorage.setItem('nh_profile', JSON.stringify({ name: this.name, isDiabetic: this.isDiabetic }));
    this.saved = true;
    setTimeout(()=> this.saved = false, 2000);
  }
}
