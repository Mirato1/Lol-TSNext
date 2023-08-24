'use client';
import React from 'react';
import { CustomButton, MatchHistory } from '..';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { spells, userNames } from '@/constants';
import { SlRefresh } from 'react-icons/sl';

async function fetchJSON(url: RequestInfo | URL) {
	const response = await fetch(url, { cache: 'no-store' });
	return response.json();
}

async function fetchMatchesData({ pageParam = 0 }: { pageParam?: number }) {
	const runes = await fetchJSON(
		`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/data/es_ES/runesReforged.json`,
	);

	const gamesId = await fetchJSON(
		`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${
			process.env.NEXT_PUBLIC_PUUID
		}/ids?queue=420&start=${pageParam * 10}&count=10&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
	);

	const history = await Promise.all(
		gamesId.map(async (result: any) => {
			const match = await fetchJSON(
				`https://americas.api.riotgames.com/lol/match/v5/matches/${result}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
			);
			const user = match.info?.participants.find((x: { summonerName: string }) => userNames.includes(x.summonerName));

			if (user) {
				let summoners = [];
				summoners.push(spells?.find((x) => x.id === user?.summoner1Id)?.name);
				summoners.push(spells?.find((x) => x.id === user?.summoner2Id)?.name);
				user.summoners = summoners;
				let runesArr: { id: any; slots: { runes: any[] }[] }[] = [];

				user.perks.styles.forEach((style: any) => {
					if (style.description === 'primaryStyle') {
						const primaryRuneId = style.selections[0].perk;
						const rune = runes.find((rune: any) => rune.id === style.style);

						if (rune) {
							const primaryRune = rune.slots[0].runes.find((rune: any) => rune.id === primaryRuneId);
							if (primaryRune) {
								runesArr.push(primaryRune);
							}
						}
					} else if (style.description === 'subStyle') {
						const rune = runes.find((rune: any) => rune.id === style.style);
						if (rune) {
							runesArr.push(rune);
						}
					}
				});

				user.runes = runesArr;
				match.info.user = user;
			}
			return match;
		}),
	);

	return { gamesId, history, runes, nextPage: pageParam + 1 };
}

const HistoryContent = () => {
	const { data, isFetching, fetchNextPage, isError } = useInfiniteQuery({
		queryKey: ['history'],
		queryFn: fetchMatchesData,
		getNextPageParam: (lastPage, pages) => {
			if (lastPage.gamesId.length < 10) {
				return undefined;
			}
			return pages.length + 1;
		},
	});

	if (isFetching && !data?.pages) return <LoaderHistory />;

	const history = data?.pages?.map((page) => page.history).flat();

	return (
		<div className='flex flex-col flex-1 w-full gap-2 md:w-8/12'>
			{history?.map((el) => (
				<MatchHistory key={el.metadata?.matchId} info={el.info} />
			))}
			<CustomButton
				title='Show More'
				containerStyles='mt-2'
				handleClick={() => fetchNextPage()}
				rightIcon={<SlRefresh className={`animate-spin animate-infinite ml-1  ${isFetching ? 'block' : 'hidden'} `} />}
				isDisabled={isFetching}
			/>
		</div>
	);
};

const LoaderHistory = () => {
	const numbersArray = Array.from({ length: 10 }, (_, index) => index);
	return (
		<div className='flex flex-col flex-1 w-full gap-2 md:w-8/12'>
			{numbersArray.map((el) => (
				<div
					key={el}
					className='flex border-l-[6px] border-blue-500 bg-blue-300/50 px-2 py-1 dark:bg-blue-500 dark:bg-opacity-30 min-h-[3rem] h-24 w-full rounded-md animate-pulse'
					style={{
						animationDelay: `${el * 0.05}s`,
						animationDuration: '1s',
					}}
				/>
			))}
		</div>
	);
};

export default HistoryContent;
