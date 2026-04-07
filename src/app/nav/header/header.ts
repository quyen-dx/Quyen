import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, FormsModule, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  router = inject(Router)
  keyword = ''
  platformId = inject(PLATFORM_ID)
  search(){
    console.log('keyword:', this.keyword)
    if(this.keyword.trim()){
      this.router.navigate(['/search'], {queryParams: {q: this.keyword}})
    }
  }

  get user(){
    if(!isPlatformBrowser(this.platformId)) return null
    const u = sessionStorage.getItem('user')
    return u ? JSON.parse(u) : null
  }
  logout(){
    sessionStorage.removeItem('user')
  }
}
