class ClientUseAbilityActionState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringClientUseAbiltyActionArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringClientUseAbiltyActionArgs) {
    this.args = args;
    if (Object.entries(this.args).length === 1) {
      const [cardId, ability] = Object.entries(this.args)[0];
      this.updateInterfaceConfirm({ cardId, ability });
    } else {
      this.updateInterfaceInitialStep();
    }
  }

  onLeavingState() {
    debug("Leaving ClientUseAbilityActionState");
  }

  setDescription(activePlayerId: number) {}

  //  .####.##....##.########.########.########..########....###.....######..########
  //  ..##..###...##....##....##.......##.....##.##.........##.##...##....##.##......
  //  ..##..####..##....##....##.......##.....##.##........##...##..##.......##......
  //  ..##..##.##.##....##....######...########..######...##.....##.##.......######..
  //  ..##..##..####....##....##.......##...##...##.......#########.##.......##......
  //  ..##..##...###....##....##.......##....##..##.......##.....##.##....##.##......
  //  .####.##....##....##....########.##.....##.##.......##.....##..######..########

  // ..######..########.########.########...######.
  // .##....##....##....##.......##.....##.##....##
  // .##..........##....##.......##.....##.##......
  // ..######.....##....######...########...######.
  // .......##....##....##.......##..............##
  // .##....##....##....##.......##........##....##
  // ..######.....##....########.##.........######.

  private updateInterfaceInitialStep() {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} must select an action"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.addActionButtons();

    this.game.addCancelButton();
  }

  private updateInterfaceConfirm({
    cardId,
    ability,
  }: {
    cardId: string;
    ability: Ability;
  }) {
    this.game.clearPossible();

    this.game.clientUpdatePageTitle({
      text: _("Perform ${actionTitle} action?"),
      args: {
        actionTitle: _(ability.title).replace(":", ""),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actPlayerAction",
        args: {
          action: "abilityAction",
          cardId,
          abilityId: ability.id,
        },
      });

    if (
      this.game.settings.get({
        id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
      }) === ENABLED
    ) {
      callback();
    } else {
      this.game.addConfirmButton({
        callback,
      });
    }

    this.game.addCancelButton();
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private addActionButtons() {
    Object.entries(this.args).forEach(([cardId, ability], index) => {
      this.game.addPrimaryActionButton({
        id: `abiliy_action_${index}_btn`,
        text: _(ability.title).replace(":", ""),
        callback: () => this.updateInterfaceConfirm({ cardId, ability }),
      });
    });
  }

  //  ..######..##.......####..######..##....##
  //  .##....##.##........##..##....##.##...##.
  //  .##.......##........##..##.......##..##..
  //  .##.......##........##..##.......#####...
  //  .##.......##........##..##.......##..##..
  //  .##....##.##........##..##....##.##...##.
  //  ..######..########.####..######..##....##

  // .##.....##....###....##....##.########..##.......########..######.
  // .##.....##...##.##...###...##.##.....##.##.......##.......##....##
  // .##.....##..##...##..####..##.##.....##.##.......##.......##......
  // .#########.##.....##.##.##.##.##.....##.##.......######....######.
  // .##.....##.#########.##..####.##.....##.##.......##.............##
  // .##.....##.##.....##.##...###.##.....##.##.......##.......##....##
  // .##.....##.##.....##.##....##.########..########.########..######.
}
