import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class ApputilService {

  constructor(private toastr: ToastrService) { }

  toastSuccess(message: string) {
    setTimeout(() => {
      this.toastr.success(message);
    }, 0);
  }
}
