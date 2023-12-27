import {Dimensions} from 'react-native'

const ROWS = 20
const COLUMNS = 12
const SCREEN_WIDTH = Dimensions.get('window').width
const GAME_PADDING = 5
const GAME_WIDTH = Math.floor(SCREEN_WIDTH - GAME_PADDING * 2 + 1)
const CELL_WIDTH = Math.floor(GAME_WIDTH / COLUMNS)
const GAME_HEIGHT = Math.floor(CELL_WIDTH * ROWS - GAME_PADDING * 2 + 1)
const EMPTY_CELL = ''

export {
    ROWS,
    COLUMNS,
    SCREEN_WIDTH,
    GAME_PADDING,
    GAME_WIDTH,
    GAME_HEIGHT,
    CELL_WIDTH,
    EMPTY_CELL,
}
