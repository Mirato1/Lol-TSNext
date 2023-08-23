import getQueryClient from '@/lib/get-query-client';
import { RankData } from '@/types';
import { fetchData } from '@/utils';
import { dehydrate } from '@tanstack/react-query';
import { QueryHydrate } from '..';
import RankedContent from './RankedContent';

const fetchRanked = async (): Promise<RankData[]> => {
	const url = `https://${process.env.NEXT_PUBLIC_SV_1}/lol/league/v4/entries/by-summoner/${process.env.NEXT_PUBLIC_SUMMONER}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

	return await fetchData({ url });
};

export async function Ranked() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['ranked'], fetchRanked);
	const dehydratedState = dehydrate(queryClient);

	return (
		<QueryHydrate state={dehydratedState}>
			<RankedContent />
		</QueryHydrate>
	);
}
