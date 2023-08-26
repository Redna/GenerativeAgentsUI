
export interface MoveDTO {
    row: number,
    col: number
}

export interface AgentDTO {
    name: string,
    description: string,
    location: string
    emoji: string
    activity: string
    movement: MoveDTO
}

export interface RoundUpdateDTO {
    agents: AgentDTO[]  
    round: number
    time: string
}