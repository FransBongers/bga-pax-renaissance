const getBattleTableConfig = (): {
  headers: string[];
  rows: BattleTableRow[];
} => ({
  headers: [
    _("TYPE"),
    _("ATTACKER"),
    _("DEFENDER"),
    _("VICTOR PLACEMENT"),
    _("NON-STRAWMAN"),
    _("STRAWMAN"),
  ],
  rows: [
    {
      type: {
        iconType: "operation",
        icons: [CAMPAIGN_OP],
        text: _("CAMPAIGN"),
      },
      attacker: [
        _("• Knights in attacker's Location adjacent to target Empire"),
      ],
      defender: [_("• Knights / Rooks in target Empire")],
      victorPlacement: [
        _("• (optional) All Repressed Tokens"),
        _("• Bonus Concession"),
      ],
      nonStrawman: _("Place King as Vassal."),
      strawman: _("Not allowed."),
    },
    {
      type: {
        iconType: "oneShot",
        icons: [CONSPIRACY_ONE_SHOT],
        text: _("CONSPIRACY"),
      },
      attacker: [
        _("• Agents"),
        _("• Pirates bordering"),
        _("• Repressed Knights / Rooks"),
      ],
      defender: [_("• Knights / Rooks in card's Location")],
      victorPlacement: [
        _("• Agents"),
        _("• Repressed Knights / Rooks"),
        _("• (optional) Repressed Pawns"),
        _("• Bonus Concession"),
      ],
      nonStrawman: _(
        "Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop."
      ),
      strawman: _("Flip Empire Card."),
    },
    {
      type: {
        iconType: "oneShot",
        icons: [PEASANT_REVOLT_ONE_SHOT],
        text: _("PEASANT REVOLT"),
      },
      attacker: [
        _("• Agents"),
        _("• Pirates bordering"),
        _("• Your Concessions bordering"),
        _("• Repressed Pawns"),
      ],
      defender: [_("• Knights / Rooks in card's Location")],
      victorPlacement: [
        _("• Agents"),
        _("• Repressed Pawns"),
        _("• (optional) Repressed Knights / Rooks"),
        _("• Bonus Concession"),
      ],
      nonStrawman:
        _("Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop."),
      strawman: _("Flip Empire Card."),
    },
    {
      type: {
        iconType: "oneShot",
        icons: [CRUSADE_ONE_SHOT, JIHAD_ONE_SHOT, REFORMATION_ONE_SHOT],
        text: _("RELIGIOUS WAR"),
      },
      attacker: [
        _("• Agents (Knights & Rooks)"),
        _("• Believer Knights / Rooks in target"),
        _("• Believer Knights adjacent"),
        _("• Believer Pirates bordering"),
      ],
      defender: [
        _("• Heretic Knights / Rooks in card's Location"),
        _("• Heretic Pirates bordering"),
      ],
      victorPlacement: [
        _("• Agents"),
        _("• (optional) All Repressed Tokens"),
        _("• Bonus Concession"),
      ],
      nonStrawman: _(
        "Place King in your Tableau with Repressed and (if from Throne) Queen and Bishop. Change Map Card to the indicated Theocracy."
      ),
      strawman: _("Flip Empire Card."),
    },
  ],
});

const getOperationsConfig = (): {
  headers: string[];
  rows: OperationsOneShotsInfoRow[];
} => ({
  headers: ["", _("TARGET"), _("REQUIREMENT"), _("EFFECT")],
  rows: [
    {
      icons: [INQUISITOR_OP_CATHOLIC],
      target: _("Bishop of indicated religion"),
      effect: _(
        "Move to adjacent Tableau card or to card with same Location. If Bishop on card: Kill both. If Repressed Tokens on card: optional Kill one. On Card: Silence."
      ),
    },
    {
      icons: [COMMERCE_OP_EAST],
      target: _("Market (East or West)"),
      effect: _(
        "Take on Florin from any space in the market row specified (West/East)."
      ),
    },
    {
      icons: [BEHEAD_OP],
      target: _("Tableau Card with the card's Location"),
      effect: _(
        "Discard target card. Also discard itself if target is an Empire."
      ),
    },
    {
      icons: [TAX_OP],
      target: _("Concession bordering the card's Location"),
      requirement: _("Empire must have 1 or more empty Cities"),
      effect: _(
        "Target pays 1 Florin to China or is Repressed, Target places a Levy."
      ),
    },
    {
      icons: [REPRESS_OP_PAWN_ROOK_KNIGHT],
      target: _("Rook / Knight / Concession on Map with card's Location"),
      requirement: _("Must Repress 1 Token."),
      effect: _(
        "Move to Empire square as repressed Token. Gain 1 Florin from China."
      ),
    },
    {
      icons: [VOTE_OP_EAST],
      target: _("Empire card in Tableau, same EAST or WEST as card"),
      requirement: _(
        "Have Concession majority. Pay 1 Florin per Repressed Token. Empire not on a Throne, or be a Vassal."
      ),
      effect: _(
        "Regime Change. Golden Liberty (optional): change Map Card to medieval."
      ),
    },
    {
      icons: [CORSAIR_OP_CATHOLIC],
      target: _("Pirate bordering the card's Location"),
      effect: _(
        "Move to any Sea Border on same or Adjacent Location sharing a Sea Border. Kill Pirate or Concession in the destination (if any)."
      ),
    },
    {
      icons: [SIEGE_OP],
      target: _("Rook / Knight / Pirate on Map with card's Location"),
      effect: _("Kill target."),
    },
    {
      icons: [CAMPAIGN_OP],
      target: _("Adjacent target Empire"),
      requirement: _("Pay 1 Florin per Attacker."),
      effect: _(
        "Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."
      ),
    },
  ],
});

const getOneShotsConfig = (): {
  headers: string[];
  rows: OperationsOneShotsInfoRow[];
} => ({
  headers: ["", _("TARGET"), _("REQUIREMENT"), _("EFFECT")],
  rows: [
    {
      icons: [
        TRADE_SHIFT_NOVGOROD_ONE_SHOT,
        TRADE_SHIFT_RED_SEA_ONE_SHOT,
        TRADE_SHIFT_TIMBUKTU_ONE_SHOT,
      ],
      target: _("Busted Disk on indicated Emporium"),
      effect: _(
        "New Trade Route. Move Busted disk to uncovered Emporium of the same color, Repressing Token."
      ),
    },
    {
      icons: [TRADE_SHIFT_SPICE_ISLAND_ONE_SHOT],
      target: _("Busted Disk on Spice Islands"),
      requirement: _(
        "Must have at least one Discovery Prestige in Tableau (not counting card being played)"
      ),
      effect: _(
        "New Trade Route. Move Busted disk to uncovered Emporium of the same color, Repressing Token."
      ),
    },
    {
      icons: [PEASANT_REVOLT_ONE_SHOT, CONSPIRACY_ONE_SHOT],
      target: _("Empire / Map Card on card's Location"),
      effect: _(
        "Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."
      ),
    },
    {
      icons: [CRUSADE_ONE_SHOT, JIHAD_ONE_SHOT, REFORMATION_ONE_SHOT],
      target: _("Empire / Map Card on card's Location"),
      requirement: _("Heretic(s) in target Empire."),
      effect: _(
        "Battle Casualties. If successful, Regime Change with Vassal. See Battle Table."
      ),
    },
    {
      icons: [
        APOSTASY_ISLAMIC_CATHOLIC_ONE_SHOT,
        APOSTASY_REFORMIST_CATHOLIC_ONE_SHOT,
        APOSTASY_REFORMIST_ISLAMIC_ONE_SHOT,
      ],
      target: _(
        "All players with both types of indicated Religious Prestige in Tableau"
      ),
      effect: _("Discard all Tableau cards with indicated Religious Prestige."),
    },
  ],
});
