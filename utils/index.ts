import { FetchOptions, FetchResponse } from '@/types';

export const updateSearchParams = (type: string, value: string) => {
	// Get the current URL search params
	const searchParams = new URLSearchParams(window.location.search);

	// Set the specified search parameter to the given value
	searchParams.set(type, value);

	// Set the specified search parameter to the given value
	const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

	return newPathname;
};

export const OPTIONS = (
	method = 'GET',
	body = null,
	headers = { 'Content-type': 'application/json; charset=utf-8' },
) => {
	return {
		method,
		headers,
		body,
	};
};

export const handleData = async ({ url, data = null, filter = null }: FetchOptions): Promise<FetchResponse> => {
	try {
		const response = await fetch(url, {
			method: 'get',
			headers: { 'Content-type': 'application/json; charset=utf-8' },
			cache: 'no-store',
		});

		const x = await response.json();
		if (x?.IsError) {
			throw x.ResponseMessage;
		} else {
			if (x.ResponseMessage?.includes('No se encontró')) {
				return { IsError: false, ResponseMessage: 'No se encontró', Data: [] };
			} else {
				const { ResponseData, ...all } = x;

				let responseData: string | Array<any> = ResponseData;

				if (data && ResponseData) {
					responseData = ResponseData[data];
					if (filter && Array.isArray(responseData)) {
						responseData = responseData.filter((el) => el[filter]);
					}
				}

				return {
					IsError: false,
					ResponseMessage: '',
					Data: all,
				};
			}
		}
	} catch (err) {
		return {
			IsError: true,
			ResponseMessage: err as string,
		};
	}
};

interface FetchData {
	url: string; // Aquí puedes definir el tipo correcto para queryKey
}

export const fetchData = async ({ url }: FetchData) => {
	return await fetch(url)
		.then(async (res) => {
			if (!res.ok) throw new Error('Error en la petición');
			return await res.json();
		})
		.then((res) => res);
};
