import Image from 'next/image'

import { Hero } from './@types'
import styles from './Hero.module.css'

import { Carousel } from '../Carousel'

type HeroProps = {
    data: Hero[],
    height?: string
}
export function Hero(props: HeroProps) {

    const height = props.height ? props.height : '100vh';

    const getHeroItems = () => {
        return props.data.map((item, index) => (
            item?.type === 'video' ? 
                <></> 
            : 
                <Image key={index} src={item.source} alt={item.alt} fill priority={index === 0} />
        ))
    }

    return (
        <div className={styles.content} style={{
                height
            }}>
                {props.data.length > 1 ? <Carousel data={getHeroItems()} /> : getHeroItems()}
        </div>
    )
}