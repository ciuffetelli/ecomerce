import { useState } from 'react';
import probe from "probe-image-size";

import { default as NextImage, ImageProps as NextImageProps }from 'next/image'

type ImageProps = NextImageProps & {

}
export function Image(props: ImageProps) {

    const [isLoaded, setIsLoaded] = useState(false)
    const [size, setSize] = useState({ width: props.width ?? 100, height: props.height ?? 100 })
    const isSVG = props.src?.toString().endsWith('.svg')

    if(!props.fill && size.width === 100) {
        if(!isSVG) {
            probe(props.src as string).then((size) => {
                setSize({
                    width: size.width,
                    height: size.height
                })
            })
        }
    }

    const getSize = () => {
        return props.fill ? {} : size
    }    

    return (
        <div className={`relative flex w-full h-full justify-center items-center ${isLoaded ? '' : 'bg-slate-400 rounded-xl animate-pulse'}`} data-loaded={isLoaded}>
             <NextImage 
                 {...props}
                 {...getSize()}
                 className={`${props.className ? ` ${props.className}` : ''}`}
                 onLoadingComplete={() => setIsLoaded(true)}
             />
        </div>
    )
}