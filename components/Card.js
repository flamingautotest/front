export default function Card(props) {
    const {
        image = 'https://static.wamiz.com/images/animaux/chiens/large/bouledogue-francais.jpg',
        title = 'The title',
        text = 'Lorem ipsum dolor sit, ametconsectetur adipisicing elit. Beatae quaerat aut rerum voluptatum nisi atque possimus odio sint laudantium laboriosam tempore, iusto quia voluptatibus debitis eius ',
        textLink = 'Learn more',
        link = '#',
        className = '',
    } = props

    return (
        <div className={
                [
                    'flex rounded-2xl bg-white overflow-hidden mr-4 mb-6 flex-col md:flex-row',
                    className
                ].join(' ')
            }
        >
            {/* <img src={image} alt='' className='w-32 object-contain'/> */}
            <div className='w-52 md:h-auto h-100 bg-zinc-500 w-full hidden lg:block'></div>
            <div className='flex-col p-6 w-full'>
                <h3 className='text-xl mb-4'>{title}</h3>
                <p className='pb-5'>{text}</p>
                <a href={link} className='underline mt-6 font-medium'>{textLink}</a>
            </div>
        </div>
    )
}