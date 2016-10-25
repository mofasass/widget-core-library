Translations are handled by the `translationModule` module which is part of the `kambi-widget-core-library`. The module fetches the corresponding translations from JSON files inside the `src/i18n` folder.

The use of these files are optional if no internationalization is required. If the user locale is not found in this folder it will fallback to `en_GB.json`.

These are all the currently supported locales in the Sportsbook, although they can vary by operator:

cs_CZ.json, de_DE.json, es_ES.json, fr_CH.json, lt_LT.json, no_NO.json, ro_RO.json, da_DK.json, el_GR.json, et_EE.json, fr_FR.json, lv_LV.json, pl_PL.json, ru_RU.json, de_AT.json, en_AU.json, fi_FI.json, hu_HU.json, nl_BE.json, pt_BR.json, sv_SE.json, de_CH.json, en_GB.json, fr_BE.json, it_IT.json, nl_NL.json, pt_PT.json, tr_TR.json


We can test translations by changing the `locale` parameter in `modkSetupData.json`

```json
{
...
   "clientConfig": {
      ...
      "locale": "en_GB",
      ...
   }
}
```

### Translating strings

To translate a string we use the `getTranslation()` method of the `translationModule`

```javascript

import {
   translationModule
} from 'kambi-widget-core-library';

// Translate stadium string
document.getElementById('title').innerText(translationModule.getTranslation('Stadium'));

```

On our json files we would have for example `sv_SE.json`

```json
{
   "Stadium": "Stadion"
}
```

### Translation with extra arguments

 We can also provide arguments when translating. In our json files we can define the number of arguments, so for example:

 `en_GB.json`:
 ```json
 {
    "WelcomeTo": "Welcome {0} to {1}"
 }
 ```

 `sv_SE.json`:
 ```json
 {
    "WelcomeTo": "Välkomna {0} till {1}"
 }
 ```

 And the translation would be called like so:

```javascript

import {
   translationModule
} from 'kambi-widget-core-library';

var user = 'Jim',
    place = 'Sportsbook';

// Translate welcome message
$('#welcome').text(translationModule.getTranslation('WelcomeTo', user, place));

```

That would result to **Welcome Jim to Sportsbook** for 'en_GB' locale and **Välkomna Jim till Sportsbook** for 'sv_SE'
