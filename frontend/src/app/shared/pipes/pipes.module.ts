import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultPipe } from './default.pipe';

@NgModule({
  declarations: [DefaultPipe],
  imports: [CommonModule],
  exports: [DefaultPipe],
})
export class PipesModule {}
