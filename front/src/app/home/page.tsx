import { CardList } from '../../components/CardList';

export default function HomePage() {
    return (
        <main className='flex-grow flex flex-col items-center font-bold text-xl'>
            <h1 className='mt-5 text-2xl'>Productos destacados</h1>
            <CardList />
        </main>
    )
}