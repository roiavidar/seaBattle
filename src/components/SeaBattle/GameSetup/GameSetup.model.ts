export interface IGameConfig {
    id: string,
    vsPlayer: boolean,
    roomName: string
}

export interface IRoomMetaData {
    id: string,
    active: boolean,
    connectedPlayers: number,
    name: string,
    numberOfPlayers: number
}