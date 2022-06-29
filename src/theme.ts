import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
export interface DefaultTheme {
    [key: string]: string;
    0: string,
    1: string,
    2: string,
    3: string,
    4: string,
    5: string,
    6: string,
    7: string,
    8: string,
    9: string,
    10: string,

}
}

export const themeDark: DefaultTheme = {
    0: '#1c64d9',
    1: '#901cd9',
    2: '#1cd92f',
    3: '#1cd92f',
    4: '#d9ba1c',
    5: '#d9771c',
    6: '#1cd971',
    7: '#1ca7d9',
    8: '#d91cb0',
    9: '#7a1cd9',
    10: '#1cd96e',

}
