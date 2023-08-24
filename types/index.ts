import { MouseEventHandler, ReactNode } from 'react';

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
	rightIcon?: ReactNode;
	isDisabled?: boolean;
}

export interface Rune {
	id: string;
	icon: string;
	shortDesc?: string;
	// Other properties
}

export interface Match {
	teamId: number;
	perks: {
		styles: [
			{
				description: string;
				selections: [
					{
						perk: number;
						var1: number;
						var2: number;
						var3: number;
					},
				];
				style: number;
			},
		];
	};
	challenges: {
		kda: number;
		killParticipation: number;
		controlWardsPlaced: number;
	};
	kills: number;
	deaths: number;
	assists: number;
	goldEarned: number;
	item0: number;
	item1: number;
	item2: number;
	item3: number;
	item4: number;
	item5: number;
	item6: number;
	totalMinionsKilled: number;
	neutralMinionsKilled: number;
	summonerName: string;
	championName: string;
	summoner1Id: number;
	summoner2Id: number;
	totalDamageDealtToChampions: number;
	totalDamageTaken: number;
	win: boolean;
	champLevel: number;
	visionWardsBoughtInGame: number;
	wardsKilled: number;
	wardsPlaced: number;
	// Other properties
}

interface UserInfo {
	teamId: number;
	win: boolean;
	gameEndTimestamp: number;
	championName: string;
	champLevel: number;
	summoners: string[];
	runes: Rune[];
	kills: number;
	deaths: number;
	assists: number;
	challenges: {
		kda: number;
		killParticipation: number;
		controlWardsPlaced: number;
	};
}

export interface Team {
	teamId: number;
	win: boolean;
	totalGold: number;
	objectives: {
		baron: {
			kills: number;
			first: boolean;
		};
		dragon: {
			kills: number;
			first: boolean;
		};
		tower: {
			kills: number;
			first: boolean;
		};
		inhibitor: {
			kills: number;
			first: boolean;
		};
		champion: {
			kills: number;
			first: boolean;
		};
		riftHerald: {
			kills: number;
			first: boolean;
		};
	};
	bans: {
		championId: number;
		pickTurn: number;
	}[];
}

interface PlayerInfo {
	participants: Match[];
	user: UserInfo;
	gameDuration: number;
	teams: Team[];
	// Other properties
}

export interface MatchHistoryProps {
	info: PlayerInfo;
}
