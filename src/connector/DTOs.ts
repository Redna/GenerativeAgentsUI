
interface MoveDTO {
    row: number,
    col: number
}

interface AgentDTO {
    name: string,
    description: number,
    location: string
    emoji: string
    activity: string
    movement: MoveDTO
}

interface RoundUpdateDTO {
    agents: AgentDTO[]  
    round: number
}