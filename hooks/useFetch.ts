import { useQuery } from '@tanstack/react-query';

interface Fetch {
	keyQuery: string;
	url: string;
}

export const useFetch = ({ keyQuery, url }: Fetch) => {
	const { isLoading, isError, data, refetch, isFetching } = useQuery(
		[keyQuery, url], // <- La clave predeterminada
		fetchData,
		{
			refetchOnWindowFocus: false,
			staleTime: 1000 * 3,
		},
	);

	return {
		isFetching,
		isLoading,
		isError,
		data: data ?? [],
		refetch,
	};
};

interface FetchData {
	queryKey: [string, string]; // Aquí puedes definir el tipo correcto para queryKey
}

const fetchData = async (data: FetchData) => {
	return await fetch(data.queryKey[1], {cache: 'no-store'})
		.then(async (res) => {
			if (!res.ok) throw new Error('Error en la petición');
			return await res.json();
		})
};
