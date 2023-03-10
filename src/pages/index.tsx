import { Head } from '@/Components/Head'
import { BackToTop } from '@/Components/BackToTop'
import { Header } from '@/Components/Header'

export default function Home() {
    return (
        <>
            <Head title="Next Ecomerce" description="This is the home page" />
            <BackToTop />
            <Header />
        </>
    )
}