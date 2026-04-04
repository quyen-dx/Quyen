import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ICategory } from '../../../interface/all';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink } from "@angular/router";
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@Component({
  selector: 'app-categories',
  imports: [NzTableModule, RouterLink,NzPopconfirmModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class Category {
  http = inject(HttpClient)
  category: ICategory[] = []
  chan = inject(ChangeDetectorRef)
  message = inject(NzMessageService)
  ngOnInit(){
    this.http.get<ICategory[]>("http://localhost:3000/categories").subscribe({
      next: (data)=>{
        this.category =data
        this.chan.markForCheck()
      },
      error:(err) =>{
        console.log(err);
        this.message.error("lay cate that bai")
      }
    })
  }
  delete(id: number){
    this.http.delete(`http://localhost:3000/categories/${id}`).subscribe({
      next:() =>{
        this.message.success("xoa thanh cong")
        this.chan.markForCheck()
        this.category = this.category.filter(item => item.id !== id)
      },
      error:(err) =>{
        console.log(err);
        this.message.error("xoa that bai")
      }
    })    
  }
}
