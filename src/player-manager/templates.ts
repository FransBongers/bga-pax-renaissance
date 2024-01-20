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
