import getQueryClient from '@/lib/get-query-client';
import { SummonerData } from '@/types';
import { fetchData } from '@/utils';
import { dehydrate } from '@tanstack/react-query';
import { QueryHydrate } from '..';
import UserContent from './UserContent';

const fetchUser = async (): Promise<SummonerData> => {
	const url = `https://${process.env.NEXT_PUBLIC_SV_1}/lol/summoner/v4/summoners/${process.env.NEXT_PUBLIC_SUMMONER}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

	return await fetchData({ url });
};

export async function User() {
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(['user'], fetchUser);
	const dehydratedState = dehydrate(queryClient);

	return (
		<QueryHydrate state={dehydratedState}>
			<UserContent />
		</QueryHydrate>
	);
}

export default User;
