<?php

namespace PaxRenaissance\Cards\Tableau;

use PaxRenaissance\Core\Notifications;

class PREN164X_CircassianMamluks extends \PaxRenaissance\Models\TableauCard
{
  public function __construct($row)
  {
    parent::__construct($row);
    $this->id = 'PREN164X_CircassianMamluks';
    $this->agents = [
      [
        'separator' => ISLAMIC,
        'type' => KNIGHT,
      ],
    ];
    $this->empire = MAMLUK;
    $this->flavorText = [
      clienttranslate('Under the turbulent mamluk (warrior class) system, the army was the holder of political and economic power and a new Circassian aristocracy formed as mamluk recruitment diversified.'),
    ];
    $this->name = clienttranslate("Circassian Mamluks");
    $this->oneShot = JIHAD_ONE_SHOT;
    $this->ops = [
      [
        'id' => TAX_OP,
        'flavorText' => clienttranslate("Burji family"),
        'top' => 0,
        'left' => 0,
      ],
    ];
    $this->region = EAST;
    $this->specialAbilities = [
      [
        'id' => SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY,
        'title' => clienttranslate('MAMLUK GOLDEN AGE:'),
        'text' => [
          'log' => clienttranslate('Your ${tkn_prestige_patron} counts as green Bishops in a Holy victory.'),
          'args' => [
            'tkn_prestige_patron' => PATRON,
          ],
        ],
      ],
      [
        'id' => SA_REPRESSED_TOKENS_COUNTS_AS_KNIGHT_IN_EAST_CAMPAIGN,
        'title' => clienttranslate('SLAVE SOLDIERS:'),
        'text' => [
          'log' => clienttranslate('Each Repressed Token in Mamluk counts as a Knight in your campaigns targeting an Eastern Empire.'),
          'args' => [],
        ],
      ]
    ];
  }

  public function activateAbility()
  {
    $owner = $this->getOwner();
    Notifications::activateAbility(SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY, null, $owner === null ? null : $owner->getId() );
  }

  public function deactivateAbility()
  {
    $owner = $this->getOwner();
    Notifications::deactivateAbility(SA_PATRON_COUNTS_AS_GREEN_BISHOP_YOUR_HOLY_VICTORY, null, $owner === null ? null : $owner->getId() );
  }
}
