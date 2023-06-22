import { useScrollSpy } from '@raddix/use-scroll-spy';

const Section = ({ name, bg }: { bg: string; name: string }) => (
  <section
    id={name}
    className={`w-full h-[80vh] mt-20 flex items-center justify-center capitalize text-6xl rounded-[50px] ${bg}`}
  >
    {name}
  </section>
);

export const SectionIndicator = () => {
  const navList = ['home', 'work', 'about', 'contact'];

  const navActive = useScrollSpy(navList, { threshold: 0.6 });

  return (
    <div className='bg-black'>
      <nav className='max-w-[1120px] mx-auto h-32 rounded-3xl sticky top-0 px-8 flex items-center justify-center'>
        <ul className='flex bg-[#232526] rounded-2xl p-2'>
          {navList.map(item => (
            <li key={item}>
              <a
                href={`#${item}`}
                className={`
                block font-sans text-2xl capitalize py-3 px-10 rounded-2xl transition-colors
                ${
                  navActive === item
                    ? 'bg-white text-black font-medium'
                    : 'bg-transparent text-white'
                }
                `}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className='max-w-[1120px] w-full mx-auto'>
        <Section name='home' bg='bg-green-500' />
        <Section name='work' bg='bg-purple-400' />
        <Section name='about' bg='bg-orange-400' />
        <Section name='contact' bg='bg-green-400' />
      </main>
    </div>
  );
};
