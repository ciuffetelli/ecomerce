import React, { useState, useEffect } from 'react';
import { Menu } from './@types';

import { Button } from '@/Components/Button';

import { BsChevronDown } from 'react-icons/bs';

type MenuCategoryProps = {
    data: Menu
    index: number
}
export function MenuCategory(props: MenuCategoryProps) {

    const handleMenuItemClick = (index: number) => {
    }

    return (
        <div className='flex absolute bottom-0 translate-y-full justify-center animate-slide-up' data-submenu={props.index}>
            <div className='p-4 w-max bg-neutral-100 dark:bg-slate-700 text-slate-600 dark:text-neutral-50/90 border border-slate-600/10 dark:border-slate-500 shadow-sm rounded-xl'>
                {props.data.map((item, index) => (
                    <Button title={item.title} Icon={item.children && item.children?.length > 0 ? BsChevronDown : undefined} action={item.children && item.children.length > 0 ? () => handleMenuItemClick(index) : item.url ?? ''} className='border-none flex-row-reverse' />
                ))}
            </div>
        </div>
    )
}