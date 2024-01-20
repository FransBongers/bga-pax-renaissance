class BattleReconfigureConstantinopleState implements State {
  private game: PaxRenaissanceGame;
  private args: OnEnteringBattleReconfigureConstantinopleArgs;
  private constantinopleCities: ConstantinopleCityId[] = [
    CONSTANTINOPLE_1,
    CONSTANTINOPLE_2,
    CONSTANTINOPLE_3,
  ];

  private cityConfiguration: {
    constantinople1: Token | null;
    constantinople2: Token | null;
    constantinople3: Token | null;
  } = {
    [CONSTANTINOPLE_1]: null,
    [CONSTANTINOPLE_2]: null,
    [CONSTANTINOPLE_3]: null,
  };

  constructor(game: PaxRenaissanceGame) {
    this.game = game;
  }

  onEnteringState(args: OnEnteringBattleReconfigureConstantinopleArgs) {
    this.args = args;

    this.copyCityConfig();
    this.updateInterfaceInitialStep();
  }

  onLeavingState() {
    debug("Leaving BattleReconfigureConstantinopleState");
  }

  setDescription(activePlayerId: number) {
    this.game.clientUpdatePageTitle({
      text: _("${tkn_playerName} may move Tokens within Constantinople"),
      args: {
        tkn_playerName: this.game.playerManager
          .getPlayer({ playerId: activePlayerId })
          .getName(),
      },
      nonActivePlayers: true,
    });
  }

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
      text: _(
        "${tkn_playerName} must select a Token to move within Constantinople"
      ),
      args: {
        tkn_playerName: "${you}",
        // empireName: _(this.args.empire.name)
      },
    });

    // Object.keys(this.args.possibleLevies).forEach((cityId) => {
    //   this.game.setLocationSelectable({
    //     id: cityId,
    //     callback: () => this.updateInterfaceConfirmPlaceLevy({cityId}),
    //   });
    // });
    this.setTokensSelectable();
    this.checkConfirmAndResetButton();
    this.game.addPassButton({ optionalAction: this.args.optionalAction });
    this.game.addUndoButtons(this.args);
  }

  private updateInterfaceSelectPosition({
    cityId,
    token,
  }: {
    cityId: ConstantinopleCityId;
    token: Token;
  }) {
    this.game.clearPossible();
    this.game.setTokenSelected({ id: token.id });

    this.game.clientUpdatePageTitle({
      text: _(
        "${tkn_playerName} must select a spot to move to or Token to switch with"
      ),
      args: {
        tkn_playerName: "${you}",
        // empireName: _(this.args.empire.name)
      },
    });
    this.setDestinationsSelectable({ cityId });

    this.addResetButton();
  }

  // private updateInterfaceConfirmPlaceLevy({cityId}: {cityId: string;}) {
  //   this.game.clearPossible();
  //   this.game.setLocationSelected({id: cityId});
  //   const {separator, levyIcon} = this.args.possibleLevies[cityId].levy;
  //   this.game.clientUpdatePageTitle({
  //     text: _("Place ${tkn_mapToken} in ${cityName}?"),
  //     args: {
  //       tkn_mapToken: [separator, levyIcon].join('_'),
  //       cityName: _(this.args.possibleLevies[cityId].cityName)
  //     },
  //   });
  //   this.game.addConfirmButton({
  //     callback: () =>
  //       this.game.takeAction({
  //         action: "actPlaceLevySelectCity",
  //         args: {
  //           cityId,
  //         },
  //       }),
  //   });
  //   this.game.addCancelButton();
  // }

  //  .##.....##.########.####.##.......####.########.##....##
  //  .##.....##....##.....##..##........##.....##.....##..##.
  //  .##.....##....##.....##..##........##.....##......####..
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  .##.....##....##.....##..##........##.....##.......##...
  //  ..#######.....##....####.########.####....##.......##...

  private copyCityConfig() {
    this.constantinopleCities.forEach((cityId) => {
      this.cityConfiguration[cityId] = this.args[cityId];
    });
  }

  private checkConfirmAndResetButton() {
    const changes = this.constantinopleCities.some((cityId) => {
      return this.cityConfiguration[cityId]?.id !== this.args[cityId]?.id;
    });
    if (!changes) {
      return;
    }

    this.game.addConfirmButton({
      callback: () => {
        this.game.clearPossible();
        this.game.takeAction({
          action: "actBattleReconfigureContantinople",
          args: {
            [CONSTANTINOPLE_1]:
              this.cityConfiguration[CONSTANTINOPLE_1]?.id || null,
            [CONSTANTINOPLE_2]:
              this.cityConfiguration[CONSTANTINOPLE_2]?.id || null,
            [CONSTANTINOPLE_3]:
              this.cityConfiguration[CONSTANTINOPLE_3]?.id || null,
          },
        });
      },
    });
    this.addResetButton();
  }

  private addResetButton() {
    this.game.addDangerActionButton({
      id: "reset_btn",
      text: _("Reset"),
      callback: () => this.onReset(),
    });
  }

  private setTokensSelectable() {
    this.constantinopleCities.forEach((cityId: ConstantinopleCityId) => {
      if (this.cityConfiguration[cityId] === null) {
        return;
      }
      const token: Token = this.cityConfiguration[cityId];
      this.game.setTokenSelectable({
        id: token.id,
        callback: () => this.updateInterfaceSelectPosition({ cityId, token }),
      });
    });
  }

  private setDestinationsSelectable({
    cityId: activeCityId,
  }: {
    cityId: ConstantinopleCityId;
  }) {
    this.constantinopleCities.forEach((cityId) => {
      if (cityId === activeCityId) {
        return;
      }
      if (this.cityConfiguration[cityId] === null) {
        this.game.setLocationSelectable({
          id: cityId,
          callback: () => {
            this.onMove({ fromCityId: activeCityId, toCityId: cityId });
          },
        });
      } else {
        this.game.setTokenSelectable({
          id: this.cityConfiguration[cityId].id,
          callback: () => {
            this.onMove({ fromCityId: activeCityId, toCityId: cityId });
          },
        });
      }
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

  private async onMove({
    fromCityId,
    toCityId,
  }: {
    fromCityId: ConstantinopleCityId;
    toCityId: ConstantinopleCityId;
  }) {
    const fromCityNode = document.getElementById(`pr_${fromCityId}`);
    const toCityNode = document.getElementById(`pr_${toCityId}`);
    const selectedToken: Token = this.cityConfiguration[fromCityId];
    const targetToken: Token | null = this.cityConfiguration[toCityId];

    if (!(fromCityNode && toCityNode)) {
      return;
    }
    const switchTokenNode =
      targetToken === null ? null : document.getElementById(targetToken.id);

    const animations = [];

    if (switchTokenNode) {
      animations.push(
        this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: switchTokenNode }),
          fromCityNode
        )
      );
    }

    const tokenNode = document.getElementById(selectedToken.id);
    animations.push(
      this.game.animationManager.attachWithAnimation(
        new BgaSlideAnimation({ element: tokenNode }),
        toCityNode
      )
    );

    await Promise.all(animations);
    this.cityConfiguration[fromCityId] = targetToken;
    this.cityConfiguration[toCityId] = selectedToken;

    this.updateInterfaceInitialStep();
  }

  private async onReset() {
    this.copyCityConfig();
    const animations = [];
    this.constantinopleCities.forEach((cityId) => {
      const token = this.cityConfiguration[cityId];
      if (token === null) {
        return;
      }
      const tokenNode = document.getElementById(token.id);
      const cityNode = document.getElementById(`pr_${cityId}`);
      animations.push(
        this.game.animationManager.attachWithAnimation(
          new BgaSlideAnimation({ element: tokenNode }),
          cityNode
        )
      );
    });
    await Promise.all(animations);
    this.updateInterfaceInitialStep();
  }
}
