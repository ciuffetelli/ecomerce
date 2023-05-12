import { Header } from '@/Components/Header'

import Template from '@/Template'

export default function Home() {
    return (
        <Template>
            <Header />
            {/* <Header menuData={props.appData.menu} basketData={props.appData.basket}  /> */}
        </Template>
    )
}

// export async function getStaticProps() {

//     const data = await appData.get()

//     return {
//         props: {
//             appData: data ?? {}
//         },
//         // revalidate: 600
//     }
// }