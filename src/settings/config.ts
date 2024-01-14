interface PlayerPreferenceOption {
  label: string;
  value: string;
}

interface PlayerPreference {
  id: string;
  defaultValue: string;
  label: string;
  options: PlayerPreferenceOption[];
}

const getSettingsConfig = (): Record<string, PlayerPreference> => ({
  backgroundImage: {
    id: 'backgroundImage',
    defaultValue: 'goldsmith',
    label: _('Background image'),
    options: [
      {
        label: _('No image'),
        value: 'none',
      },
      {
        label: _('Balcony'),
        value: 'balcony',
      },
      {
        label: _('Cathedral'),
        value: 'cathedral',
      },
      {
        label: _('Goldsmith'),
        value: 'goldsmith',
      },
      {
        label: _('Lucrezia'),
        value: 'lucrezia',
      },
      {
        label: _('Poison'),
        value: 'poison',
      },
      {
        label: _('War'),
        value: 'war',
      },
    ],
  }
});