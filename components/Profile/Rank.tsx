'use client';
import { seasonElo } from '@/constants';
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { SlArrowDown } from 'react-icons/sl';

const Rank = () => {
	const seasonEloWithoutLast = seasonElo.slice(0, -1).reverse();
	return (
		<Menu as='div' className='relative flex flex-wrap h-full gap-1 text-left md:gap-2'>
			<Menu.Button className='inline-flex items-center text-[0.55rem] justify-center w-full gap-1 px-2 py-1 sm:text-xs font-medium bg-red-800 rounded-md text-zinc-100 bg-opacity-70 hover:bg-opacity-100 dark:bg-slate-700 leading-3 '>
				<p style={{ margin: 0 }}>Más Seasons</p>
				<SlArrowDown className='text-[.65rem] sm:text-xs ' aria-hidden='true' />
			</Menu.Button>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='z-[1] absolute w-full mt-8 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none bg-red-600/90 dark:bg-cyan-600/90'>
					{seasonEloWithoutLast.map((el) => (
						<Menu.Item>
							<div className='h-auto text-center' key={el.season}>
								<span className='flex gap-1 p-1 text-[0.65rem] md:text-xs font-semibold text-zinc-50'>
									<p>S{el.season}</p>
									<p>{el.elo}</p>
								</span>
							</div>
						</Menu.Item>
					))}
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

export default Rank;
