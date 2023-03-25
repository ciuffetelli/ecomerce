import { AppData } from '@types';

import { api } from '@/services/api'

import { Head } from '@/Components/Head'
import { BackToTop } from '@/Components/BackToTop'
import { Header } from '@/Components/Header'
import { Hero } from '@/Components/Hero';

type HomeProps = {
    appData: AppData
}
export default function Home(props: HomeProps) {
    return (
        <>
            <Head title="Next Ecomerce" description="This is the home page" />
            {/* <BackToTop /> */}
            <Header menuData={props.appData.menu} basketData={props.appData.basket} />

            <main>
                <Hero data={[
                    {
                        source: 'https://ik.imagekit.io/p7nrzp9eb/portrait-shocked-young-african-woman-holding-mobile-phone-over-gray-background-portrait-shocked-young-african-woman-135299581.jpg?updatedAt=1679709292997',
                        alt: 'Hero 3',
                    }
                ]} />
            </main>
        </>
    )
}

export async function getStaticProps() {

    const appData = await api.get('/appData')
                            .then(response => response.data)
                            .catch(error => console.log(error));

    return {
        props: {
            appData: appData ?? {}
        }
    }
}