interface PlayerPreferenceOption {
  label: string;
  value: string;
}

interface PlayerPreferenceConfigBase {
  id: string;
  label: string;
  visibleCondition?: {
    id: string;
    values: (string | number)[];
  }
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
  }
  type: "slider";
}

type PlayerPreferenceConfig =
  | PlayerPreferenceSelectConfig
  | PlayerPreferenceSliderConfig;

const getSettingsConfig = (): Record<string, PlayerPreferenceConfig> => ({
  backgroundImage: {
    id: "backgroundImage",
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
    label: _("Column sizes"),
    defaultValue: 50,
    visibleCondition: {
      id: 'twoColumnsLayout',
      values: [SETTING_ENABLED],
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
  cardSizeInTableau: {
    id: "cardSizeInTableau",
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
});
