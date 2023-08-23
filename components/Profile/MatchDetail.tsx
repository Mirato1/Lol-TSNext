'use client';
import { columnsDetail, items, spells, userNames } from '@/constants';
import { Match, MatchHistoryProps, Team } from '@/types';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import Image from 'next/image';
import { BaronIcon, DragonIcon, TowerIcon } from '../Icons';

interface ParticipantInfo {
	participants: Match[];
	gameDuration: number;
	maxDamageDealt: number;
	maxDamageTaken: number;
}

type NumberPropertiesOfMatch = 'summoner1Id' | 'summoner2Id';

const MatchDetail: React.FC<MatchHistoryProps> = ({ info }) => {
	const maxDamageDealt = Math.max(...info.participants.map((participant) => participant.totalDamageDealtToChampions));
	const maxDamageTaken = Math.max(...info.participants.map((participant) => participant.totalDamageTaken));

	const playerTeam = info.participants.filter((participant) => participant.teamId === info?.user?.teamId);
	const otherTeam = info.participants.filter((participant) => participant.teamId !== info?.user?.teamId);

	// Combina los grupos en el orden deseado (jugador buscado primero)
	const reorganizedParticipants = [...playerTeam, ...otherTeam];

	return (
		<div className={`w-full rounded-md bg-zinc-100 dark:bg-slate-500 dark:bg-opacity-20 p-2 `}>
			<Tab.Group>
				<Tab.List>
					<Tab as={Fragment}>
						{({ selected }) => (
							<button
								className={`px-2 py-[2px] text-base ${
									selected
										? info?.user?.win
											? 'text-blue-500  border-blue-500 font-bold'
											: 'text-red-500  border-red-500 font-bold'
										: info?.user?.win
										? ' border-zinc-300 hover:border-blue-500 hover:text-blue-500'
										: ' border-zinc-300 hover:border-red-500 hover:text-red-500'
								} transition-all duration-300 ease-in-out border-b-2 `}
							>
								Post Game
							</button>
						)}
					</Tab>
					<Tab as={Fragment}>
						{({ selected }) => (
							<button
								className={`px-2 py-[2px] text-base ${
									selected
										? info?.user?.win
											? 'text-blue-500  border-blue-500 font-bold'
											: 'text-red-500  border-red-500 font-bold'
										: info?.user?.win
										? ' border-zinc-300 hover:border-blue-500 hover:text-blue-500'
										: ' border-zinc-300 hover:border-red-500 hover:text-red-500'
								} transition-all duration-300 ease-in-out border-b-2 `}
							>
								Build
							</button>
						)}
					</Tab>
				</Tab.List>
				<Tab.Panels className='mt-2'>
					<Tab.Panel className='overflow-x-auto '>
						<TableTeam
							gameDuration={info.gameDuration}
							maxDamageDealt={maxDamageDealt}
							maxDamageTaken={maxDamageTaken}
							participants={reorganizedParticipants.slice(0, 5)}
						/>
						<MatchInfo info={info} />
						<TableTeam
							gameDuration={info.gameDuration}
							maxDamageDealt={maxDamageDealt}
							maxDamageTaken={maxDamageTaken}
							participants={reorganizedParticipants.slice(5, 10)}
						/>
					</Tab.Panel>
					<Tab.Panel>Content 2</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

const TableTeam = ({ participants, gameDuration, maxDamageDealt, maxDamageTaken }: ParticipantInfo) => {
	return (
		<table className='w-full overflow-hidden rounded-md '>
			<thead className='min-w-full bg-zinc-300/40 dark:bg-slate-600/40'>
				<tr>
					<th className={`px-2 py-2 text-xs font-medium tracking-wider text-center`}>
						<span className={`font-bold ${participants[0]?.win ? 'text-blue-500' : 'text-red-500'} `}>
							{participants[0].win ? 'Victory ' : 'Defeat '}
						</span>
						({participants[0].teamId === 100 ? 'Blue' : 'Red'} Team)
					</th>
					{columnsDetail.map((column) => (
						<th key={column} className='px-2 py-2 text-xs font-medium tracking-wider text-center '>
							{column}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				<TableRows
					participants={participants}
					gameDuration={gameDuration}
					maxDamageDealt={maxDamageDealt}
					maxDamageTaken={maxDamageTaken}
				/>
			</tbody>
		</table>
	);
};

const TableRows = ({ participants, gameDuration, maxDamageDealt, maxDamageTaken }: ParticipantInfo) => {
	const spellPropertyNames: NumberPropertiesOfMatch[] = ['summoner1Id', 'summoner2Id'];
	const findSpellNameById = (id: number) => {
		const spell = spells.find((spell) => spell.id === id);
		return spell ? spell.name : 'Unknown Spell';
	};
	return (
		<>
			{participants.map((participant) => (
				<tr
					className={`${
						userNames.includes(participant.summonerName)
							? participant?.win
								? 'bg-blue-200/90 dark:bg-blue-500/50'
								: 'bg-red-200/90 dark:bg-red-500/50'
							: participant.win
							? 'bg-blue-200/40 dark:bg-blue-500/20'
							: 'bg-red-200/40 dark:bg-red-500/30'
					} text-[.65rem] lg:text-xs text-center`}
					key={participant.summonerName}
				>
					<td className='px-2 py-1  whitespace-nowrap min-w-[140px]  lg:min-w-[180px] w-full max-w-[180px]'>
						<div className='flex gap-1'>
							<div className='relative w-8 h-8 '>
								<Image
									src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/champion/${participant.championName}.png`}
									alt='champ-icon'
									sizes='100vw'
									priority
									quality={50}
									fill
									className={`object-cover rounded-full`}
								/>
								<span className='absolute -bottom-1 -left-1 rounded-full font-medium bg-slate-800 text-center p-0 sm:px-1 leading-4 w-4 text-[.55rem] text-zinc-100 '>
									{participant.champLevel}
								</span>
							</div>
							<div className='flex flex-col gap-[2px] justify-center'>
								{spellPropertyNames.map((propertyName) => (
									<div key={propertyName} className='relative w-3 h-3 lg:w-4 lg:h-4'>
										<Image
											src={`${process.env.NEXT_PUBLIC_API_URL}${
												process.env.NEXT_PUBLIC_API_PATCH
											}/img/spell/${findSpellNameById(participant[propertyName])}.png`}
											alt='spell-icon'
											sizes='100vw'
											priority
											quality={50}
											fill
											className='object-cover rounded-sm'
										/>
									</div>
								))}
							</div>
							<div className='flex flex-col gap-[2px] justify-center'>
								{participant.perks.styles.map((style) => {
									return (
										<div
											key={style.description}
											className={`relative w-3 h-3 lg:w-4 lg:h-4 rounded-full ${
												style.description === 'primaryStyle' ? 'bg-zinc-800' : ''
											}`}
										>
											<Image
												src={`https://opgg-static.akamaized.net/meta/images/lol/${
													style.description === 'primaryStyle' ? 'perk' : 'perkStyle'
												}/${
													style.description === 'primaryStyle' ? style.selections[0].perk : style.style
												}.png?image=q_auto,f_webp`}
												alt='spell-icon'
												sizes='100vw'
												priority
												quality={50}
												fill
												className='object-cover rounded-sm'
											/>
										</div>
									);
								})}
							</div>
							<span className='flex items-center text-[.6rem] lg:text-[.7rem] justify-start max-w-[75px] lg:max-w-[105px] overflow-hidden'>
								<a
									title={participant.summonerName}
									className='truncate'
									href={`https://www.op.gg/summoners/br/${participant.summonerName}`}
									target='_blank'
									rel='noreferrer'
								>
									{participant.summonerName}
								</a>
							</span>
						</div>
					</td>

					<td className='px-2 py-1  whitespace-nowrap min-w-[90px] w-full max-w-[90px]'>
						<p className='text-[.65rem] lg:text-xs font-medium '>
							{participant.kills} <span className=' font-extralight'>/</span>
							<span className='text-red-600 dark:text-red-400'>{participant.deaths}</span>
							<span className=' font-extralight'>/</span> {participant.assists}
							<span className='font-light'> ({(participant.challenges.killParticipation * 100).toFixed()}%)</span>
						</p>
						<p className='text-[.65rem] lg:text-xs font-medium'>
							{participant.deaths === 0 ? 'Perfect KDA' : `${participant.challenges.kda.toFixed(2)}:1`}
						</p>
					</td>

					<td className='px-2 py-1  whitespace-nowrap min-w-[100px] lg:min-w-[140px] w-full max-w-[140px]'>
						<div className='flex gap-1'>
							<ProgressBar value={participant.totalDamageDealtToChampions} maxValue={maxDamageDealt} type='deal' />
							<ProgressBar value={participant.totalDamageTaken} maxValue={maxDamageTaken} type='taken' />
						</div>
					</td>

					<td className='px-2 py-1  whitespace-nowrap min-w-[55px] w-full max-w-[55px]'>
						{participant.visionWardsBoughtInGame}
						<div>
							{participant.wardsKilled} / {participant.wardsPlaced}
						</div>
					</td>

					<td className='px-2 py-1  whitespace-nowrap min-w-[50px] w-full max-w-[50px]'>
						{participant.goldEarned.toLocaleString()}
					</td>

					<td className='px-2 py-1  whitespace-nowrap min-w-[50px] w-full max-w-[50px]'>
						{participant.totalMinionsKilled + participant.neutralMinionsKilled}
						<div>
							{(
								(participant.totalMinionsKilled + participant.neutralMinionsKilled) /
								(Math.floor(gameDuration / 60) + (gameDuration % 60) / 100)
							).toFixed(1)}
							/m
						</div>
					</td>

					<td className='w-full px-2 py-1 whitespace-nowrap '>
						<div className='flex gap-[2px]'>
							{items.map((itemKey) => {
								const itemValue = participant[itemKey as keyof Match]; // Acceso usando notación de índice
								return (
									<div
										key={itemKey}
										className={`rounded-md relative w-5 h-5 sm:w-5 sm:h-5 lg:h-6 lg:w-6 ${
											participant?.win ? ' bg-blue-400 dark:bg-blue-500/50 ' : ' bg-red-400 dark:bg-red-500/50 '
										}`}
									>
										{itemValue ? (
											<Image
												src={`${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_PATCH}/img/item/${itemValue}.png`}
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
					</td>
				</tr>
			))}
		</>
	);
};

const ProgressBar = ({ value, maxValue, type }: { value: number; maxValue: number; type: string }) => {
	return (
		<div className='w-1/2'>
			<div className='mb-1 text-center'>
				<span>{value.toLocaleString()}</span>
			</div>
			<div className='h-1 rounded-md bg-zinc-100 dark:bg-slate-500/50'>
				<div
					style={{ width: `${(value / maxValue) * 100}%` }}
					className={`h-full rounded-md ${type === 'deal' ? 'bg-red-500' : 'bg-blue-500'} `}
				/>
			</div>
		</div>
	);
};

const MatchInfo: React.FC<MatchHistoryProps> = ({ info }) => {
	const updatedTeams = info.teams
		.map((team) => {
			// Inicializa la suma total del oro para este equipo
			let totalGold = 0;

			// Itera sobre los participantes de este equipo
			info.participants.forEach((participant) => {
				if (participant.teamId === team.teamId) {
					totalGold += participant.goldEarned;
				}
			});

			// Crea un nuevo objeto de equipo con la suma total de oro agregada
			return {
				...team,
				totalGold: totalGold,
			};
		})
		.sort((a, b) => {
			if (a.teamId === info.user.teamId) return -1;
			if (b.teamId === info.user.teamId) return 1;
			return 0;
		});

	return (
		<div className='flex justify-around gap-2 px-2 py-3 lg:px-3 whitespace-nowrap min-w-[650px] '>
			<TeamStats team={updatedTeams[0]} />
			<TeamComparison teams={updatedTeams} />
			<TeamStats team={updatedTeams[1]} />
		</div>
	);
};

const TeamStats: React.FC<{ team: Team }> = ({ team }) => {
	return (
		<div className='flex gap-1 lg:gap-4'>
			<div className='flex items-center gap-1 text-sm'>
				<BaronIcon fill={team.win ? 'fill-blue-500' : 'fill-red-500'} />
				{team.objectives.baron.kills}
			</div>
			<div className='flex items-center gap-1 text-sm'>
				<DragonIcon fill={team.win ? 'fill-blue-500' : 'fill-red-500'} />
				{team.objectives.dragon.kills}
			</div>
			<div className='flex items-center gap-1 text-sm'>
				<TowerIcon fill={team.win ? 'fill-blue-500' : 'fill-red-500'} />
				{team.objectives.tower.kills}
			</div>
		</div>
	);
};

const TeamComparison: React.FC<{ teams: Team[] }> = ({ teams }) => {
	const totalGoldSum = teams.reduce((acc, team) => acc + team.totalGold, 0);
	const killsSum = teams.reduce((acc, team) => acc + team.objectives.champion.kills, 0);

	const team1Percentage = (teams[0].totalGold / totalGoldSum) * 100;
	const team2Percentage = (teams[1].totalGold / totalGoldSum) * 100;

	const team1KillsPercentage = (teams[0].objectives.champion.kills / killsSum) * 100;
	const team2KillsPercentage = (teams[1].objectives.champion.kills / killsSum) * 100;

	return (
		<div className='w-full max-w-md text-[.65rem] text-zinc-100 '>
			<div className='relative h-4 rounded-full'>
				<div
					className={`absolute flex items-center justify-start h-full pl-2 ${
						teams[0].win ? ' bg-blue-500' : ' bg-red-500'
					}`}
					style={{
						width: `${team1KillsPercentage}%`,
						left: '0',
						borderTopLeftRadius: '0.25rem',
						borderBottomLeftRadius: '0.25rem',
					}}
				>
					{teams[0].objectives.champion.kills}
				</div>
				<div
					className={`absolute flex items-center justify-end h-full pr-2 ${
						teams[1].win ? ' bg-blue-500' : ' bg-red-500'
					}`}
					style={{
						width: `${team2KillsPercentage}%`,
						right: '0',
						borderTopRightRadius: '0.25rem',
						borderBottomRightRadius: '0.25rem',
					}}
				>
					{teams[1].objectives.champion.kills}
				</div>
				<div className='absolute font-bold left-[46%]'>Total Kills</div>
			</div>

			<div className='relative h-4 mt-2 rounded-full'>
				<div
					className={`absolute flex items-center justify-start h-full pl-2 ${
						teams[0].win ? ' bg-blue-500' : 'bg-red-500'
					} `}
					style={{
						width: `${team1Percentage}%`,
						left: '0',
						borderTopLeftRadius: '0.25rem',
						borderBottomLeftRadius: '0.25rem',
					}}
				>
					{teams[0].totalGold.toLocaleString()}
				</div>
				<div
					className={`absolute flex items-center justify-end h-full pr-2 ${
						teams[1].win ? ' bg-blue-500' : 'bg-red-500'
					} `}
					style={{
						width: `${team2Percentage}%`,
						right: '0',
						borderTopRightRadius: '0.25rem',
						borderBottomRightRadius: '0.25rem',
					}}
				>
					{teams[1].totalGold.toLocaleString()}
				</div>
				<div className='absolute font-bold left-[46%]'>Total Gold</div>
			</div>
		</div>
	);
};

export default MatchDetail;
