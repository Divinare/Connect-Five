import {Dimensions} from 'react-native'

const ROWS = 25
const COLUMNS = 25
const SCREEN_WIDTH = Dimensions.get('window').width
const CELL_WIDTH = SCREEN_WIDTH / 12
const CELL_HEIGHT = CELL_WIDTH
const GAME_WIDTH = COLUMNS * CELL_WIDTH
const GAME_HEIGHT = ROWS * CELL_WIDTH
const EMPTY_CELL = ''

// old dimensions:
// We want game width to be evenly divided by the number of columns
// const GAME_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH % COLUMNS)
// const GAME_PADDING = Math.floor((SCREEN_WIDTH - GAME_WIDTH) / 2)

// const ROWS = 22
// const COLUMNS = 14
// const SCREEN_WIDTH = Dimensions.get('window').width
// // We want game width to be evenly divided by the number of columns
// const GAME_WIDTH = SCREEN_WIDTH - (SCREEN_WIDTH % COLUMNS)
// const GAME_PADDING = Math.floor((SCREEN_WIDTH - GAME_WIDTH) / 2)
// const CELL_WIDTH = GAME_WIDTH / COLUMNS
// const GAME_HEIGHT = CELL_WIDTH * ROWS
// const EMPTY_CELL = ''

export {
    ROWS,
    COLUMNS,
    SCREEN_WIDTH,
    GAME_WIDTH,
    GAME_HEIGHT,
    CELL_WIDTH,
    CELL_HEIGHT,
    EMPTY_CELL,
}
