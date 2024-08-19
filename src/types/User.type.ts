import type { App } from './App.type'
import type { Team } from './Team.type'

export type User = {
    id: number
    name: string
    role: any[]
    apps: App[]
    teams: Team[]
}
