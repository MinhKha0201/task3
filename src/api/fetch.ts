import { App } from '@/types/App.type'
import { Team } from '@/types/Team.type'
import { User } from '@/types/User.type'

export type Response = {
    current_page: number
    data: User[]
    first_page_url: string
    from: number | null
    next_page_url: null
    path: string | null
    per_page: number | null
    prev_page_url: string | null
    to: number | null
}

export const fetchUser = async (
    url: string,
    options?: RequestInit,
): Promise<Response> => {
    return (await fetch(url, options)).json()
}

export const fetchTeam = async (
    url: string,
    options?: RequestInit,
): Promise<Team[]> => {
    return (await fetch(url, options)).json()
}
export const fetchApp = async (
    url: string,
    options?: RequestInit,
): Promise<App[]> => {
    return (await fetch(url, options)).json()
}
