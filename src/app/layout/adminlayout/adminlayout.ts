import { Component } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-adminlayout',
  imports: [NzLayoutModule, NzMenuModule, NzBreadCrumbModule, NzIconModule, FormsModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './adminlayout.html',
  styleUrl: './adminlayout.css',
})
export class Adminlayout {
  isCollapsed = false;
  date = new Date();
}
