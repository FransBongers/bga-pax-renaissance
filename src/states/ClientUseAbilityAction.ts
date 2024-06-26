class ClientUseAbilityActionState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringClientUseAbiltyActionArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringClientUseAbiltyActionArgs) {
    this.args = args;
    if (args.selected) {
      this.updateInterfaceConfirm({
        cardId: args.selected.cardId,
        ability: args.selected.abilityAction,
      });
    } else if (Object.entries(this.args.abilityActions).length === 1) {
      const [cardId, ability] = Object.entries(this.args.abilityActions)[0];
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
      text: _("${you} must select an action"),
      args: {
        you: "${you}",
      },
    });

    this.addActionButtons();
    this.setAbilityActionsSelectable();
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
    this.game.setLocationSelected({id: `${cardId}_${ability.id}`})

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
    Object.entries(this.args.abilityActions).forEach(
      ([cardId, ability], index) => {
        this.game.addPrimaryActionButton({
          id: `abiliy_action_${index}_btn`,
          text: _(ability.title).replace(":", ""),
          callback: () => this.updateInterfaceConfirm({ cardId, ability }),
        });
      }
    );
  }

  private setAbilityActionsSelectable() {
    Object.entries(this.args.abilityActions).forEach(([cardId, ability]) => {
      this.game.setLocationSelectable({
        id: `${cardId}_${ability.id}`,
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
