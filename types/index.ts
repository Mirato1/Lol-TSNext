import { MouseEventHandler } from 'react';

export interface ApiResponse<T = any> {
	IsError: boolean;
	ResponseMessage: string;
	data?: T;
}

export interface SummonerData {
	id: string;
	accountId: string;
	puuid: string;
	name: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number;
}

export interface RankData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

export type FetchOptions = {
	url: string;
	data?: string | null;
	filter?: string | null;
};

export type FetchResponse = {
	IsError: boolean;
	ResponseMessage: string;
	Data?: SummonerData | Array<any>;
};

export interface CustomButtonProps {
	title: string;
	containerStyles?: string;
	btnType?: 'button' | 'submit';
	handleClick?: MouseEventHandler<HTMLButtonElement>;
	textStyles?: string;
	rightIcon?: string;
	isDisabled?: boolean;
}

export interface Rune {
  id: number;
  key: string;
  icon: string;
  name: string;
  slots: object[]; // Aquí deberías ajustar el tipo según el contenido real de `slots`
}
  
export interface Match {
    allInPings:                     number;
    assistMePings:                  number;
    assists:                        number;
    baitPings:                      number;
    baronKills:                     number;
    basicPings:                     number;
    bountyLevel:                    number;
    challenges:                     { [key: string]: number };
    champExperience:                number;
    champLevel:                     number;
    championId:                     number;
    championName:                   string;
    championTransform:              number;
    commandPings:                   number;
    consumablesPurchased:           number;
    damageDealtToBuildings:         number;
    damageDealtToObjectives:        number;
    damageDealtToTurrets:           number;
    damageSelfMitigated:            number;
    dangerPings:                    number;
    deaths:                         number;
    detectorWardsPlaced:            number;
    doubleKills:                    number;
    dragonKills:                    number;
    eligibleForProgression:         boolean;
    enemyMissingPings:              number;
    enemyVisionPings:               number;
    firstBloodAssist:               boolean;
    firstBloodKill:                 boolean;
    firstTowerAssist:               boolean;
    firstTowerKill:                 boolean;
    gameEndedInEarlySurrender:      boolean;
    gameEndedInSurrender:           boolean;
    getBackPings:                   number;
    goldEarned:                     number;
    goldSpent:                      number;
    holdPings:                      number;
    individualPosition:             string;
    inhibitorKills:                 number;
    inhibitorTakedowns:             number;
    inhibitorsLost:                 number;
    item0:                          number;
    item1:                          number;
    item2:                          number;
    item3:                          number;
    item4:                          number;
    item5:                          number;
    item6:                          number;
    itemsPurchased:                 number;
    killingSprees:                  number;
    kills:                          number;
    lane:                           string;
    largestCriticalStrike:          number;
    largestKillingSpree:            number;
    largestMultiKill:               number;
    longestTimeSpentLiving:         number;
    magicDamageDealt:               number;
    magicDamageDealtToChampions:    number;
    magicDamageTaken:               number;
    needVisionPings:                number;
    neutralMinionsKilled:           number;
    nexusKills:                     number;
    nexusLost:                      number;
    nexusTakedowns:                 number;
    objectivesStolen:               number;
    objectivesStolenAssists:        number;
    onMyWayPings:                   number;
    participantId:                  number;
    pentaKills:                     number;
    perks:                          Perks;
    physicalDamageDealt:            number;
    physicalDamageDealtToChampions: number;
    physicalDamageTaken:            number;
    playerAugment1:                 number;
    playerAugment2:                 number;
    playerAugment3:                 number;
    playerAugment4:                 number;
    playerSubteamId:                number;
    profileIcon:                    number;
    pushPings:                      number;
    puuid:                          string;
    quadraKills:                    number;
    riotIdName:                     string;
    riotIdTagline:                  string;
    role:                           string;
    sightWardsBoughtInGame:         number;
    spell1Casts:                    number;
    spell2Casts:                    number;
    spell3Casts:                    number;
    spell4Casts:                    number;
    subteamPlacement:               number;
    summoner1Casts:                 number;
    summoner1Id:                    number;
    summoner2Casts:                 number;
    summoner2Id:                    number;
    summonerId:                     string;
    summonerLevel:                  number;
    summonerName:                   string;
    teamEarlySurrendered:           boolean;
    teamId:                         number;
    teamPosition:                   string;
    timeCCingOthers:                number;
    timePlayed:                     number;
    totalAllyJungleMinionsKilled:   number;
    totalDamageDealt:               number;
    totalDamageDealtToChampions:    number;
    totalDamageShieldedOnTeammates: number;
    totalDamageTaken:               number;
    totalEnemyJungleMinionsKilled:  number;
    totalHeal:                      number;
    totalHealsOnTeammates:          number;
    totalMinionsKilled:             number;
    totalTimeCCDealt:               number;
    totalTimeSpentDead:             number;
    totalUnitsHealed:               number;
    tripleKills:                    number;
    trueDamageDealt:                number;
    trueDamageDealtToChampions:     number;
    trueDamageTaken:                number;
    turretKills:                    number;
    turretTakedowns:                number;
    turretsLost:                    number;
    unrealKills:                    number;
    visionClearedPings:             number;
    visionScore:                    number;
    visionWardsBoughtInGame:        number;
    wardsKilled:                    number;
    wardsPlaced:                    number;
    win:                            boolean;
}

export interface Perks {
    statPerks: StatPerks;
    styles:    Style[];
}

export interface StatPerks {
    defense: number;
    flex:    number;
    offense: number;
}

export interface Style {
    description: string;
    selections:  Selection[];
    style:       number;
}

export interface Selection {
    perk: number;
    var1: number;
    var2: number;
    var3: number;
}