'use client';
import { items, userNames } from '@/constants';
import { Disclosure, Transition } from '@headlessui/react';
import React from 'react';
import { BsArrowDown } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/es';
import { Match, MatchHistoryProps, Rune } from '@/types';
import Image from 'next/image';
import MatchDetail from './MatchDetail';
moment.locale('en');

const MatchHistory: React.FC<MatchHistoryProps> = ({ info }) => {
	return (
		<Disclosure>
			{({ open }) => (
				<>
					<div
						className={`w-full justify-between rounded-md border-l-[6px] ${
							info?.user?.win
								? 'border-blue-600 bg-blue-100/60 dark:bg-blue-500'
								: 'border-red-600 bg-red-100/60  dark:bg-red-500'
						} flex gap-1 dark:bg-opacity-30 h-24 `}
					>
						<div className='flex p-[6px] gap-1 w-[92%]' style={{ flex: 1 }}>
							<Info info={info} />
							<ChampInfo info={info} />
							<div className='sm:flex w-[32%] ml-1 lg:ml-5 hidden'>
								<GameParticipants data={info.participants.slice(0, 5)} />
								<GameParticipants data={info.participants.slice(5)} />
							</div>
						</div>
						<Disclosure.Button
							className={`flex z-[1] items-end justify-center w-9 rounded-r-md rounded-br-md pb-2 cursor-pointer h-full ${
								info?.user?.win
									? 'bg-blue-200 dark:bg-blue-800/70 hover:bg-blue-300/70 dark:hover:bg-blue-600/70 '
									: 'bg-red-200 dark:bg-red-800/70 hover:bg-red-300/70 dark:hover:bg-red-600/70 '
							}`}
							style={{ maxWidth: 34 }}
						>
							<BsArrowDown
								className={`${
									info.user.win ? 'fill-blue-600 dark:fill-blue-300' : 'fill-red-600 dark:fill-red-300'
								}  transition-transform font-bold duration-200 ${open ? 'rotate-180' : ''}`}
							/>
						</Disclosure.Button>
					</div>
					<Transition
						show={open}
						enter='transition ease duration-500 transform'
						enterFrom='opacity-0 -translate-y-4'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease duration-300 transform'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 -translate-y-4'
					>
						<Disclosure.Panel static>
							<MatchDetail info={info} />
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
};

interface GameParticipantsProps {
	data: Match[];
}

const GameParticipants = ({ data }: GameParticipantsProps) => {
	return (
		<div className='flex flex-col justify-evenly w-[49%] '>
			{data.map((el: Match) => (
				<div key={el.summonerName} className='flex gap-1'>
					<div className='relative w-[17px] h-[17px] min-w-[17px] '>
						<Image
							src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/champion/${el.championName}.png`}
							alt='champ-icon'
							sizes='100vw'
							priority
							quality={50}
							fill
							className={`object-cover ${userNames.includes(el.summonerName) && 'rounded-full'} `}
						/>
					</div>
					<a
						title={el.summonerName}
						className={`overflow-hidden text-ellipsis whitespace-nowrap text-[0.6rem] lg:text-[0.7rem] truncate ${
							userNames.includes(el.summonerName) ? 'font-semibold opacity-100' : 'font-medium opacity-80'
						}`}
						href={`https://www.op.gg/summoners/br/${el.summonerName}`}
						target='_blank'
						rel='noreferrer'
					>
						{el.summonerName}
					</a>
				</div>
			))}
		</div>
	);
};

const Info = ({ info }: any) => (
	<div className='flex h-full max-w-[58px] flex-col justify-evenly lg:max-w-[5.5rem] w-full '>
		<p className={`text-[.55rem] font-semibold lg:text-xs ${info?.user?.win ? 'text-blue-500' : 'text-red-500'}`}>
			Ranked Solo
		</p>
		<p className='text-[.55rem] lg:text-[.65rem] '>{moment(info.gameEndTimestamp).fromNow()}</p>

		<hr
			className={`mx-0 my-[2px] h-[0.5px] w-auto ${info?.user?.win ? 'border-blue-400/50 ' : 'border-red-400/50 '} `}
		/>
		<div>
			<p className={`text-[.55rem] font-semibold lg:text-xs ${info?.user?.win ? 'text-blue-500' : 'text-red-500'}`}>
				{info?.user?.win ? 'Victory' : 'Defeat'}
			</p>
			<p className='text-[.55rem] lg:text-xs'>
				{Math.floor(info.gameDuration / 60) + ':' + ('0' + Math.round(info.gameDuration % 60)).slice(-2)}
			</p>
		</div>
	</div>
);

const ChampInfo = ({ info }: any) => (
	<div className='flex justify-center w-full gap-1 sm:w-auto sm:justify-normal lg:gap-2'>
		<div className='flex flex-col justify-around '>
			<div className='flex items-center gap-1'>
				<div className='relative object-cover w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12'>
					<Image
						src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/champion/${info.user?.championName}.png`}
						alt='champ-icon'
						priority
						sizes='100vw'
						fill
						className='object-cover rounded-full'
					/>
					<span className='absolute bottom-0 right-0 rounded-full bg-slate-800 text-center p-0 sm:px-1 sm:py-[2px]  w-4 text-[.6rem] sm:w-5 sm:text-xs text-zinc-100 '>
						{info.user.champLevel}
					</span>
				</div>

				<div className='flex flex-col gap-1'>
					{info.user.summoners.map((r: string) => (
						<div key={r} className='relative w-4 h-4 lg:w-5 lg:h-5'>
							<Image
								src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/spell/${r}.png`}
								alt='spell-icon'
								sizes='100vw'
								priority
								quality={50}
								fill
								className='object-cover rounded-md'
							/>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-1'>
					{info.user.runes.map((r: Rune) => (
						<div
							className={`relative w-4 h-4 lg:w-5 lg:h-5 rounded-full ${r.shortDesc ? 'bg-zinc-800' : ''}`}
							key={r.id}
						>
							<Image
								src={`https://opgg-static.akamaized.net/meta/images/lol/${r.shortDesc ? 'perk' : 'perkStyle'}/${
									r.id
								}.png?image=q_auto,f_webp`}
								alt='rune-icon'
								priority
								sizes='100vw'
								fill
								className='object-cover w-full'
							/>
						</div>
					))}
				</div>

				<div className=' w-[50px] sm:w-[65px] ml-1'>
					<p className='text-[.8rem] lg:text-base font-semibold '>
						{info.user.kills} <span className=' font-extralight'>/</span>
						<span className='text-red-600'>{info.user.deaths}</span>
						<span className=' font-extralight'>/</span> {info.user.assists}
					</p>
					<p className='text-[.65rem] lg:text-xs font-light'>
						{info.user.deaths === 0 ? 'Perfect KDA' : `${info.user.challenges.kda.toFixed(2)}:1KDA`}
					</p>
				</div>
			</div>

			<div className='flex gap-[2px] '>
				{items.map((r) => {
					return (
						<div
							key={r}
							className={`rounded-md relative w-5 h-5 sm:w-5 sm:h-5 lg:h-6 lg:w-6 ${
								info?.user?.win ? ' bg-blue-400 dark:bg-blue-500/50 ' : ' bg-red-400 dark:bg-red-500/50 '
							}`}
						>
							{info.user[r] !== 0 ? (
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/item/${info.user[r]}.png`}
									alt='item-icon'
									priority
									sizes='100vw'
									fill
									className='object-cover w-full rounded-md'
								/>
							) : (
								<></>
							)}
						</div>
					);
				})}
			</div>
		</div>
		<div
			className={`border-l-2 min-w-[56px] ${
				info?.user?.win ? 'border-blue-400/50 ' : 'border-red-400/50 '
			} flex flex-col justify-around pl-1 lg:pl-2 `}
		>
			<div>
				<p className='font-semibold text-red-600 text-[.55rem] lg:text-xs'>
					P/Kill {(info.user.challenges.killParticipation * 100 || 0).toFixed(0)}%
				</p>
				<p className='opacity-90 text-[.55rem] lg:text-xs'>Control Ward {info.user.challenges.controlWardsPlaced}</p>
				<p className='opacity-90 text-[.55rem] lg:text-xs'>
					CS {info.user.totalMinionsKilled + info.user.neutralMinionsKilled} (
					{(
						(info.user.totalMinionsKilled + info.user.neutralMinionsKilled) /
						(Math.floor(info.gameDuration / 60) + (info.gameDuration % 60) / 100)
					).toFixed(1)}
					)
				</p>
			</div>
			<div className='h-5 lg:h-6'>
				{(info.user.doubleKills > 0 ||
					info.user.tripleKills > 0 ||
					info.user.quadraKills > 0 ||
					info.user.pentaKills > 0) && (
					<div className='flex h-full items-center justify-center rounded-3xl bg-red-500 bg-opacity-50 object-cover font-semibold text-zinc-100 p-[1px] sm:px-1 sm:py-[2px] text-[.5rem] sm:text-[.55rem] lg:text-xs '>
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
