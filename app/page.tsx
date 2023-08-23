const Home = () => {
	return (
		<section className='bg-img'>
			<aside className='flex items-center justify-center w-full min-h-screen text-center bg-black bg-opacity-40 '>
				<AnimatedTitle />
			</aside>
		</section>
	);
};

const AnimatedTitle = () => {
  return (
    <section>
      <h2 className='m-0 text-[4rem] font-semibold leading-snug text-white md:text-[5rem]'>
        Soy{' '}
        <span className='font-semibold text-red-500 dark:text-cyan-400 animate-ease-out animate-fade delay-[1s] '>
          Mirato
        </span>
        <br />
        y te enseño
        <br />a jugar{' '}
        <span className='font-semibold text-red-500 dark:text-cyan-400 animate-ease-out animate-fade delay-[1s] '>
          TOP
        </span>
      </h2>
    </section>
  );
};



export default Home;
