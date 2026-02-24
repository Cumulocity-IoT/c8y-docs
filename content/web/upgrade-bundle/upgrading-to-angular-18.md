---
title: Upgrading from Angular 17 to Angular 18  
layout: redirect
weight: 440
---

Angular 18 is supported from version `1021.0.0`. The following configuration changes are required before you can run the application:

- Update all `@c8y` dependencies to version `1021.x.x` in your *package.json*.
- Run the command `ng update @angular/core@18 @angular/cli@18` to update Angular core and CLI to version 18.
- Update `ngx-bootstrap` to version `18.0.0`.
- Update `@angular/cdk` to version `18.x.x`.
- The `brandingEntry` application option can no longer be used to customize the global style of your application.
  Instead, global styles should now be specified via [the mechanism Angular provides](https://angular.dev/reference/configs/workspace-config#styles-and-scripts-configuration).

  **Migration steps:**

  1. Create a *styles.less* file in your *src/* directory with the following content:

     ```less
     // Import Cumulocity styles first
     @import '~@c8y/style/extend.less';
     // Add your variable overrides here (optional)
     // @brand-primary: #your-color;
     ```

  2. Reference this file in the `styles` array of your *angular.json*:

     ```json
     {
       "projects": {
         "your-app": {
           "architect": {
             "build": {
               "options": {
                 "styles": [
                   "src/styles.less"
                 ]
               }
             }
           }
         }
       }
     }
     ```

  3. Remove the `brandingEntry` from your *cumulocity.config.ts* file.

  **Important:** Always import `@c8y/style/extend.less` first, then override variables after. See [Branding your application](/web/application-configuration/#branding-your-application) for details.
- `Node.js`, `TypeScript`, `RxJS`: [Version compatibility](https://angular.dev/reference/versions#actively-supported-versions).
- Follow the `Angular 18` upgrade guide: [Updating to version 18](https://angular.dev/update-guide?v=17.0-18.0&l=2).

