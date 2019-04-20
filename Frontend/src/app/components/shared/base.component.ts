import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {

  protected isAlive = true

  ngOnDestroy(): void {
    this.isAlive = false
  }

}
