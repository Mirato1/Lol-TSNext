'use client';
import { MatchHistoryProps } from '@/types';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';

const MatchDetail: React.FC<MatchHistoryProps> = ({ info }) => {
	return (
		<div
			className={`w-full rounded-md border-l-[6pxborder-blue-600 bg-blue-200 dark:bg-blue-500 dark:bg-opacity-30 p-2 ${
				info?.user?.win ? 'border-blue-600 bg-blue-200 dark:bg-blue-500' : 'border-red-600 bg-red-200  dark:bg-red-500'
			}`}
		>
			<Tab.Group>
				<Tab.List>
					<Tab>
						{({ selected }) => (
							<button
								className={`px-2 py-[2px] text-base ${
									selected
										? info?.user?.win
											? 'text-cyan-500  border-cyan-500'
											: 'text-red-500  border-red-500'
										: 'text-zinc-100  hover:border-gray-300'
								} transition-all duration-300 ease-in-out border-b-2`}
							>
								Post Game
							</button>
						)}
					</Tab>
					<Tab>
						{({ selected }) => (
							<button
								className={`px-2 py-[2px] text-base ${
									selected
										? info?.user?.win
											? 'text-cyan-500  border-cyan-500'
											: 'text-red-500  border-red-500'
										: 'text-zinc-100  hover:border-gray-300'
								} transition-all duration-300 ease-in-out border-b-2`}
							>
								Build
							</button>
						)}
					</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>Content 1</Tab.Panel>
					<Tab.Panel>Content 2</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default MatchDetail;
