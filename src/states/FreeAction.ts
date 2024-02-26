class FreeActionState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringFreeActionArgs;

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringFreeActionArgs) {
    this.args = args;
    if (Object.entries(this.args.freeActions).length === 1) {
      this.updateInterfaceSingleOption();
    } else {
      this.updateInterfaceInitialStep();
    }
  }

  onLeavingState() {
    debug("Leaving FreeActionState");
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
    this.setAbilityActionsSelectable();
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may perform an action from an ability"),
      args: {
        tkn_playerName: "${you}",
      },
    });

    this.addActionButtons();
    this.game.addPassButton({ optionalAction: this.args.optionalAction });
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceConfirm({
    cardId,
    ability,
  }: {
    cardId: string;
    ability: Ability;
  }) {
    this.game.clearPossible();
    this.game.setLocationSelected({ id: `${cardId}_${ability.id}` });

    this.game.clientUpdatePageTitle({
      text: _("Perform ${actionTitle} action?"),
      args: {
        actionTitle: _(ability.title).replace(":", ""),
      },
    });

    const callback = () =>
      this.game.takeAction({
        action: "actFreeAction",
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

  private updateInterfaceSingleOption() {
    this.game.clearPossible();

    const [cardId, ability] = Object.entries(this.args.freeActions)[0];
    this.game.setLocationSelected({ id: `${cardId}_${ability.id}` });

    this.game.clientUpdatePageTitle({
      text: _("Perform ${actionTitle} action?"),
      args: {
        actionTitle: _(ability.title).replace(":", ""),
      },
    });
    this.game.addPrimaryActionButton({
      id: "free_action_button",
      text: _("Perform action"),
      callback: () =>
        this.game.takeAction({
          action: "actFreeAction",
          args: {
            action: "abilityAction",
            cardId,
            abilityId: ability.id,
          },
        }),
    });

    this.game.addPassButton({
      text: _("Do not perform action"),
      optionalAction: this.args.optionalAction,
    });
    this.game.addUndoButtons(this.args);
  }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private addActionButtons() {
    Object.entries(this.args.freeActions).forEach(
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
    Object.entries(this.args.freeActions).forEach(([cardId, ability]) => {
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
