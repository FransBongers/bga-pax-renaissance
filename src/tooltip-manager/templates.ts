const tplCardTooltipContainer = ({
  card,
  content,
  style,
}: {
  card: string;
  content: string;
  style?: string;
}): string => {
  return `<div class="pr_card_tooltip"${style ? ` style="${style}"` : ""}>
  <div class="pr_card_tooltip_inner_container">
    ${content}
  </div>
  ${card}
</div>`;
};

const tplOneShotSection = ({
  oneShot,
  suitors,
}: {
  oneShot: string;
  suitors?: string[];
}) => {
  return `
  <div style="margin-right: 20%;">
  <span class="pr_section_title">${_("One-shot")}</span>
  ${tplOneShotRow({ oneShot })}
  </div>
  ${
    suitors
      ? `<div style="display: flex; flex-direction: column;">
    <span class="pr_section_title">${_("Suitors")}</span>
    ${suitors
      .map((suitor) => `<span>${EMPIRE_NAME_MAP[suitor]}</span>`)
      .join("")}
    </div>`
      : ""
  }`;
};

const tplAgentsSection = ({ agents }: { agents: Agent[] }) => {
  const agentIcons: Record<string, number> = {};
  agents.forEach((agent) => {
    const identifier =
      agent.type === PAWN ? PAWN : `${agent.separator}_${agent.type}`;
    if (agentIcons[identifier]) {
      agentIcons[identifier] = agentIcons[identifier] + 1;
    } else {
      agentIcons[identifier] = 1;
    }
  });

  return `
  <div>
  <span class="pr_section_title">${_("Agents")}</span>
  ${Object.entries(agentIcons)
    .map(([id, count]) =>
      tplAgentsRow({ agentIcon: `${id}_${id === PAWN ? 1 : count}` })
    )
    .join("")}
  </div>
`;
};

const tplAgentsRow = ({ agentIcon }: { agentIcon: string }) => {
  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_agent_icon" data-agent-icon="${agentIcon}"></div>
  </div>
</div>`;
};

const tplCardLocation = ({ location }: { location: string }) => {
  return `<div class="pr_card_tooltip_row" style="align-items: center; font-weight: bold;">
  <div class="pr_card_tooltip_row_icon">
  <div class="pr_empire_icon" data-empire-id="${location}"></div>
  </div>
  <span>${EMPIRE_NAME_MAP[location]}</span>
</div>`;
};

const tplPrestigeRow = ({ prestige }: { prestige: string }) => {
  const prestigeTextMap = {
    [CATHOLIC]: _(
      "Catholic: Religion that recognizes the pope as the centralized authority. Counts for Holy Victory."
    ),
    [ISLAMIC]: _(
      "Islam: Religion that uses the koran as its authority. Counts for Holy Victory."
    ),
    [REFORMIST]: _(
      "Reformist: Religion that uses the bible/tanakh rather than the pope as its authority. Counts for Holy Victory."
    ),
    [DISCOVERY]: _(
      "Discovery: The doctrine of maritime exploration and imperialism. Counts for Globalization Victory."
    ),
    [LAW]: _(
      "Law - A constitution that recognizes rules of nature rather than humans as its authority. Counts for Renaissance Victory."
    ),
    [PATRON]: _(
      "Patron. A financial sponsor of the artistic Renaissance. Counts for Patron Victory."
    ),
  };
  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_icon pr_prestige_icon" data-icon="prestige_${prestige}"></div>
  </div>
  <span>${prestigeTextMap[prestige]}</span>
</div>`;
};

const tplOneShotRow = ({ oneShot }: { oneShot: string }) => {
  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_one_shot" data-one-shot-id="${oneShot}"></div>
  </div>
</div>`;
};

const tplOpsRow = ({ op }: { op: TableauOp }) => {
  const corsairText = _(
    "Use this Op to move ${religion} Pirate in a Sea Border this card's Location to another Sea Border either in this card's Location or an Adjacent Location sharing a Sea Border."
  );
  const repressText = _(
    "Use this Op to remove one ${token} of any color in this card's Location and place it as a Repressed Token on its corresponding Empire Square"
  );
  const voteOpText = _(
    "Use this Op to cause a Regime Change in ${region} Empire. Its Empire Square can be in any Tableau, but it cannot be a Vassal."
  );

  const opTextMap = {
    [BEHEAD_OP]: _(
      "Use this Op to Discard one card in any Tableau. The Location of the beheaded card must share that of the acting card."
    ),
    [CAMPAIGN_OP]: _(
      "Use this Op to create a Battle in a defending Empire Adjacent to this King's Location"
    ),
    [COMMERCE_OP_EAST]: _(
      "Use this Op to take one Florin from any card (including trade fair cards) in the East."
    ),
    [COMMERCE_OP_WEST]: _(
      "Use this Op to take one Florin from any card (including trade fair cards) in the West."
    ),
    [CORSAIR_OP_CATHOLIC]: corsairText.replace("${religion}", _("a Catholic")),
    [CORSAIR_OP_ISLAMIC]: corsairText.replace("${religion}", _("an Islamic")),
    [CORSAIR_OP_REFORMIST]: corsairText.replace(
      "${religion}",
      _("a Reformist")
    ),
    [INQUISITOR_OP_CATHOLIC]: _("Use this Op to move a Catholic Bishop Token."),
    [INQUISITOR_OP_ISLAMIC]: _("Use this Op to move an Islamic Bishop Token."),
    [INQUISITOR_OP_REFORMIST]: _(
      "Use this Op to move a Reformist Bishop Token."
    ),
    [REPRESS_OP_KNIGHT]: repressText.replace("${token}", _("Knight")),
    [REPRESS_OP_PAWN]: repressText.replace("${token}", _("Pawn")),
    [REPRESS_OP_PAWN_KNIGHT]: repressText.replace(
      "${token}",
      _("Pawn or Knight")
    ),
    [REPRESS_OP_PAWN_ROOK]: repressText.replace("${token}", _("Pawn or Rook")),
    [REPRESS_OP_PAWN_ROOK_KNIGHT]: repressText.replace(
      "${token}",
      _("Pawn, Rook or Knight")
    ),
    [REPRESS_OP_ROOK]: repressText.replace("${token}", _("Rook")),
    [REPRESS_OP_ROOK_KNIGHT]: repressText.replace(
      "${token}",
      _("Rook or Knight")
    ),
    [SIEGE_OP]: _(
      "Use this Op to Kill one Rook, Knight, or Pirate of any color in this card's Location."
    ),
    [TAX_OP]: _(
      "Use this Op to tax one Concession bordering the Location this card."
    ),
    [VOTE_OP_EAST]: voteOpText.replace("${region}", _("an East")),
    [VOTE_OP_WEST]: voteOpText.replace("${region}", _("a West")),
  };

  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_tableau_op" data-tableau-op-id="${op.id}"></div>
    
  </div>
  <div class="pr_tooltip_row_text">
    ${
      op.flavorText
        ? `<span class="pr_flavor_text">${_(op.flavorText)}</span>`
        : ""
    }
    <span>${opTextMap?.[op.id] || ""}</span>
  </div>
</div>`;
};

// <div class="pr_title_row">
// ${card?.empire ? tplCardLocation({location: card.empire}) : ""}

// </div>

const tplTableauCardTooltip = ({
  card,
  game,
}: {
  card: TableauCard | QueenCard;
  game: PaxRenaissanceGame;
}) => {
  // const dataCardId = card.id.split('_')[0];
  // console.log('dataCardId',dataCardId);
  return tplCardTooltipContainer({
    card: `<div class="pr_card" data-card-id="${card.id.split("_")[0]}"></div>`,
    content: `
    <span class="pr_title">${_(card.name)}</span>
      ${card.flavorText
        .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
        .join("")}
      ${card?.empire ? tplCardLocation({ location: card.empire }) : ""}
      ${
        card.prestige && card.prestige.length > 0
          ? `<span class="pr_section_title">${_("Prestige")}</span>`
          : ""
      }
      ${(card.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join("")}
      ${
        card.ops && card.ops.length > 0
          ? `<span class="pr_section_title">${_("Ops")}</span>`
          : ""
      }
      ${(card.ops || []).map((op) => tplOpsRow({ op })).join("")}
      <div style="display: flex; flex-direction: row;">
        ${
          card.oneShot
            ? tplOneShotSection({
                oneShot: card.oneShot,
                suitors: (card as QueenCard)?.suitors as string[] | undefined,
              })
            : ""
        }
        ${card.agents ? tplAgentsSection({ agents: card.agents }) : ""}
      </div>
      ${(card.specialAbilities || [])
        .map(
          (specialAbility) => `
        <span class="pr_section_title">${
          specialAbility.title ? _(specialAbility.title) : _("Ability")
        }</span>
        <span class="pr_section_text">${game.format_string_recursive(
          _(specialAbility.text.log),
          specialAbility.text.args
        )}</span>
      `
        )
        .join("")}
    `,
  });
};

const tplEmireCardTooltip = ({
  card,
  ageOfReformationPromo = false,
  religion,
}: {
  card: EmpireCard;
  ageOfReformationPromo?: boolean;
  religion?: string;
}) => {
  return tplCardTooltipContainer({
    card: `<div class="pr_square_card_tooltip_card_container">
      <div class="pr_square_card" data-card-id="${card.id}_king"${
      ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : ""
    }${
      religion ? ` data-religion="${religion}"` : ""
    } style="margin-bottom: 16px;"></div>
      <div class="pr_square_card" data-card-id="${card.id}_republic"${
      ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : ""
    }></div>
    </div>`,
    content: `
    <span class="pr_title">${_(card.king.name)}</span>
    ${card.king.flavorText
      .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
      .join("")}
      ${
        card.king.prestige && card.king.prestige.length > 0
          ? `<span class="pr_section_title">${_("Prestige")}</span>`
          : ""
      }
      ${(card.king.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join("")}
      ${
        card.king.ops && card.king.ops.length > 0
          ? `<span class="pr_section_title">${_("Ops")}</span>`
          : ""
      }
      ${(card.king.ops || []).map((op) => tplOpsRow({ op })).join("")}
    <span class="pr_title" style="margin-top: 32px;">${_(
      card.republic.name
    )}</span>
    ${card.republic.flavorText
      .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
      .join("")}
      ${
        card.republic.prestige && card.republic.prestige.length > 0
          ? `<span class="pr_section_title">${_("Prestige")}</span>`
          : ""
      }
      ${(card.republic.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join("")}
      ${
        card.republic.ops && card.republic.ops.length > 0
          ? `<span class="pr_section_title">${_("Ops")}</span>`
          : ""
      }
      ${(card.republic.ops || []).map((op) => tplOpsRow({ op })).join("")}
    `,
  });
};

const tplVictoryCardTooltip = ({
  card,
  game,
}: {
  card: VictoryCard;
  game: PaxRenaissanceGame;
}) => {
  return tplCardTooltipContainer({
    style: "min-height: 250px; width: 350px;",
    card: `<div class="pr_square_card_tooltip_card_container">
      <div class="pr_square_card" data-card-id="${card.location}_active"></div>
    </div>`,
    content: `
      <span class="pr_title">${_(card.active.title)}</span>
      ${card.text
        .map(
          (text: Log) => `
      <span class="pr_section_text">${game.format_string_recursive(
        _(text.log),
        text.args
      )}</span>
    `
        )
        .join("")}
    `,
  });
};

const tplTooltipWithIcon = ({
  title,
  text,
  iconHtml,
  iconWidth,
}: {
  title?: string;
  text: string;
  iconHtml: string;
  iconWidth?: number;
}): string => {
  return `<div class="pr_icon_tooltip">
            <div class="pr_icon_tooltip_icon"${
              iconWidth ? `style="min-width: ${iconWidth}px;"` : ""
            }>
              ${iconHtml}
            </div>
            <div class="pr_icon_tooltip_content">
              ${title ? `<span class="pr_tooltip_title" >${title}</span>` : ""}
              <span class="pr_tooltip_text">${text}</span>
            </div>
          </div>`;
};
