---
title: Languages customization
layout: redirect
weight: 30
date: '2025-09-01T10:26:32Z'
lastmod: '2025-09-01T10:40:40Z'
---
The platform UI strings used for internationalization are stored in [gettext](https://en.wikipedia.org/wiki/Gettext). If you want to add a new language to the platform you need a software to edit these files, for example, [Poedit](https://poedit.net/).

Each translated catalog is loaded at runtime in a JSON format. To convert .po (gettext) files into .json files we rely on `@angular/cli` installed during the first step.

#### How to add your own translations at build time {#how-to-add-your-own-translations-at-build-time}

1. Download the string catalog from [@c8y/ngx-components@1004.0.6/locales/locales.pot](https://unpkg.com/@c8y/ngx-components@latest/locales/locales.pot) (starting from version 1004.0.6,`latest` can be replaced by your current used version).
2. Load the downloaded locales.pot template file in your preferred .pot file editor and create a new translation from it. Select the target language of the translation, for example, Afrikaans, and translate each string. Repeat the process for as many languages as you like.
The outcome of this step is a .po catalog file for each language. Make sure to store these files in a safe place, as they are useful when updating the strings in subsequent versions.
3. Transform the newly created .po file into a .json file using the `c8ycli`:

 ```
 c8ycli locale-compile path/to/language.po
 ```

4. Copy the generated .json file into the *ui-assets* folder.
5. Update the languages fragment in *public-options/options.json*.

```
languages?: {
  [langCode: string]: {
    name: string;
    nativeName: string;
    url: string;
  }
}
```

In the example provided in the repository, available as downloaded, you can find an example of a Ukrainian translation which looks like this:

```ts
[...]

export default {
  runTime: {
    [...]
    languages: {
      uk: {
        name: "Ukraine",
        nativeName: "українська",
        url: "/apps/public/ui-assets/uk.json"
      }
    }
  },
  buildTime: {
    [...]
  }
}
[...]
```


You can change the imported language in the UI after login. To do so, click the User icon at the top right, select User settings from the menu and in the upcoming window select the language of your choice.

#### How to add your own translations at runtime {#how-to-add-your-own-translations-at-runtime}
You can translate certain strings at runtime, which means they do not have to be included in the build and can simply be added to the [application options](/web/application-configuration/#application-options). However, this concept doesn't allow to add new languages. You can only add new strings to existing languages or align certain translations on existing ones. To translate a certain key you must add the following structure to the application options:

```typescript
  i18nExtra?: {
    [langCode: string]: {
      [key: string]: string;
    };
  };
```

**Example:** 

The following will translate a custom cookie banner:

```ts
[...]

export default {
  runTime: {
    [...]
    i18nExtra: {
      de: {
        "About cookies on {{< product-c8y-iot >}}": "Informationen zu Cookies in {{< product-c8y-iot >}}",
        "Click Agree and Proceed to accept cookies and go directly to the platform or click on Privacy Policy to see detailed descriptions of the used cookies.": "Klicken Sie auf Zustimmen und fortfahren, um Cookies zu akzeptieren und direkt zur Plattform zu gelangen, oder klicken Sie auf Datenschutzrichtlinie, um detaillierte Beschreibungen der verwendeten Cookies anzuzeigen."
      }
    }
  },
  buildTime: {
    [...]
  }
}
[...]
```
