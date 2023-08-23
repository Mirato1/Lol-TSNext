'use client';

import { Hydrate, HydrateProps } from '@tanstack/react-query';

function QueryHydrate(props: HydrateProps) {
	return <Hydrate {...props} />;
}

export default QueryHydrate;
