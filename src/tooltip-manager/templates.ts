const getEmpireName = (empireId: string) => {
  const map = {
    [EAST]: _('The East'),
    [WEST]: _('The West'),
    [ARAGON]: _('Aragon'),
    [BYZANTIUM]: _('Byzantium'),
    [ENGLAND]: _('England'),
    [FRANCE]: _('France'),
    [HOLY_ROMAN_EMIRE]: _('Holy Roman Empire'),
    [HUNGARY]: _('Hungary'),
    [MAMLUK]: _('Mamluk'),
    [OTTOMAN]: _('Ottoman'),
    [PAPAL_STATES]: _('Papal States'),
    [PORTUGAL]: _('Portugal'),
  };
  return map[empireId];
};

const tplCardTooltipContainer = ({
  card,
  content,
  style,
}: {
  card: string;
  content: string;
  style?: string;
}): string => {
  return `<div class="pr_card_tooltip"${style ? ` style="${style}"` : ''}>
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
    <span class="pr_section_title">${_('One-shot')}</span>
    ${tplOneShotRow({ oneShot })}
  ${suitors ? tplSuitorsRow({ suitors }) : ''}
  `;
};

const tplSuitorsRow = ({ suitors }: { suitors: string[] }) => `
<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
  </div>
  <div class="pr_tooltip_row_text">
  <span class="pr_flavor_text">${_('Suitors')}</span>
  ${suitors
    .map(
      (suitor) =>
        `<span>${_('• ${empireName}').replace(
          '${empireName}',
          _(getEmpireName(suitor))
        )}</span>`
    )
    .join('')}
  </div>
</div>`;

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
  <span class="pr_section_title">${_('Agents')}</span>
  ${Object.entries(agentIcons)
    .map(([id, count]) => tplAgentsRow({ id, count }))
    .join('')}
`;
};

const tplAgentsRow = ({ id, count }: { id: string; count: number }) => {
  const agentIcon = `${id}_${id === PAWN ? 1 : count}`;
  const text = {
    [`${CATHOLIC}_${BISHOP}`]: {
      [1]: _('One Catholic Bishop'),
      [2]: _('Two Catholic Bishops'),
    },
    [`${ISLAMIC}_${BISHOP}`]: {
      [1]: _('One Islamic Bishop'),
      [2]: _('Two Islamic Bishops'),
    },
    [`${REFORMIST}_${BISHOP}`]: {
      [1]: _('One Reformist Bishop'),
      [2]: _('Two Reformist Bishops'),
    },
    [`${CATHOLIC}_${KNIGHT}`]: {
      [1]: _('One Catholic Knight'),
      [2]: _('Two Catholic Knights'),
    },
    [`${ISLAMIC}_${KNIGHT}`]: {
      [1]: _('One Islamic Knight'),
      [2]: _('Two Islamic Knights'),
    },
    [`${REFORMIST}_${KNIGHT}`]: {
      [1]: _('One Reformist Knight'),
      [2]: _('Two Reformist Knights'),
    },
    [PAWN]: {
      [1]: _('One Pawn'),
      [2]: _('Two Pawns'),
    },
    [`${CATHOLIC}_${PIRATE}`]: {
      [1]: _('One Catholic Pirate'),
      [2]: _('Two Catholic Pirates'),
    },
    [`${ISLAMIC}_${PIRATE}`]: {
      [1]: _('One Islamic Pirate'),
      [2]: _('Two Islamic Pirates'),
    },
    [`${REFORMIST}_${PIRATE}`]: {
      [1]: _('One Reformist Pirate'),
      [2]: _('Two Reformist Pirates'),
    },
    [`${CATHOLIC}_${ROOK}`]: {
      [1]: _('One Catholic Rook'),
      [2]: _('Two Catholic Rooks'),
    },
    [`${ISLAMIC}_${ROOK}`]: {
      [1]: _('One Islamic Rook'),
      [2]: _('Two Islamic Rooks'),
    },
    [`${REFORMIST}_${ROOK}`]: {
      [1]: _('One Reformist Rook'),
      [2]: _('Two Reformist Rooks'),
    },
  };

  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_agent_icon" data-agent-icon="${agentIcon}"${
    id === PAWN && count === 2 ? 'style="margin-left: -12px;"' : ''
  }></div>
    ${
      id === PAWN && count === 2
        ? `<div class="pr_agent_icon" data-agent-icon="${agentIcon}" style="margin-left: -23px; margin-right: -15px;"></div>`
        : ''
    }
  </div>
  <div class="pr_tooltip_row_text" style="margin-top: 12px;">
    <span>${text[id][count]}</span>
  </div>
</div>`;
};

const tplCardLocation = ({ location }: { location: string }) => {
  return `<div class="pr_card_tooltip_row" style="align-items: center; font-weight: bold;">
  <div class="pr_card_tooltip_row_icon">
  <div class="pr_empire_icon" data-empire-id="${location}"></div>
  </div>
  <span>${_(getEmpireName(location))}</span>
</div>`;
};

const tplPrestigeRow = ({ prestige }: { prestige: string }) => {
  const prestigeTextMap = {
    [CATHOLIC]: _(
      'Catholic: Religion that recognizes the pope as the centralized authority. Counts for Holy Victory.'
    ),
    [ISLAMIC]: _(
      'Islam: Religion that uses the koran as its authority. Counts for Holy Victory.'
    ),
    [REFORMIST]: _(
      'Reformist: Religion that uses the bible/tanakh rather than the pope as its authority. Counts for Holy Victory.'
    ),
    [DISCOVERY]: _(
      'Discovery: The doctrine of maritime exploration and imperialism. Counts for Globalization Victory.'
    ),
    [LAW]: _(
      'Law - A constitution that recognizes rules of nature rather than humans as its authority. Counts for Renaissance Victory.'
    ),
    [PATRON]: _(
      'Patron. A financial sponsor of the artistic Renaissance. Counts for Patron Victory.'
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
  const titleMap = {
    APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT: _('Apostasy'),
    APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT: _('Apostasy'),
    APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT: _('Apostasy'),
    CONSPIRACY_ONE_SHOT: _('Conspiracy'),
    CORONATION_ONE_SHOT: _('Coronation'),
    CRUSADE_ONE_SHOT: _('Crusade'),
    JIHAD_ONE_SHOT: _('Jihad'),
    PEASANT_REVOLT_ONE_SHOT: _('Peasant Revolt'),
    REFORMATION_ONE_SHOT: _('Reformation'),
    TRADE_SHIFT_NOVGOROD_ONE_SHOT: _('Trade Shift'),
    TRADE_SHIFT_RED_SEA_ONE_SHOT: _('Trade Shift'),
    TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT: _('Trade Shift'),
    TRADE_SHIFT_TIMBUKTU_ONE_SHOT: _('Trade Shift'),
  };

  const infoMap = {
    APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT: _(
      'Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'
    ),
    APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT: _(
      'Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'
    ),
    APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT: _(
      'Each player who has cards with Prestige icons of both indicated Religions in their Tableau must Discard all these cards.'
    ),
    CONSPIRACY_ONE_SHOT: _(
      "Launch a Conspiracy in this card's Location. This creates a Battle."
    ),
    CORONATION_ONE_SHOT: _(
      "Marry this Queen to a King. The King must be an Empire contained in the Queen's list of suitors, and must be unmarried, either in his Throne or in your Tableau."
    ),
    CRUSADE_ONE_SHOT: _(
      "Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."
    ),
    JIHAD_ONE_SHOT: _(
      "Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."
    ),
    PEASANT_REVOLT_ONE_SHOT: _(
      "Launch a Peasant Revolt in this card's Location. This creates a Battle."
    ),
    REFORMATION_ONE_SHOT: _(
      "Launch a Religious War in this card's Location. This creates a Battle between Believers and Heretics."
    ),
    TRADE_SHIFT_NOVGOROD_ONE_SHOT: _(
      'Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'
    ),
    TRADE_SHIFT_RED_SEA_ONE_SHOT: _(
      'Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'
    ),
    TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT: _(
      'Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color. You must have at least one Discovery Prestige in your Tableau to activate this.'
    ),
    TRADE_SHIFT_TIMBUKTU_ONE_SHOT: _(
      'Move the busted disk covering the specified Emporium to cover the uncovered Emporium of the same color.'
    ),
  };

  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_one_shot" data-one-shot-id="${oneShot}"></div>
  </div>
  <div class="pr_tooltip_row_text">
  ${`<span class="pr_flavor_text">${
    titleMap[oneShot] ? titleMap[oneShot] : ''
  }</span>`}
  <span>${infoMap[oneShot] ? infoMap[oneShot] : ''}</span>
</div>
</div>`;
};

const tplOpsRow = ({ op }: { op: TableauOp }) => {
  const corsairText = _(
    "Use this Op to move ${religion} Pirate in a Sea Border this card's Location to another Sea Border either in this card's Location or an Adjacent Location sharing a Sea Border."
  );
  const repressText = _(
    "Use this Op to remove one ${token} of any color in this card's Location and place it as a Repressed Token on its corresponding Empire Square. Gain one Florin from China."
  );
  const voteOpText = _(
    'Use this Op to cause a Regime Change in ${region} Empire. Its Empire Square can be in any Tableau, but it cannot be a Vassal.'
  );

  const opTextMap = {
    [BEHEAD_OP]: _(
      'Use this Op to Discard one card in any Tableau. The Location of the beheaded card must share that of the acting card.'
    ),
    [CAMPAIGN_OP]: _(
      "Use this Op to create a Battle in a defending Empire Adjacent to this King's Location."
    ),
    [COMMERCE_OP_EAST]: _(
      'Use this Op to take one Florin from any card (including trade fair cards) in the East.'
    ),
    [COMMERCE_OP_WEST]: _(
      'Use this Op to take one Florin from any card (including trade fair cards) in the West.'
    ),
    [CORSAIR_OP_CATHOLIC]: corsairText.replace('${religion}', _('a Catholic')),
    [CORSAIR_OP_ISLAMIC]: corsairText.replace('${religion}', _('an Islamic')),
    [CORSAIR_OP_REFORMIST]: corsairText.replace(
      '${religion}',
      _('a Reformist')
    ),
    [INQUISITOR_OP_CATHOLIC]: _('Use this Op to move a Catholic Bishop Token.'),
    [INQUISITOR_OP_ISLAMIC]: _('Use this Op to move an Islamic Bishop Token.'),
    [INQUISITOR_OP_REFORMIST]: _(
      'Use this Op to move a Reformist Bishop Token.'
    ),
    [REPRESS_OP_KNIGHT]: repressText.replace('${token}', _('Knight')),
    [REPRESS_OP_PAWN]: repressText.replace('${token}', _('Pawn')),
    [REPRESS_OP_PAWN_KNIGHT]: repressText.replace(
      '${token}',
      _('Pawn or Knight')
    ),
    [REPRESS_OP_PAWN_ROOK]: repressText.replace('${token}', _('Pawn or Rook')),
    [REPRESS_OP_PAWN_ROOK_KNIGHT]: repressText.replace(
      '${token}',
      _('Pawn, Rook or Knight')
    ),
    [REPRESS_OP_ROOK]: repressText.replace('${token}', _('Rook')),
    [REPRESS_OP_ROOK_KNIGHT]: repressText.replace(
      '${token}',
      _('Rook or Knight')
    ),
    [SIEGE_OP]: _(
      "Use this Op to Kill one Rook, Knight, or Pirate of any color in this card's Location."
    ),
    [TAX_OP]: _(
      'Use this Op to tax one Concession bordering the Location this card.'
    ),
    [VOTE_OP_EAST]: voteOpText.replace('${region}', _('an East')),
    [VOTE_OP_WEST]: voteOpText.replace('${region}', _('a West')),
  };

  const opNameMap = {
    [BEHEAD_OP]: _('Behead'),
    [CAMPAIGN_OP]: _('Campaign'),
    [COMMERCE_OP_EAST]: _('Commerce'),
    [COMMERCE_OP_WEST]: _('Commerce'),
    [CORSAIR_OP_CATHOLIC]: _('Corsair'),
    [CORSAIR_OP_ISLAMIC]: _('Corsair'),
    [CORSAIR_OP_REFORMIST]: _('Corsair'),
    [INQUISITOR_OP_CATHOLIC]: _('Inquisitor'),
    [INQUISITOR_OP_ISLAMIC]: _('Inquisitor'),
    [INQUISITOR_OP_REFORMIST]: _('Inquisitor'),
    [REPRESS_OP_KNIGHT]: _('Repress'),
    [REPRESS_OP_PAWN]: _('Repress'),
    [REPRESS_OP_PAWN_KNIGHT]: _('Repress'),
    [REPRESS_OP_PAWN_ROOK]: _('Repress'),
    [REPRESS_OP_PAWN_ROOK_KNIGHT]: _('Repress'),
    [REPRESS_OP_ROOK]: _('Repress'),
    [REPRESS_OP_ROOK_KNIGHT]: _('Repress'),
    [SIEGE_OP]: _('Siege'),
    [TAX_OP]: _('Tax'),
    [VOTE_OP_EAST]: _('Vote'),
    [VOTE_OP_WEST]: _('Vote'),
  };

  const opTitleFormat = op.flavorText
    ? _('${opName} - ${opFlavorText}')
    : _('${opName}');

  const opTitle = opTitleFormat
    .replace('${opName}', opNameMap[op.id])
    .replace('${opFlavorText}', op.flavorText ? _(op.flavorText) : '');

  return `<div class="pr_card_tooltip_row">
  <div class="pr_card_tooltip_row_icon">
    <div class="pr_tableau_op" data-tableau-op-id="${op.id}"></div>
    
  </div>
  <div class="pr_tooltip_row_text">
    <span class="pr_flavor_text">${opTitle}</span>
    <span>${opTextMap?.[op.id] || ''}</span>
  </div>
</div>`;
};

const tplTableauCardTooltip = ({
  card,
  game,
  imageOnly = false,
}: {
  card: TableauCard | QueenCard;
  game: PaxRenaissanceGame;
  imageOnly?: boolean;
}) => {
  const cardHtml = `<div class="pr_card" data-card-id="${
    card.id.split('_')[0]
  }"></div>`;
  if (imageOnly) {
    return `<div style="--paxRenCardScale: 1.7;">${cardHtml}</div>`;
  }
  // const dataCardId = card.id.split('_')[0];
  // console.log('dataCardId',dataCardId);
  return tplCardTooltipContainer({
    card: cardHtml,
    content: `
    <span class="pr_title">${_(card.name)}</span>
      ${card.flavorText
        .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
        .join('')}
      ${card?.empire ? tplCardLocation({ location: card.empire }) : ''}
      ${
        card.prestige && card.prestige.length > 0
          ? `<span class="pr_section_title">${_('Prestige')}</span>`
          : ''
      }
      ${(card.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join('')}
      ${
        card.ops && card.ops.length > 0
          ? `<span class="pr_section_title">${_('Ops')}</span>`
          : ''
      }
      ${(card.ops || []).map((op) => tplOpsRow({ op })).join('')}
      ${
        card.oneShot
          ? tplOneShotSection({
              oneShot: card.oneShot,
              suitors: (card as QueenCard)?.suitors as string[] | undefined,
            })
          : ''
      }
      ${card.agents ? tplAgentsSection({ agents: card.agents }) : ''}
      ${(card.specialAbilities || [])
        .map(
          (specialAbility) => `
        <span class="pr_section_title">${
          specialAbility.title ? _(specialAbility.title) : _('Ability')
        }</span>
        <span class="pr_section_text">${game.format_string_recursive(
          _(specialAbility.text.log),
          specialAbility.text.args
        )}</span>
      `
        )
        .join('')}
    `,
  });
};

const tplEmireCardTooltip = ({
  card,
  ageOfReformationPromo = false,
  religion,
  imageOnly,
}: {
  card: EmpireCard;
  ageOfReformationPromo?: boolean;
  religion?: string;
  imageOnly?: boolean;
}) => {
  const cardHtml = `<div class="pr_square_card_tooltip_card_container">
  <div class="pr_square_card" data-card-id="${card.id}_king"${
    ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : ''
  }${
    religion ? ` data-religion="${religion}"` : ''
  } style="margin-bottom: 16px;"></div>
  <div class="pr_square_card" data-card-id="${card.id}_republic"${
    ageOfReformationPromo ? ' data-map-type="ageOfReformation"' : ''
  }></div>
</div>`;
  if (imageOnly) {
    return `<div style="--paxRenCardScale: 1.5;">${cardHtml}</div>`;
  }

  return tplCardTooltipContainer({
    card: cardHtml,
    content: `
    <span class="pr_title">${_(card.king.name)}</span>
    ${card.king.flavorText
      .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
      .join('')}
      ${
        card.king.prestige && card.king.prestige.length > 0
          ? `<span class="pr_section_title">${_('Prestige')}</span>`
          : ''
      }
      ${(card.king.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join('')}
      ${
        card.king.ops && card.king.ops.length > 0
          ? `<span class="pr_section_title">${_('Ops')}</span>`
          : ''
      }
      ${(card.king.ops || []).map((op) => tplOpsRow({ op })).join('')}
    <span class="pr_title" style="margin-top: 32px;">${_(
      card.republic.name
    )}</span>
    ${card.republic.flavorText
      .map((text) => `<span class="pr_flavor_text">${_(text)}</span>`)
      .join('')}
      ${
        card.republic.prestige && card.republic.prestige.length > 0
          ? `<span class="pr_section_title">${_('Prestige')}</span>`
          : ''
      }
      ${(card.republic.prestige || [])
        .map((prestige) => tplPrestigeRow({ prestige }))
        .join('')}
      ${
        card.republic.ops && card.republic.ops.length > 0
          ? `<span class="pr_section_title">${_('Ops')}</span>`
          : ''
      }
      ${(card.republic.ops || []).map((op) => tplOpsRow({ op })).join('')}
    `,
  });
};

const tplVictoryCardTooltip = ({
  card,
  game,
  imageOnly,
}: {
  card: VictoryCard;
  game: PaxRenaissanceGame;
  imageOnly?: boolean;
}) => {
  const cardHtml = `<div class="pr_square_card_tooltip_card_container">
  <div class="pr_square_card" data-card-id="${card.location}_active"></div>
</div>`;

  if (imageOnly) {
    return `<div style="--paxRenCardScale: 1.5;">${cardHtml}</div>`;
  }

  return tplCardTooltipContainer({
    style: 'min-height: 250px; width: 450px;',
    card: cardHtml,
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
        .join('')}
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
              iconWidth ? `style="min-width: ${iconWidth}px;"` : ''
            }>
              ${iconHtml}
            </div>
            <div class="pr_icon_tooltip_content">
              ${title ? `<span class="pr_tooltip_title" >${title}</span>` : ''}
              <span class="pr_tooltip_text">${text}</span>
            </div>
          </div>`;
};

const tplTextTooltip = ({ text }: { text: string }) => {
  return `<span class="pr_text_tooltip">${text}</span>`;
};
