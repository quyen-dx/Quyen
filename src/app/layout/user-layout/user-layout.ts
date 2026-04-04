import { Component } from '@angular/core';
import { Header } from "../../nav/header/header";
import { Footer } from "../../nav/footer/footer";
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-user-layout',
  imports: [Header,Footer,RouterOutlet],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.css',
})
export class UserLayout {}
