const tplGameMap = () => `
<div id="pr_game_map_containter">
  <div class="pr_game_map_zoom_buttons">
    <button id="pr_game_map_zoom_out_button" type="button" class="bga-zoom-button bga-zoom-out-icon" style="margin-bottom: -5px;"></button>
    <button id="pr_game_map_zoom_in_button" type="button" class="bga-zoom-button bga-zoom-in-icon" style="margin-bottom: -5px;"></button>
  </div>
  <div id="pr_game_map">
    <div class="pr_marker" data-marker-type="victory_point"></div>
    <div class="pr_token" data-faction="french" data-unit-type="bastion"></div>
    <div class="pr_token" data-faction="indian" data-unit-type="micmac"></div>
  </div>
</div>`

// <i class="fa-regular fa-magnifying-glass-plus"></i>