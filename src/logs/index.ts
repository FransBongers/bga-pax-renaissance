// Default
const LOG_TOKEN_BOLD_TEXT = "boldText";
const LOG_TOKEN_CARD_NAME = "cardName";
const LOG_TOKEN_NEW_LINE = "newLine";
const LOG_TOKEN_PLAYER_NAME = "playerName";
// Game specific
const LOG_TOKEN_CARD = "card";
const LOG_TOKEN_FLORIN = "florin";
const LOG_TOKEN_MAP_TOKEN = "mapToken";
const LOG_TOKEN_ONE_SHOT = "oneShot";
const LOG_TOKEN_PRESTIGE = 'prestige'
const LOG_TOKEN_TABLEAU_OP = 'tableauOp'
// const LOG_TOKEN_PAWN = "pawn";

let tooltipIdCounter = 0;

const getTokenDiv = ({
  key,
  value,
  game,
}: {
  key: string;
  value: string;
  game: PaxRenaissanceGame;
}) => {
  const splitKey = key.split("_");
  const type = splitKey[1];
  switch (type) {
    case LOG_TOKEN_CARD:
      game.tooltipsToMap.push([game._last_tooltip_id, value]);
      const tooltipId = `pr_tooltip_${game._last_tooltip_id}`;
      game._last_tooltip_id++;
      return tplLogTokenCard(value, tooltipId);
    case LOG_TOKEN_BOLD_TEXT:
    case LOG_TOKEN_CARD_NAME:
      return tlpLogTokenBoldText({ text: value });
    case LOG_TOKEN_FLORIN:
      return tplIcon({ icon: "florin" });
    case LOG_TOKEN_NEW_LINE:
      return "<br>";
    case LOG_TOKEN_MAP_TOKEN:
      const mtValue = value.split("_");
      return tplToken({ type: mtValue[1], separator: mtValue[0] })
    case LOG_TOKEN_ONE_SHOT:
      return tplOneShot({ oneShot: value });
    // case LOG_TOKEN_PAWN:
    case LOG_TOKEN_PLAYER_NAME:
      const player =
        value === "${you}"
          ? game.playerManager.getPlayer({ playerId: game.getPlayerId() })
          : game.playerManager
              .getPlayers()
              .find((player) => player.getName() === value);
      return player
        ? tplLogTokenPlayerName({
            name: value === "${you}" ? _("You") : player.getName(),
            color: player.getHexColor(),
          })
        : value;
    case LOG_TOKEN_PRESTIGE:
      return tplIcon({icon: `prestige_${value}`, classes: 'pr_prestige_icon'})
    case LOG_TOKEN_TABLEAU_OP:
      return tplTableauOp({ tableauOpId: value });
    default:
      return value;
  }
};

const tknFlorin = () => {
  return _("Florin(s)");
};

const tknMapToken = (tokenId: string) => {
  const split = tokenId.split("_");
  return `${split[1]}_${split[0]}`;
};

const tplLogTokenCard = (id: string, tooltipId: string) => {
  const className = id.startsWith('EmpireSquare') ? 'pr_square_card' : 'pr_card';
  return `<div id="${tooltipId}" class="${className}" data-card-id="${id}"></div>`
}