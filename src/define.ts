define([
  'dojo',
  'dojo/_base/declare',
  // 'dojo/fx',
  // 'dojox/fx/ext-dojo/complex',
  'ebg/core/gamegui',
  'ebg/counter',
  // g_gamethemeurl + "modules/js/bga-animations.js",
], function (dojo, declare) {
  return declare('bgagame.paxrenaissance', ebg.core.gamegui, new PaxRenaissance());
});
