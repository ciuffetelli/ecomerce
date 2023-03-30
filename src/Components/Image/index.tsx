import { useState } from 'react';

import { default as NextImage, ImageProps as NextImageProps }from 'next/image'
import probe from "probe-image-size";

import styles from './Image.module.css'

type ImageProps = NextImageProps & {

}
export function Image(props: ImageProps) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [size, setSize] = useState({ width: props.width ?? 100, height: props.height ?? 100 })

    !props.fill && size.width === 100 && (probe(props.src as string).then((size) => {
        setSize({
            width: size.width,
            height: size.height
        })
    }));

    const getSize = () => {
        return props.fill ? {} : size
    }

    return (
        <div className={styles.container} data-loaded={isLoaded}>
            <NextImage 
                {...props}
                {...getSize()}
                className={`${styles.image}${props.className ? ` ${props.className}` : ''}`}
                onLoadingComplete={() => setIsLoaded(true)}               
                style={{
                    ...props.style,
                    objectFit: props.fill ? 'contain' : 'cover',
                }}
            />
        </div>
    )
}