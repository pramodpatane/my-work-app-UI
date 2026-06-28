import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-component',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css',
})
export class DashboardComponent {
  string1: string = "";
  string2: string = "";

  // checkCharacterCount(): boolean {

  //   if (this.string1.length !== this.string2.length) {
  //     return false;
  //   }

  //   const charMap: { [key: string]: number } = {};

  //   // Count chars from first string
  //   for (const char of this.string1) {
  //     charMap[char] = (charMap[char] || 0) + 1;
  //   }

  //   // Decrease count using second string
  //   for (const char of this.string2) {

  //     if (!charMap[char]) {
  //       return false;
  //     }

  //     charMap[char]--;
  //   }

  //   return true;
  // }
}
