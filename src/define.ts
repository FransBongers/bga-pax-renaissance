define([
  'dojo',
  'dojo/_base/declare',
  g_gamethemeurl + 'modules/js/vendor/nouislider.min.js',
  'dojo/fx',
  'dojox/fx/ext-dojo/complex',
  'ebg/core/gamegui',
  'ebg/counter',
  // g_gamethemeurl + "modules/js/bga-animations.js",
], function (dojo, declare, noUiSliderDefined) {
  if (noUiSliderDefined) {
    noUiSlider = noUiSliderDefined;
  }
  return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
