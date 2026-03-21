import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.html',
  styleUrls: ['./category.css'],
})
export class Category {

  isOpen = false;

  open() {
    this.isOpen = true;
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    document.body.style.overflow = '';
  }
}