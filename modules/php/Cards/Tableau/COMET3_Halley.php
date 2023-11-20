<?php
namespace PaxRenaissance\Cards\Tableau;

class COMET3_Halley extends \PaxRenaissance\Models\CometCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'COMET3_Halley';
    $this->flavorText = [
      clienttranslate('"A maned and fiery comet appeared for several days. While scientists were predicting a great plague, dearness of food, or some great disaster, Pope Callixtus decreed that supplicatory prayers be held for some days to avert the anger of God, so that, if any calamity threatened mankind, it might be entirely diverted against the Turks, the foes of the Christian name."')
    ];
    $this->name = clienttranslate("Pope 'excommunicates' Halley's Comet of 1456");
    $this->region = WEST;
  }
}
