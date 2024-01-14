const tplOpenHandsButton =
  () => `<button id="pr_open_hands_button" type="button" class="pr_button">
<div class="pr_icon"></div>
</button>`;

const tplOpenHandCard = ({ card }: { card: TableauCard }) => {
  return `<div id="${card.id}-modal" class="pr_card" data-card-id="${
    card.id.split("_")[0]
  }"></div>`;
};

const tplOpenHandPlayerData = ({
  playerName,
  cards,
  game,
}: {
  game: PaxRenaissanceGame;
  playerName: string;
  cards: TableauCard[];
}) => {
  const titleText = _("${tkn_playerName}");
  const title = game.format_string_recursive(titleText, {
    tkn_playerName: playerName,
  });
  return `
  <div class="pr_open_hands_modal_player_container">
    <h2>${title}</h2>
    <div class="pr_open_hands_modal_cards_container">
      ${cards.map((card) => tplOpenHandCard({ card })).join("")}
    </div>
  </div>
`;
};

const tplOpenHandsModal = ({
  data,
  game,
}: {
  game: PaxRenaissanceGame;
  data: { playerName: string; cards: TableauCard[] }[];
}) =>
  data
    .map((playerData) => tplOpenHandPlayerData({ game, ...playerData }))
    .join("");
