import { NgModule } from '@angular/core';
import { ElipseFilterPipe } from './elipse-filter/elipse-filter';
import { NameFilterPipe } from './name-filter/name-filter';
@NgModule({
	declarations: [ElipseFilterPipe,
    NameFilterPipe],
	imports: [],
	exports: [ElipseFilterPipe,
    NameFilterPipe]
})
export class PipesModule {}
