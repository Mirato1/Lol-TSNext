'use client';
import { items } from '@/constants';
import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';
import { BsArrowDown } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import { Match, MatchHistoryProps, Rune } from '@/types';
moment.locale('es');

const MatchHistory: React.FC<MatchHistoryProps> = ({ info }) => {
	return (
		<Disclosure>
			{({ open }) => (
				<div>
					<div
						className={`w-full rounded-md border-l-[6px] ${
							info?.user?.win
								? 'border-blue-600 bg-blue-200 dark:bg-blue-500'
								: 'border-red-600 bg-red-200  dark:bg-red-500'
						} flex gap-1 dark:bg-opacity-30 h-24 `}
					>
						<div className='flex p-[6px] flex-auto'>
							<Info info={info} />
							<ChampInfo info={info} />
							<div className='ml-1 flex lg:ml-5 lg:gap-4'>
								<GameParticipants data={info.participants.slice(0, 5)} />
								<GameParticipants data={info.participants.slice(5)} />
							</div>
						</div>
						<Disclosure.Button>
							<div
								className={`flex items-end justify-center w-10 rounded-r-md rounded-br-md pb-2 cursor-pointer h-full ${
									info?.user?.win
										? 'bg-blue-300/50 dark:bg-blue-700/50 hover:bg-blue-400/50 dark:hover:bg-blue-600/50 text-blue-500 dark:text-blue-400 '
										: 'bg-red-300/50 dark:bg-red-700/50 hover:bg-red-400/50 dark:hover:bg-red-600/50 text-red-500 dark:text-red-400'
								}`}
							>
								<BsArrowDown />
							</div>
						</Disclosure.Button>
					</div>
					<Transition
						show={open}
						enter='transition duration-100 ease-out'
						enterFrom='transform scale-95 opacity-0'
						enterTo='transform scale-100 opacity-100'
						leave='transition duration-75 ease-out'
						leaveFrom='transform scale-100 opacity-100'
						leaveTo='transform scale-95 opacity-0'
					>
						<Disclosure.Panel static>
							<DetailsRender />
						</Disclosure.Panel>
					</Transition>
				</div>
			)}
		</Disclosure>
	);
};

const DetailsRender = () => {
	return (
		<div
			className={`w-full rounded-md border-l-[6pxborder-blue-600 bg-blue-200 dark:bg-blue-500 dark:bg-opacity-30 p-2`}
		>
			Yes! You can purchase a license that you can share with your entire team.
		</div>
	);
};

interface GameParticipantsProps {
	data: Match[];
}

const GameParticipants = ({ data }: GameParticipantsProps) => {
	return (
		<div className='flex flex-col justify-evenly md:min-w-[40px] md:max-w-[65px] lg:min-w-[95px] lg:max-w-[95px]'>
			{data.map((el: Match) => (
				<div key={el.summonerName} className='flex gap-1'>
					<img
						alt=''
						className={`w-[17px] object-cover ${el.summonerName === 'Mirato' && 'rounded-full'} `}
						src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/champion/${el.championName}.png`}
					/>
					<span
						title={el.summonerName}
						className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.6rem] lg:text-[0.7rem] ${
							el.summonerName === 'Mirato'
								? 'font-semibold text-gray-900 dark:text-gray-100'
								: 'font-medium text-gray-700 dark:text-gray-400'
						}`}
					>
						{el.summonerName}{' '}
					</span>
				</div>
			))}
		</div>
	);
};

const Info = ({ info }: any) => (
	<div className='flex h-full max-w-[4rem] flex-col justify-evenly lg:max-w-[7rem]  '>
		<p className='text-[0.5rem] font-semibold text-gray-800 dark:text-gray-400  md:text-[.65rem] lg:text-xs'>
			Ranked Solo
		</p>
		<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.65rem] lg:text-xs '>
			{moment(info.gameEndTimestamp).fromNow()}
		</p>

		<hr className={`mx-0 my-[2px] h-[0.5px] w-12 ${info?.user?.win ? 'border-blue-400/50 ' : 'border-red-400/50 '} `} />
		<div>
			<p
				className={`text-[0.5rem] font-semibold md:text-[.65rem] lg:text-xs ${
					info?.user?.win ? 'text-blue-500' : 'text-red-500'
				}`}
			>
				{info?.user?.win ? 'Victoria' : 'Derrota'}
			</p>
			<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.65rem] lg:text-xs'>
				{Math.floor(info.gameDuration / 60) + ':' + ('0' + Math.round(info.gameDuration % 60)).slice(-2)}
			</p>
		</div>
	</div>
);

const ChampInfo = ({ info }: any) => (
	<div className='flex gap-2'>
		<div className='flex shrink-0 flex-col justify-around'>
			<div className='flex items-center justify-around'>
				<div className='relative'>
					<img
						alt=''
						className='lg:w-13 w-8 rounded-full object-cover md:w-12 '
						src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/champion/${info.user.championName}.png`}
					/>
					<span className='absolute bottom-0 right-0 rounded-full bg-slate-800 px-1 py-[2px] text-xs text-gray-100 '>
						{info.user.champLevel}{' '}
					</span>
				</div>

				<div className='flex flex-col gap-1'>
					{info.user.summoners.map((r: string) => (
						<div key={r}>
							<img
								alt=''
								className='w-3 rounded-md object-cover md:w-5 '
								src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/spell/${r}.png`}
							/>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-1'>
					{info.user.runes.map((r: Rune, index: number) => {
						if (index === 0) {
							return (
								<div className='w-3 rounded-full bg-zinc-800 md:w-5' key={r.id}>
									<img alt='' className='w-full object-cover' src={`${process.env.NEXT_PUBLIC_RUNE_URL}${r.icon}`} />
								</div>
							);
						}
						return (
							<img
								alt=''
								key={r.id}
								className='w-3 object-cover md:w-5'
								src={`${process.env.NEXT_PUBLIC_RUNE_URL}${r.icon}`}
							/>
						);
					})}
				</div>

				<div className='ml-1 md:min-w-[70px]'>
					<p className='text-xs font-semibold md:text-base'>
						{info.user.kills} <span className='font-extralight text-gray-800 dark:text-gray-400'>/</span>{' '}
						<span className='text-red-600'>{info.user.deaths}</span>{' '}
						<span className='font-extralight text-gray-800 dark:text-gray-400'>/</span> {info.user.assists}
					</p>
					<p className='text-[.6rem] font-light text-gray-800 dark:text-gray-400 md:text-xs'>
						{info.user.deaths === 0 ? 'Perfect KDA' : `${info.user.challenges.kda.toFixed(2)}:1KDA`}
					</p>
				</div>
			</div>

			<div className='flex gap-[2px] '>
				{items.map((r) => {
					return (
						<div key={r}>
							{info.user[r] !== 0 ? (
								<img
									alt=''
									className='w-3 rounded-md object-cover md:w-5 lg:w-6'
									src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/item/${info.user[r]}.png`}
								/>
							) : (
								<div
									className={`h-full w-3 rounded-md md:w-5 lg:w-6 ${
										info?.user?.win ? ' bg-blue-400 dark:bg-blue-500/50 ' : ' bg-red-400 dark:bg-red-500/50 '
									}`}
								/>
							)}
						</div>
					);
				})}
			</div>
		</div>
		<div
			className={`border-l-2 ${
				info?.user?.win ? 'border-blue-400/50 ' : 'border-red-400/50 '
			} flex flex-col justify-around pl-1 `}
		>
			<div>
				<p className='text-[0.4rem] font-semibold text-red-600 md:text-[.6rem] lg:text-xs'>
					P/Kill {(info.user.challenges.killParticipation * 100).toFixed(0)}%
				</p>
				<p className='text-[0.5rem] text-gray-800 dark:text-gray-400 md:text-[.6rem] lg:text-xs'>
					Control Ward {info.user.challenges.controlWardsPlaced}
				</p>
				<p className='text-[0.4rem] text-gray-800 dark:text-gray-400 md:text-[.6rem] lg:text-xs'>
					CS {info.user.totalMinionsKilled + info.user.neutralMinionsKilled} (
					{(
						(info.user.totalMinionsKilled + info.user.neutralMinionsKilled) /
						(Math.floor(info.gameDuration / 60) + (info.gameDuration % 60) / 100)
					).toFixed(1)}
					)
				</p>
			</div>
			<div className='h-3 md:h-5 lg:h-6'>
				{(info.user.doubleKills > 0 ||
					info.user.tripleKills > 0 ||
					info.user.quadraKills > 0 ||
					info.user.pentaKills > 0) && (
					<div className='flex h-full items-center justify-center rounded-3xl bg-red-500 bg-opacity-80 object-cover px-1 py-[1px] text-[0.5rem] font-semibold text-gray-100 md:px-2 md:py-[2px] md:text-[.7rem] '>
						{(info.user.doubleKills > 0 && 'Double Kill') ||
							(info.user.tripleKills > 0 && 'Triple Kill') ||
							(info.user.quadraKills > 0 && 'Quadra Kill') ||
							(info.user.pentaKills > 0 && 'Penta Kill')}
					</div>
				)}
			</div>
		</div>
	</div>
);

export default MatchHistory;
