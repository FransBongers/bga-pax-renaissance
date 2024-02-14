interface PlayerPreferenceOption {
  label: string;
  value: string;
}

interface PlayerPreferenceConfigBase {
  id: string;
  onChangeInSetup: boolean;
  label: string;
  visibleCondition?: {
    id: string;
    values: (string | number)[];
  };
}

interface PlayerPreferenceSelectConfig extends PlayerPreferenceConfigBase {
  defaultValue: string;
  options: PlayerPreferenceOption[];
  type: "select";
}

interface PlayerPreferenceSliderConfig extends PlayerPreferenceConfigBase {
  defaultValue: number;
  sliderConfig: {
    step: number;
    padding: number;
    range: {
      min: number;
      max: number;
    };
  };
  type: "slider";
}

type PlayerPreferenceConfig =
  | PlayerPreferenceSelectConfig
  | PlayerPreferenceSliderConfig;

interface PlayerPreferenceTab {
  id: string;
  config: Record<string, PlayerPreferenceConfig>;
}

const getSettingsConfig = (): Record<string, PlayerPreferenceTab> => ({
  layout: {
    id: "layout",
    config: {
      backgroundImage: {
        id: "backgroundImage",
        onChangeInSetup: true,
        defaultValue: "goldsmith",
        label: _("Background image"),
        type: "select",
        options: [
          {
            label: _("No image"),
            value: "none",
          },
          {
            label: _("Balcony"),
            value: "balcony",
          },
          {
            label: _("Cathedral"),
            value: "cathedral",
          },
          {
            label: _("Goldsmith"),
            value: "goldsmith",
          },
          {
            label: _("Lucrezia"),
            value: "lucrezia",
          },
          {
            label: _("Poison"),
            value: "poison",
          },
          {
            label: _("War"),
            value: "war",
          },
        ],
      },
      twoColumnsLayout: {
        id: "twoColumnsLayout",
        onChangeInSetup: true,
        defaultValue: "disabled",
        label: _("Two column layout"),
        type: "select",
        options: [
          {
            label: _("Enabled"),
            value: "enabled",
          },
          {
            label: _("Disabled (single column)"),
            value: "disabled",
          },
        ],
      },
      columnSizes: {
        id: "columnSizes",
        onChangeInSetup: true,
        label: _("Column sizes"),
        defaultValue: 50,
        visibleCondition: {
          id: "twoColumnsLayout",
          values: [ENABLED],
        },
        sliderConfig: {
          step: 5,
          padding: 0,
          range: {
            min: 30,
            max: 70,
          },
        },
        type: "slider",
      },
      [CARD_SIZE_IN_TABLEAU]: {
        id: CARD_SIZE_IN_TABLEAU,
        onChangeInSetup: false,
        label: _("Size of cards in tableau"),
        defaultValue: 100,
        sliderConfig: {
          step: 5,
          padding: 0,
          range: {
            min: 50,
            max: 200,
          },
        },
        type: "slider",
      },
      [CARDS_IN_TABLEAU_OVERLAP]: {
        id: CARDS_IN_TABLEAU_OVERLAP,
        onChangeInSetup: false,
        defaultValue: DISABLED,
        label: _("Cards in tableau overlap"),
        type: "select",
        options: [
          {
            label: _("Enabled"),
            value: ENABLED,
          },
          {
            label: _("Disabled"),
            value: DISABLED,
          },
        ],
      },
      [OVERLAP_EMPIRE_SQUARES]: {
        id: OVERLAP_EMPIRE_SQUARES,
        onChangeInSetup: false,
        defaultValue: ENABLED,
        visibleCondition: {
          id: CARDS_IN_TABLEAU_OVERLAP,
          values: [ENABLED],
        },
        label: _("Cards overlap empire squares"),
        type: "select",
        options: [
          {
            label: _("Enabled"),
            value: ENABLED,
          },
          {
            label: _("Disabled"),
            value: DISABLED,
          },
        ],
      },

    },
  },
  gameplay: {
    id: _("gameplay"),
    config: {
      [REPRESS_TOKENS_TO_THRONES]: {
        id: REPRESS_TOKENS_TO_THRONES,
        onChangeInSetup: false,
        defaultValue: ENABLED,
        label: _("Repress tokens to thrones"),
        type: "select",
        options: [
          {
            label: _("Enabled"),
            value: ENABLED,
          },
          {
            label: _("Disabled (repress to empire squares)"),
            value: DISABLED,
          },
        ],
      },
      [CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY]: {
        id: CONFIRM_END_OF_TURN_AND_PLAYER_SWITCH_ONLY,
        onChangeInSetup: false,
        defaultValue: DISABLED,
        label: _("Confirm end of turn and player switch only"),
        type: "select",
        options: [
          {
            label: _("Enabled"),
            value: ENABLED,
          },
          {
            label: _("Disabled (confirm every move)"),
            value: DISABLED,
          },
        ],
      },
    },
  },
});
