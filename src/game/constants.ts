import {Dimensions} from 'react-native'

const ROWS = 30
const COLUMNS = 20
const SCREEN_WIDTH = Dimensions.get('window').width
const CELL_WIDTH = SCREEN_WIDTH / 12
const CELL_HEIGHT = CELL_WIDTH
const EMPTY_CELL = ''

export {ROWS, COLUMNS, SCREEN_WIDTH, CELL_WIDTH, CELL_HEIGHT, EMPTY_CELL}
