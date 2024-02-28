const tplPlayerTableauContent = ({
  player,
  title,
  overlap,
  overlapEmpireSquares,
  showCounters
}: {
  player: PaxRenaissancePlayerData;
  title: string;
  overlap: string;
  overlapEmpireSquares: string;
  showCounters: string;
}) => {

  const playerId = player.id;
  return `
  <div class="pr_player_tableau_title" data-show-counters="${showCounters}">
    <div class="pr_tableau_title_icon_container"></div>
      <span class="pr_title">${title}</span>
    <div id="pr_tableau_title_counters_${playerId}" class="pr_tableau_title_icon_container"></div>
  </div>
  <div class="pr_player_tableau_cards_container" data-overlap="${overlap}">
    <div id="tableau_west_${playerId}" class="pr_player_board_tableau_cards" data-region="west" data-overlap="${overlap}" data-overlap-empire-squares="${overlapEmpireSquares}"></div>
    <div class="pr_player_board_container">
      <div id="old_maids_${playerId}" class="pr_old_maids_container"></div>
      <div id="player_bank_board_${playerId}" class="pr_player_board" data-color="${COLOR_MAP[player.color]}"></div>
    </div>

    <div id="tableau_east_${playerId}" class="pr_player_board_tableau_cards" data-region="east" data-overlap="${overlap}" data-overlap-empire-squares="${overlapEmpireSquares}"></div>
  </div>
    `;
};
