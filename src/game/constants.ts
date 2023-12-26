import {Dimensions} from 'react-native'

const ROWS = 20
const COLUMNS = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const GAME_PADDING = 5
const GAME_WIDTH = Math.floor(SCREEN_WIDTH - GAME_PADDING * 2 - 2)
const CELL_WIDTH = Math.floor(GAME_WIDTH / COLUMNS)
const EMPTY_CELL = ''

export {
    ROWS,
    COLUMNS,
    SCREEN_WIDTH,
    GAME_PADDING,
    GAME_WIDTH,
    CELL_WIDTH,
    EMPTY_CELL,
}
