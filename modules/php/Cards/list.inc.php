<?php
$cardIds = [
  // Empire
  'EmpireSquare_Aragon',
  'EmpireSquare_Byzantium',
  'EmpireSquare_England',
  'EmpireSquare_France',
  'EmpireSquare_HolyRomanEmpire',
  'EmpireSquare_Hungary',
  'EmpireSquare_Mamluk',
  'EmpireSquare_Ottoman',
  'EmpireSquare_PapalStates',
  'EmpireSquare_Portugal',
  // Victory
  'VictoryGlobalization',
  'VictoryHoly',
  'VictoryImperial',
  'VictoryRenaissance',
  // Tableau
  'COMET1_Copernicus', // EAST
  'COMET2_Nostradamus', // EAST
  'COMET3_Halley', // WEST
  'COMET4_Regiomontanus', // WEST
  'PREN001_InquistionPope',
  'PREN002_PapalElephant',
  'PREN003_GrandInquisitor',
  'PREN004_Antipope',
  'PREN005_ReformedTheology',
  // 'PREN006_StarChamber',
  'PREN007_PetersPence',
  'PREN008_Jesuits',
  'PREN009_HouseOfBorgia',
  'PREN010_BonfireOfTheVanities',
  'PREN011_AnabaptistReformation',
  'PREN012_KnightsHospitaller',
  'PREN013_GenoeseFleet',
  'PREN014_IndiaArmada',
  'PREN015_HanseaticLeague',
  'PREN016_TheCompanyOfMerchantAdventurers',
  'PREN017_ScottishPrivateers',
  'PREN018_AlmeidaArmada',
  'PREN019_GoldCoastMonopoly',
  'PREN020_ArumerZwarteHoop',
  'PREN021_Conquistadors',
  'PREN022_TheLastKnight',
  'PREN023_SpanishTercio',
  'PREN024_Gonfalonier',
  'PREN025_TeutonicKnights',
  'PREN026_Cromwell',
  'PREN027_SwabianLeague',
  'PREN028_TheBold',
  'PREN029_HolyLandCrusade',
  'PREN030_SantaHermandad',
  'PREN031_SwissRislaufer',
  'PREN032_DukeOfMilan',
  'PREN033_SchwarzerHaufen',
  'PREN034_MerchantsOfTheStaple',
  'PREN035_CommunerosGuilds',
  'PREN036_FlandersGuild',
  'PREN037_TheHidden',
  'PREN038_BundschuhRevolt',
  'PREN039_FlorentineWool',
  'PREN040_SindicatRemenca',
  'PREN041_PeasantRepublicOfDithmarschen',
  'PREN042_HochstetterBank',
  'PREN043_Gutenberg',
  'PREN044_IsabellaOfCastille',
  'PREN045_AnneOfBrittany',
  'PREN046_JoannaTheMad',
  'PREN047_MargaretOfAnjou',
  'PREN048_MaryTheRich',
  'PREN049_OrderOfSantiago',
  'PREN050_LaSerenissima',
  'PREN051_Kingmaker',
  'PREN052_Luther',
  'PREN053_FrieseFreedom',
  'PREN054_Marechaussee',
  'PREN055_DuchyOfFerrara',
  'PREN058_TheGrim',
  'PREN059_Safavids',
  'PREN060_Dervishes',
  'PREN061_Qizilbash',
  'PREN062_BarbarossaBrothers',
  'PREN063_OttomanNavy',
  'PREN064_JewishPirates',
  'PREN065_MamlukSlaveSoldiers',
  'PREN066_BlackArmy',
  'PREN067_Janissaries',
  'PREN068_BlackSheepTribe',
  'PREN069_BashiBazouk',
  'PREN070_ZupyKrakowskieCompany',
  'PREN071_TheHandsome',
  'PREN072_BosnianAndSerbianSilver',
  'PREN073_TheCrimHorde',
  'PREN074_TheKremlin',
  'PREN075_ElzbietaOfBohemia',
  'PREN076_SophiaPalaiologina',
  'PREN077_HurremSultanRoxelana',
  'PREN078_SittIHatunOfDulkadir',
  'PREN079_CarlottaLusignanOfCyprus',
  'PREN080_GreekKlephts',
  'PREN081_CrimeanGoths',
  'PREN082_DamascusCoffee',
  'PREN083_PospoliteRuszenie',
  'PREN084_TheTimarSystem',
  'PREN085_VladTheImpaler',
  'PREN086_SaintStefanCelMare',
  'PREN087_SoninkeWangara',
  'PREN088_CemAntiHostage',
  'PREN089_GrandeOfSpain',
  'PREN090_DukeOfAthens',
  'PREN093X_FunjNomads',
  'PREN094X_ZaporozhianHost',
  'PREN095X_ElizabethBathory',
  'PREN096X_AmerigoVespucci',
  'PREN097X_PodestaOfVenice',
  'PREN098X_UnityOfTheBrethren',
  'PREN099X_PapalLegateToPersia',
  'PREN100X_UnifiedChristendom',
  'PREN101X_CivilEngineer',
  'PREN102X_SahnISemanMadrese',
  'PREN103X_Academia',
  // 'PREN104X_TheftOfTheHolyCrown',
  'PREN105X_FrancoOttomanNavy',
  'PREN106X_PrussianLeagueNavy',
  // 'PREN107X_TersaneIAmire',
  'PREN108X_IsfendiyaridDynasty',
  'PREN109X_BrotherhoodOfStMark',
  'PREN110X_TransylvanianPlot',
  'PREN111X_GlinskisRebellion',
  'PREN112X_PhocoeanAlum',
  // 'PREN113X_DalmatianMerchantMarine',
  'PREN114X_CountsOfCelji',
  'PREN115X_SahkuluShiiteRevolt',
  'PREN116X_CelebiTaxRevolts',
  'PREN117X_DespinaKhatun',
  'PREN118X_GrandMufti',
  'PREN119X_GrandHetman',
  'PREN120X_AgentsOfDukagjini',
  'PREN121X_NomadsOfTlemcen',
  'PREN122X_TheLastSigh',
  'PREN123X_NothingNew',
  'PREN124X_TheLastByzantine',
  'PREN125X_BeylerbeyOfEgypt',
  'PREN126X_LizardUnion',
  'PREN127X_RedSeaFleet',
  'PREN128X_ManForAllSeasons',
  // 'PREN129X_OratoryOfDivineLove',
  // 'PREN130X_Cryptography',
  'PREN131X_Michelangelo',
  'PREN132X_ArtisticGeometry',
  'PREN133X_RomanticRealism',
  'PREN134X_MiningEngineer',
  // 'PREN135X_Machiavellianism',
  'PREN136X_Hermeticism',
  'PREN137X_FaithVsReason',
  'PREN138X_Reichskrone',
  'PREN139X_FrenchPirates',
  'PREN140X_VenetianNavy',
  'PREN141X_WelserKleinVenedig',
  'PREN142X_KalmarUnion',
  'PREN143X_WolfOfRimini',
  'PREN144X_MonsMeg',
  'PREN145X_KappelerMilchsuppe',
  'PREN146X_BankOfStrozzi',
  'PREN147X_WilliamCaxton',
  'PREN148X_TolfaAlum',
  'PREN149X_CornishTin',
  'PREN150X_CatalanPactists',
  'PREN151X_CatherineOfNavarre',
  'PREN152X_MargaretOfAustria',
  'PREN153X_TheMaryRose',
  'PREN154X_EuropeanUnion',
  'PREN155X_EpicureanSwerve',
  'PREN156X_Humanism',
  'PREN157X_CouncilOfTrent',
  'PREN158X_OrderOfPreachers',
  'PREN159X_ConsentOfTheGoverned',
  'PREN160X_JacquesLefevreDEtaples',
  'PREN161X_Enclosure',
  'PREN162X_CatherineDeMedici',
  'PREN163X_JizyaTaxRevolt',
  // 'PREN164X_CircassianMamluks',
  'PREN165X_TransylvanianSaxons',
  'PREN166X_BankOfStGeorge',
  'PREN167X_TwelverGhulat',
  'PREN168X_ZionistState',
];
