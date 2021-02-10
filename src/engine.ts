
export interface MoveCommand {
  source: string[]
  destination: string[]
}

export type Configuration =
  | Configuration_v1
  | Configuration_v2

type Configuration_v1 = string[][]

interface Configuration_v2 {
  blacklist: string[][]
}
