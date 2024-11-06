import { NgModule } from '@angular/core';
import { DefaultPipe } from './pipes/default.pipe';

@NgModule({
  declarations: [DefaultPipe],
  exports: [DefaultPipe],
})
export class SharedModule {}
