const tplPlayerTableauContent = ({
  player,
  title,
}: {
  player: PaxRenaissancePlayerData;
  title: string;
}) => {
  const playerId = player.id;
  return `
  <div class="pr_player_tableau_title"><span>${title}</span></div>
  <div class="pr_player_tableau_cards_container">
    <div id="tableau_west_${playerId}" class="pr_player_board_tableau_cards" data-region="west"></div>
    <div class="pr_player_board" data-color="${COLOR_MAP[player.color]}"></div>
    <div id="tableau_east_${playerId}" class="pr_player_board_tableau_cards" data-region="east"></div>
  </div>
    `;
};
