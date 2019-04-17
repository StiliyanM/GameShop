import { Injectable } from '@angular/core'
import { ToastrService as AngularToastrService } from 'ngx-toastr'

@Injectable()
export class ToastrService {

  private options = {
    // closeButton: true,
    // debug: false,
    // newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-bottom-right',
    preventDuplicates: true,
    showDuration: 4000,
    hideDuration: 1000,
    timeOut: 5000,
    extendedTimeOut: 1000,
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
    enableHtml: true
  }

constructor(private toastr: AngularToastrService) { }

success(message: string, title?: string): void {
    this.toastr.success(message, title, this.options)
}

info(message: string, title?: string): void {
    this.toastr.info(message, title, this.options)
}

warning(message: string, title?: string): void {
    this.toastr.warning(message, title, this.options)
}

error(message: string, title?: string): void {
    this.toastr.error(message, title, this.options)
}

}
