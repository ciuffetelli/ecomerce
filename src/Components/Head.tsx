import { default as NextHead } from 'next/head'

type HeadProps = {
    title: string
    description: string
    keywords?: string
}
export function Head(props: HeadProps) {
    return (
        <NextHead>
            <title>{ props.title }</title>
            <meta name="description" content={props.description} />
            <meta name="keywords" content={props.keywords} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </NextHead>
    )
}