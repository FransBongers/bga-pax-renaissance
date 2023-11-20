const LOG_TOKEN_BOLD_TEXT = "boldText";
const LOG_TOKEN_CARD_NAME = "cardName";
const LOG_TOKEN_NEW_LINE = "newLine";
const LOG_TOKEN_PLAYER_NAME = "playerName";
const LOG_TOKEN_FLORIN = "florin";

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
    case LOG_TOKEN_BOLD_TEXT:
    case LOG_TOKEN_CARD_NAME:
      return tlpLogTokenBoldText({ text: value });
    case LOG_TOKEN_FLORIN:
      return tplIcon({ icon: "florin" });
    case LOG_TOKEN_NEW_LINE:
      return "<br>";
    case LOG_TOKEN_PLAYER_NAME:
      const player =
        value === "${you}"
          ? game.playerManager.getPlayer({ playerId: game.getPlayerId() })
          : game.playerManager
              .getPlayers()
              .find((player) => player.getName() === value);
      return player
        ? tplLogTokenPlayerName({
            name: value === "${you}" ? _('You') : player.getName(),
            color: player.getHexColor(),
          })
        : value;
    default:
      return value;
  }
};
