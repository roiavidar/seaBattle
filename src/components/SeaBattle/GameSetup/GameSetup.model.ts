export interface IGameConfig {
    id: string,
    vsPlayer: boolean,
    roomName: string,
    isPlayingFirst: boolean
}

export interface IRoomMetaData {
    id: string,
    active: boolean,
    connectedPlayers: number,
    name: string,
    numberOfPlayers: number
}