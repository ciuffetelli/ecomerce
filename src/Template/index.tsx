import React, { useEffect } from 'react';

import { Head } from '@/Components/Head';
import { appInit } from '@/store/actions/app';

type TemplateProps = {
    title?: string,
    description?: string,
    keywords?: string,
    children: React.ReactNode
}
export default function Template(props: TemplateProps) {

    useEffect(() => {
        appInit();
    }, [])
    return (
        <>
            <Head title={`${props.title ? props.title + '|' : ''} NextComerce`} description={props.description ?? ''} keywords={props.keywords}  />
            {props.children}
        </>
    )
}