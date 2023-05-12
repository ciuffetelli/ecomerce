import { useSelector } from 'react-redux';

import { selectApp } from '@/store/reducers/app';

import { initialState } from '@/store/reducers/app';

export function useApp() {
    const app = useSelector(selectApp);

    return !app || app?.status === 'failed' ? initialState : app;
}