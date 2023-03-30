import Link from "next/link";
import styles from "./Slider.module.css"

import { InfiniteCarousel } from "../Carousel/InfiniteCarousel";
import { Image } from '@/Components/Image';

import { FaChevronCircleUp } from 'react-icons/fa';

export type SliderItem = {
    tile: string
    image: string
    src: string
}
type SliderProps = {
    data: SliderItem[]
}
export function Slider(props: SliderProps) {
    return (
        <section className={styles.container}>
            <InfiniteCarousel>
                {props.data.map((item, index) => (
                    <Link key={index} href={item.src}>
                        <div className={styles.item}>
                            <div className={styles.imageContainer}>
                                <Image src={item.image} alt={item.tile} />
                                <FaChevronCircleUp className={styles.buttonView} />
                            </div>
                            <h3 className={styles.title}>{item.tile}</h3>
                        </div>                
                    </Link>
                ) as any)}
            </InfiniteCarousel>
        </section>
    )
}