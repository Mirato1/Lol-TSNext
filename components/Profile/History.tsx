import { spells, userNames } from '@/constants';
import { MatchHistory } from '..';

async function fetchJSON(url: RequestInfo | URL) {
	const response = await fetch(url, { cache: 'no-store' });
	return response.json();
}

async function fetchMatchesData() {
	try {
		const runes = await fetchJSON(
			`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/data/es_ES/runesReforged.json`,
		);
		const gamesId = await fetchJSON(
			`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${process.env.PUUID}/ids?queue=420&start=0&count=10&api_key=${process.env.API_KEY}`,
		);

		if (!gamesId) {
			return { notFound: true };
		}

		const history = await Promise.all(
			gamesId.map(async (result: any) => {
				const match = await fetchJSON(
					`https://americas.api.riotgames.com/lol/match/v5/matches/${result}?api_key=${process.env.API_KEY}`,
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

		return { gamesId, history };
	} catch (error) {
		return { error };
	}
}

export async function History() {
	const { notFound, error, history } = await fetchMatchesData();

	if (notFound) {
		return <div>NotFound</div>;
	}

	if (error) {
		return <div>Error loading data</div>;
	}

	return (
		<div className='flex flex-col flex-1 w-full gap-2 md:w-8/12'>
			{history?.map((el) => <MatchHistory key={el.metadata?.matchId} info={el.info} />)}
		</div>
	);
}
