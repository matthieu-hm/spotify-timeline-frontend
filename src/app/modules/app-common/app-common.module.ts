import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

const declarationsToExport = [
  //
];

const importsToExport = [
  //
];

const providers = [
  //
];

@NgModule({
  declarations: [
      ...declarationsToExport,
  ],
  exports: [
      // Exported Components
      ...declarationsToExport,

      // Exported modules
      ...importsToExport,
  ],
  imports: [
      ...importsToExport,
  ],
  // providers: [
  //     // Providers should be set below (in forRoot())
  // ],
})
export class AppCommonModule {
  static forRoot(): ModuleWithProviders<AppCommonModule> {
      return {
          ngModule: AppCommonModule,
          providers: [
              ...providers,
          ],
      };
  }

  static forChild(): ModuleWithProviders<AppCommonModule> {
      return {
          ngModule: AppCommonModule,
      };
  }
}
