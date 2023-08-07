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

export type FetchOptions = {
	url: string;
	data?: string | null;
	filter?: string | null;
};

export interface UserData {
	id: string;
	accountId: string;
	puuid: string;
	name: string;
	profileIconId: number;
	revisionDate: number;
	summonerLevel: number;
}

export type FetchResponse = {
	IsError: boolean;
	ResponseMessage: string;
	Data?: UserData | Array<any>;
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
