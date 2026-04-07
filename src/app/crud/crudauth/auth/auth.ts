import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { IUser } from '../../../interface/all';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableComponent } from "ng-zorro-antd/table";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-auth',
  imports: [NzTableComponent, NzButtonModule, NzPopconfirmModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  http = inject(HttpClient)
  users: IUser[] = []
  chan = inject(ChangeDetectorRef)
  message = inject(NzMessageService)
  ngOnInit() {
    this.http.get<IUser[]>(`http://localhost:3000/users`).subscribe({
      next: (data) => {
        this.users = data
        this.chan.markForCheck()
      }
    })
  }
  delete(id: number){
    this.http.delete(`http://localhost:3000/users/${id}`).subscribe({
      next: () =>{
        this.chan.markForCheck()
        this.message.success("xoa than ocng")
        this.users = this.users.filter(u => u.id !== id)
      },
      error:(err) =>{
        this.message.error("xoa that bại")
        console.log(err)
      }
    })
  }
}
