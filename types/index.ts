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
	id: string;
	icon: string;
	// Other properties
}

export interface Match {
	summonerName: string;
	championName: string;
	// Other properties
}

interface UserInfo {
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
		// Other properties
	};
	// Other properties
}

interface ParticipantInfo {
	participants: Match[];
	user: UserInfo;
	// Other properties
}

export interface MatchHistoryProps {
	info: ParticipantInfo;
}
