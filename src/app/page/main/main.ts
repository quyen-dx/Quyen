import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Banner } from '../../nav/banner/banner';
@Component({
  selector: 'app-main',
  imports: [RouterLink,Banner],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {}
