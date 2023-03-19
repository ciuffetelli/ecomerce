import { AppData } from '@types';

import { api } from '@/services/api'

import { Head } from '@/Components/Head'
import { BackToTop } from '@/Components/BackToTop'
import { Header } from '@/Components/Header'

type HomeProps = {
    appData: AppData
}
export default function Home(props: HomeProps) {
    return (
        <>
            <Head title="Next Ecomerce" description="This is the home page" />
            {/* <BackToTop /> */}
            <Header menuData={props.appData.menu} basketData={props.appData.basket} />
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