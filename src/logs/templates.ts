/* ------- DEFAULT LOG TOKENS ------- */

const tlpLogTokenBoldText = ({
  text,
  tooltipId,
}: {
  text: string;
  tooltipId?: string;
}) =>
  `<span ${tooltipId ? `id="${tooltipId}"` : ""} style="font-weight: 700;">${_(
    text
  )}</span>`;

const tplLogTokenPlayerName = ({
  name,
  color,
}: {
  name: string;
  color: string;
}) =>
  `<span class="playername" ${
    COLORS_WITH_SHADOW.includes(COLOR_MAP[color]) ? 'data-shadow="true"' : ""
  } style="color:#${color};">${name}</span>`;

/* ------- GAME SPECIFIC LOG TOKENS ------- */
