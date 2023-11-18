const tplPlayerPanel = ({playerId}: {playerId: number}) => {
  return `<div id="pr_player_panel_${playerId}" class="pr_player_panel">
            <div id="pr_player_panel_icons_${playerId}" class="pr_player_panel_icons"></div>
          </div>`
}

const tplPlayerTableauxContainer = ({
  playerOrder,
}: {
  playerOrder: number[];
}) => {
  console.log("playerOrderInTpl", playerOrder);
  return `
    <div id="pr_player_tableaux">
    ${playerOrder
      .map(
        (playerId) =>
          `<div id="pr_player_tableau_${playerId}" class="pr_player_tableau"></div>`
      )
      .join("")}
    </div>
  `;
};

const tplPlayerTableauContent = ({
  playerGamedatas,
}: {
  playerGamedatas: BgaPlayer;
}) => {
  const playerId = playerGamedatas.id;
  return `
  <div class="pr_player_tableau_title"><span>${(
    _("${playerName}'s tableau") as string
  ).replace("${playerName}", playerGamedatas.name)}</span></div>
  <div>
    <div class="pr_player_board" data-color="${COLOR_MAP[playerGamedatas.color]}"></div>
  </div>
    `;
};
