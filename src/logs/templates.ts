/* ------- DEFAULT LOG TOKENS ------- */

const tlpLogTokenBoldText = ({ text }) =>
  `<span style="font-weight: 700;">${_(text)}</span>`;

const tplLogTokenPlayerName = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) => `<span class="playername" style="color:#${color};">${name}</span>`;

/* ------- GAME SPECIFIC LOG TOKENS ------- */
