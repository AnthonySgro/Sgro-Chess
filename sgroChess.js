/* eslint-disable no-unused-vars */
class Piece {
    constructor(color, chessTile) {
        this.white = color;
        if (color === true) {
            this.color = 'white';
        } else {
            this.color = 'black';
        }
        this.currentChessTile = chessTile;
        this.currentChessTile.piece = this;
        this.validMoves = [];
    }

    displayPiece() {
        document.getElementById(`${this.currentChessTile.name}-img`).src = this.imageFile;
        this.currentChessTile.updateImg();
    }

    hidePiece() {
        document.getElementById(`${this.currentChessTile.name}-img`).src =  'images/placeholder.png';
    }

    movePiece(chessTile) {
        this.hidePiece();
        this.currentChessTile.piece = null;
        this.currentChessTile.piecePresent = false;
        this.currentChessTile = chessTile;
        this.currentChessTile.piece = this;
        this.currentChessTile.piecePresent = true;
        this.validMoves = [];
        this.displayPiece();
    }

    initializePiece() {
        chessboard.pieces.push(this);
    }
}

class Pawn extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-pawn.png`;
        this.moveTwoAvailable = true;
    }

    //finds all valid chess tiles to move to, returns array.
    findValidMoves() {

        //if white pawn
        if (this.color === 'white') {
            //move forward one
            if (this.currentChessTile.adjacentTile('up') !== undefined) {
                let up = this.currentChessTile.adjacentTile('up');
                if (up.piecePresent === false) {
                    this.validMoves.push(this.currentChessTile.adjacentTile('up'));
    
                    //move forward two rule
                    if (this.moveTwoAvailable) {
                        this.validMoves.push(this.currentChessTile.adjacentTile('up').adjacentTile('up'));
                        this.moveTwoAvailable = false;
                    }
                }
            }

            let upLeft;
            let upRight;
            //take opponent's piece if diagonal up
            if (this.currentChessTile.adjacentTile('up-left') !== undefined) {
                upLeft = this.currentChessTile.adjacentTile('up-left');
                if (upLeft.piecePresent === true && upLeft.color != this.color) {
                    this.validMoves.push(upLeft);
                }    
            }

            if (this.currentChessTile.adjacentTile('up-right') !== undefined) {
                upRight = this.currentChessTile.adjacentTile('up-right');
                if (upRight.piecePresent === true && upRight.color != this.color) {
                    this.validMoves.push(upRight);
                }
            }

        //if black pawn
        } else {
            //move down one
            if (this.currentChessTile.adjacentTile('down') !== undefined) {
                let down = this.currentChessTile.adjacentTile('down');
                if (down.piecePresent === false) {
                    this.validMoves.push(this.currentChessTile.adjacentTile('down'));
    
                    if (this.moveTwoAvailable) {
                        this.validMoves.push(this.currentChessTile.adjacentTile('down').adjacentTile('down'));
                        this.moveTwoAvailable = false;
                    }
                }    
            }

            let downLeft;
            let downRight;
            //take opponent's piece if diagonal down
            if (this.currentChessTile.adjacentTile('down-left') !== undefined) {
                downLeft = this.currentChessTile.adjacentTile('down-left');
                if (downLeft.piecePresent === true && downLeft.color != this.color) {
                    this.validMoves.push(downLeft);
                }
            }
            if (this.currentChessTile.adjacentTile('down-right') !== undefined) {
                downRight = this.currentChessTile.adjacentTile('down-right');
                if (downRight.piecePresent === true && downRight.color != this.color) {
                    this.validMoves.push(downRight);
                }    
            }

        }

        return this.validMoves;
    }
}

class Knight extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-knight.png`;
    }
}

class Bishop extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-bishop.png`;
    }

    findValidMoves() {
        let movesUpRight;
        let movesUpLeft;
        let movesDownRight;
        let movesDownLeft;

        //make sure first square in each direction is defined on the board
        if (this.currentChessTile.adjacentTile('up-right') !== undefined) {
            movesUpRight = [this.currentChessTile.adjacentTile('up-right')];
        }
        if (this.currentChessTile.adjacentTile('up-left') !== undefined) {
            movesUpLeft = [this.currentChessTile.adjacentTile('up-left')];
        }
        if (this.currentChessTile.adjacentTile('down-right') !== undefined) {
            movesDownRight = [this.currentChessTile.adjacentTile('down-right')];
        }
        if (this.currentChessTile.adjacentTile('down-left') !== undefined) {
            movesDownLeft = [this.currentChessTile.adjacentTile('down-left')];
        }

        //fill in all squares in each direction until end of board
        let i = 0;
        if (this.currentChessTile.adjacentTile('up-right') !== undefined) {
            while (movesUpRight[i] !== undefined) {
                movesUpRight.push(movesUpRight[i].adjacentTile('up-right'));
                i++;
            }
            movesUpRight = movesUpRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUpRight = [];
        }
        
        i = 0;
        if (this.currentChessTile.adjacentTile('up-left') !== undefined) {
            while (movesUpLeft[i] !== undefined) {
                movesUpLeft.push(movesUpLeft[i].adjacentTile('up-left'));
                i++
            }
            movesUpLeft = movesUpLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUpLeft = [];
        }


        i = 0;
        if (this.currentChessTile.adjacentTile('down-right') !== undefined) {
            while (movesDownRight[i] !== undefined) {
                movesDownRight.push(movesDownRight[i].adjacentTile('down-right'));
                i++
            }
            movesDownRight = movesDownRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDownRight = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('down-left') !== undefined) {
            while (movesDownLeft[i] !== undefined) {
                movesDownLeft.push(movesDownLeft[i].adjacentTile('down-left'));
                i++
            }
            movesDownLeft = movesDownLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDownLeft = [];
        }

        //filter out squares after a piece can be taken
        let stop = false;
        let movesUpRightPass = [];
        i = 0
        if (movesUpRight.length !== 0) {
            while (stop === false) {
                if (movesUpRight[i].piecePresent === true && movesUpRight[i].color != this.color) {
                    stop = true;
                }
                movesUpRightPass.push(movesUpRight[i]);
                i++;
                if (movesUpRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesUpLeftPass = [];
        i = 0
        if (movesUpLeft.length !== 0) {
            while (stop === false) {
                console.log(movesUpLeft[i]);
                if (movesUpLeft[i].piecePresent === true && movesUpLeft[i].color != this.color) {
                    stop = true;
                }
                movesUpLeftPass.push(movesUpLeft[i]);
                i++;
                if (movesUpLeft[i] === undefined) {
                    stop = true;
                }
            }
        }
        
        stop = false;
        let movesDownRightPass = [];
        i = 0
        if (movesDownRight.length !== 0) {
            while (stop === false) {
                if (movesDownRight[i].piecePresent === true && movesDownRight[i].color != this.color) {
                    stop = true;
                }
                movesDownRightPass.push(movesDownRight[i]);
                i++;
                if (movesDownRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesDownLeftPass = [];
        i = 0
        if (movesDownLeft.length !== 0) {
            while (stop === false) {
                if (movesDownLeft[i].piecePresent === true && movesDownLeft[i].color != this.color) {
                    stop = true;
                }
                movesDownLeftPass.push(movesDownLeft[i]);
                i++;
                if (movesDownLeft[i] === undefined) {
                    stop = true;
                }
            }
        }

        let tempArray = [];
        this.validMoves = tempArray.concat(movesUpRightPass, movesUpLeftPass, movesDownRightPass, movesDownLeftPass);
        console.log(this.validMoves);
        return this.validMoves;

    }
}

class Rook extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-rook.png`;
    }

    findValidMoves() {

        let movesUp;
        let movesLeft;
        let movesDown;
        let movesRight;

        //make sure first square in each direction is defined on the board
        if (this.currentChessTile.adjacentTile('up') !== undefined) {
            movesUp = [this.currentChessTile.adjacentTile('up')];
        }
        if (this.currentChessTile.adjacentTile('left') !== undefined) {
            movesLeft = [this.currentChessTile.adjacentTile('left')];
        }
        if (this.currentChessTile.adjacentTile('down') !== undefined) {
            movesDown = [this.currentChessTile.adjacentTile('down')];
        }
        if (this.currentChessTile.adjacentTile('right') !== undefined) {
            movesRight = [this.currentChessTile.adjacentTile('right')];
        }

        //fill in all squares in each direction until end of board
        let i = 0;
        if (this.currentChessTile.adjacentTile('up') !== undefined) {
            while (movesUp[i] !== undefined) {
                movesUp.push(movesUp[i].adjacentTile('up'));
                i++;
            }
            movesUp = movesUp.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUp = [];
        }
        
        i = 0;
        if (this.currentChessTile.adjacentTile('left') !== undefined) {
            while (movesLeft[i] !== undefined) {
                movesLeft.push(movesLeft[i].adjacentTile('left'));
                i++
            }
            movesLeft = movesLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesLeft = [];
        }


        i = 0;
        if (this.currentChessTile.adjacentTile('down') !== undefined) {
            while (movesDown[i] !== undefined) {
                movesDown.push(movesDown[i].adjacentTile('down'));
                i++
            }
            movesDown = movesDown.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDown = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('right') !== undefined) {
            while (movesRight[i] !== undefined) {
                movesRight.push(movesRight[i].adjacentTile('right'));
                i++
            }
            movesRight = movesRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesRight = [];
        }

        //filter out squares after a piece can be taken
        let stop = false;
        let movesUpPass = [];
        i = 0
        if (movesUp.length !== 0) {
            while (stop === false) {
                if (movesUp[i].piecePresent === true && movesUp[i].color != this.color) {
                    stop = true;
                }
                movesUpPass.push(movesUp[i]);
                i++;
                if (movesUp[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesLeftPass = [];
        i = 0
        if (movesLeft.length !== 0) {
            while (stop === false) {
                if (movesLeft[i].piecePresent === true && movesLeft[i].color != this.color) {
                    stop = true;
                }
                movesLeftPass.push(movesLeft[i]);
                i++;
                if (movesLeft[i] === undefined) {
                    stop = true;
                }
            }
        }
        
        stop = false;
        let movesRightPass = [];
        i = 0
        if (movesRight.length !== 0) {
            while (stop === false) {
                if (movesRight[i].piecePresent === true && movesRight[i].color != this.color) {
                    stop = true;
                }
                movesRightPass.push(movesRight[i]);
                i++;
                if (movesRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesDownPass = [];
        i = 0
        if (movesDown.length !== 0) {
            while (stop === false) {
                if (movesDown[i].piecePresent === true && movesDown[i].color != this.color) {
                    stop = true;
                }
                movesDownPass.push(movesDown[i]);
                i++;
                if (movesDown[i] === undefined) {
                    stop = true;
                }
            }
        }
        let tempArray = [];
        this.validMoves = tempArray.concat(movesUpPass, movesLeftPass, movesDownPass, movesRightPass);
        console.log(this.validMoves);
        return this.validMoves;
    }
}

class Queen extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-queen.png`;
    }

    findValidMoves() {
        let movesUp;
        let movesLeft;
        let movesDown;
        let movesRight;
        let movesUpRight;
        let movesUpLeft;
        let movesDownRight;
        let movesDownLeft;

        //make sure first square in each direction is defined on the board
        if (this.currentChessTile.adjacentTile('up') !== undefined) {
            movesUp = [this.currentChessTile.adjacentTile('up')];
        }
        if (this.currentChessTile.adjacentTile('left') !== undefined) {
            movesLeft = [this.currentChessTile.adjacentTile('left')];
        }
        if (this.currentChessTile.adjacentTile('down') !== undefined) {
            movesDown = [this.currentChessTile.adjacentTile('down')];
        }
        if (this.currentChessTile.adjacentTile('right') !== undefined) {
            movesRight = [this.currentChessTile.adjacentTile('right')];
        }
        if (this.currentChessTile.adjacentTile('up-right') !== undefined) {
            movesUpRight = [this.currentChessTile.adjacentTile('up-right')];
        }
        if (this.currentChessTile.adjacentTile('up-left') !== undefined) {
            movesUpLeft = [this.currentChessTile.adjacentTile('up-left')];
        }
        if (this.currentChessTile.adjacentTile('down-right') !== undefined) {
            movesDownRight = [this.currentChessTile.adjacentTile('down-right')];
        }
        if (this.currentChessTile.adjacentTile('down-left') !== undefined) {
            movesDownLeft = [this.currentChessTile.adjacentTile('down-left')];
        }

        //fill in all squares in each direction until end of board
        let i = 0;
        if (this.currentChessTile.adjacentTile('up') !== undefined) {
            while (movesUp[i] !== undefined) {
                movesUp.push(movesUp[i].adjacentTile('up'));
                i++;
            }
            movesUp = movesUp.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUp = [];
        }
        
        i = 0;
        if (this.currentChessTile.adjacentTile('left') !== undefined) {
            while (movesLeft[i] !== undefined) {
                movesLeft.push(movesLeft[i].adjacentTile('left'));
                i++
            }
            movesLeft = movesLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesLeft = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('down') !== undefined) {
            while (movesDown[i] !== undefined) {
                movesDown.push(movesDown[i].adjacentTile('down'));
                i++
            }
            movesDown = movesDown.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDown = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('right') !== undefined) {
            while (movesRight[i] !== undefined) {
                movesRight.push(movesRight[i].adjacentTile('right'));
                i++
            }
            movesRight = movesRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesRight = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('up-right') !== undefined) {
            while (movesUpRight[i] !== undefined) {
                movesUpRight.push(movesUpRight[i].adjacentTile('up-right'));
                i++;
            }
            movesUpRight = movesUpRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUpRight = [];
        }
        
        i = 0;
        if (this.currentChessTile.adjacentTile('up-left') !== undefined) {
            while (movesUpLeft[i] !== undefined) {
                movesUpLeft.push(movesUpLeft[i].adjacentTile('up-left'));
                i++
            }
            movesUpLeft = movesUpLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesUpLeft = [];
        }


        i = 0;
        if (this.currentChessTile.adjacentTile('down-right') !== undefined) {
            while (movesDownRight[i] !== undefined) {
                movesDownRight.push(movesDownRight[i].adjacentTile('down-right'));
                i++
            }
            movesDownRight = movesDownRight.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDownRight = [];
        }

        i = 0;
        if (this.currentChessTile.adjacentTile('down-left') !== undefined) {
            while (movesDownLeft[i] !== undefined) {
                movesDownLeft.push(movesDownLeft[i].adjacentTile('down-left'));
                i++
            }
            movesDownLeft = movesDownLeft.filter(element => {
                return element !== undefined;
            })
        } else {
            movesDownLeft = [];
        }

        //filter out squares after a piece can be taken
        let stop = false;
        let movesUpPass = [];
        i = 0
        if (movesUp.length !== 0) {
            while (stop === false) {
                if (movesUp[i].piecePresent === true && movesUp[i].color != this.color) {
                    stop = true;
                }
                movesUpPass.push(movesUp[i]);
                i++;
                if (movesUp[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesLeftPass = [];
        i = 0
        if (movesLeft.length !== 0) {
            while (stop === false) {
                if (movesLeft[i].piecePresent === true && movesLeft[i].color != this.color) {
                    stop = true;
                }
                movesLeftPass.push(movesLeft[i]);
                i++;
                if (movesLeft[i] === undefined) {
                    stop = true;
                }
            }
        }
        
        stop = false;
        let movesRightPass = [];
        i = 0
        if (movesRight.length !== 0) {
            while (stop === false) {
                if (movesRight[i].piecePresent === true && movesRight[i].color != this.color) {
                    stop = true;
                }
                movesRightPass.push(movesRight[i]);
                i++;
                if (movesRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesDownPass = [];
        i = 0
        if (movesDown.length !== 0) {
            while (stop === false) {
                if (movesDown[i].piecePresent === true && movesDown[i].color != this.color) {
                    stop = true;
                }
                movesDownPass.push(movesDown[i]);
                i++;
                if (movesDown[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesUpRightPass = [];
        i = 0
        if (movesUpRight.length !== 0) {
            while (stop === false) {
                if (movesUpRight[i].piecePresent === true && movesUpRight[i].color != this.color) {
                    stop = true;
                }
                movesUpRightPass.push(movesUpRight[i]);
                i++;
                if (movesUpRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesUpLeftPass = [];
        i = 0
        if (movesUpLeft.length !== 0) {
            while (stop === false) {
                console.log(movesUpLeft[i]);
                if (movesUpLeft[i].piecePresent === true && movesUpLeft[i].color != this.color) {
                    stop = true;
                }
                movesUpLeftPass.push(movesUpLeft[i]);
                i++;
                if (movesUpLeft[i] === undefined) {
                    stop = true;
                }
            }
        }
        
        stop = false;
        let movesDownRightPass = [];
        i = 0
        if (movesDownRight.length !== 0) {
            while (stop === false) {
                if (movesDownRight[i].piecePresent === true && movesDownRight[i].color != this.color) {
                    stop = true;
                }
                movesDownRightPass.push(movesDownRight[i]);
                i++;
                if (movesDownRight[i] === undefined) {
                    stop = true;
                }
            }
        }

        stop = false;
        let movesDownLeftPass = [];
        i = 0
        if (movesDownLeft.length !== 0) {
            while (stop === false) {
                if (movesDownLeft[i].piecePresent === true && movesDownLeft[i].color != this.color) {
                    stop = true;
                }
                movesDownLeftPass.push(movesDownLeft[i]);
                i++;
                if (movesDownLeft[i] === undefined) {
                    stop = true;
                }
            }
        }

        let tempArray = [];
        this.validMoves = tempArray.concat(movesUpPass, movesRightPass, movesDownPass, movesLeftPass, 
                                           movesUpRightPass, movesUpLeftPass, movesDownRightPass, movesDownLeftPass);
        console.log(this.validMoves);
        return this.validMoves;

    }
}

class King extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-king.png`;
    }

    findValidMoves() {
        let up = this.currentChessTile.adjacentTile('up');
        let upRight = this.currentChessTile.adjacentTile('up-right');
        let right = this.currentChessTile.adjacentTile('right');
        let downRight = this.currentChessTile.adjacentTile('down-right');
        let down = this.currentChessTile.adjacentTile('down');
        let downLeft = this.currentChessTile.adjacentTile('down-left');
        let left = this.currentChessTile.adjacentTile('left');
        let upLeft = this.currentChessTile.adjacentTile('up-left');

        let avail = [up, upRight, right, downRight, down, downLeft, left, upLeft];

        avail = avail.filter(element => {
            return element !== undefined
        });

        console.log(avail);

        for (let i = 0; i < avail.length; i++) {
            if (avail[i].piecePresent === false || (avail[i].piecePresent === true && avail[i].color != this.color)) {
                this.validMoves.push(avail[i]);
            }
        }

        return this.validMoves;
    }
}

function chessTile(name, color) {
    this.name = name;
    this.white = color;
    this.column = name[0];
    this.row = name[1];

    this.chessCoord = [(this.column), parseInt(this.row)];
    this.numCoord = [this.column.charCodeAt(0) - 97, parseInt(this.row) - 1];

    this.htmlElement = document.getElementById(this.chessCoord[0]+this.chessCoord[1]);
    this.image = document.getElementById(`${this.name}-img`).src;

    if (this.image === 'file:///Users/anthony/programming/sgroChess/images/placeholder.png') {
        this.piecePresent = false;
    } else {
        this.piecePresent = true;
    }

    this.piece = null;
}

chessTile.prototype.updateImg = function() {
    this.htmlElement = document.getElementById(this.chessCoord[0]+this.chessCoord[1]);
    this.image = document.getElementById(`${this.name}-img`).src;

    if (this.image === 'file:///Users/anthony/programming/sgroChess/images/placeholder.png') {
        this.piecePresent = false;
    } else {
        this.piecePresent = true;
    }
}

chessTile.prototype.adjacentTile = function(str) {

    if (str === 'up') {
        return chessboard.board[this.numCoord[0]][this.numCoord[1] + 1];
    } else if (str === 'down') {
        return chessboard.board[this.numCoord[0]][this.numCoord[1] - 1];
    }

    if (chessboard.board[this.numCoord[0] + 1] !== undefined) {
        if (str === 'up-right') {
            return chessboard.board[this.numCoord[0] + 1][this.numCoord[1] + 1];
        } else if (str === 'right') {
            return chessboard.board[this.numCoord[0] + 1][this.numCoord[1]];
        } else if (str === 'down-right') {
            return chessboard.board[this.numCoord[0] + 1][this.numCoord[1] - 1];
        }
    }

    if (chessboard.board[this.numCoord[0] - 1] !== undefined) {
        if (str === 'down-left') {
            return chessboard.board[this.numCoord[0] - 1][this.numCoord[1] - 1];
        } else if (str === 'left') {
            return chessboard.board[this.numCoord[0] - 1][this.numCoord[1]];
        } else if (str === 'up-left') {
            return chessboard.board[this.numCoord[0] - 1][this.numCoord[1] + 1];
        }    
    }
    
    return;
}

class Chessboard {
    constructor() {
        this.board = [];
        this.pieces = [];
    }

    generateBoard() {
        //color false means "chessTile.white === false"
        let color = false;

        //generate 64 chessTile objects and push them to Chessboard.board multi dim array
        for (let i = 0; i < 8; i++) {
            let boardRow = [];
            let tileNameGen = [];
            //j starts at 1 because our naming starts from 1 (ex. a1, b2... h8)
            for (let j = 1; j <= 8; j++) {
                let letterCol = String.fromCharCode(97 + i);
                let chessTileName = letterCol + j;
                tileNameGen.push(chessTileName);
                tileNameGen[0] = new chessTile(chessTileName, color);
                boardRow.push(tileNameGen[0]);
                tileNameGen.pop()
                color = !color;
            }
            color = !color;
            this.board.push(boardRow);
        }

        /* this.board = [
            [a1, b1, c1, d1, e1, f1, g1, h1],
            [a2, b2, c2, d2, e2, f2, g2, h2],
            [a3, b3, c3, d3, e3, f3, g3, h3],
            [a4, b4, c4, d4, e4, f4, g4, h4],
            [a5, b5, c5, d5, e5, f5, g5, h5],
            [a6, b6, c6, d6, e6, f6, g6, h6],
            [a7, b7, c7, d7, e7, f7, g7, h7],
            [a8, b8, c8, d8, e8, f8, g8, h8],
        ] */

    }
}

function initChessboard() {
    let chessboard = new Chessboard
    chessboard.generateBoard();
    
    //colors the board tiles
    for (let col = 0; col < 8; col++) {
        for (let row = 0; row < 8; row++) {
            if (chessboard.board[col][row].white === true) {
                chessboard.board[col][row].htmlElement.style.backgroundColor = "#fffff0";
            } else {
                chessboard.board[col][row].htmlElement.style.backgroundColor = "#118ab2";
            }
        }
    }

    return chessboard;
}

function convertNotation(str) {
    let letter = str[0];
    let number = str[1];

    letter = (letter.charCodeAt(0) - 97)
    number = parseInt(number) - 1

    return [letter, number];
}

//<--------------------------HTML ISH---------------------------->
let chessboard = initChessboard();

//initialize game
let enterInitBtn = document.getElementById('init-game');
enterInitBtn.addEventListener('click', function() {

    //on load
    let whiteRook1 = new Rook(true, chessboard.board[0][0]);
    let whiteKnight1 = new Knight(true, chessboard.board[1][0]);
    let whiteBishop1 = new Bishop(true, chessboard.board[2][0]);
    let whiteQueen1 = new Queen(true, chessboard.board[3][0]);
    let whiteKing = new King(true, chessboard.board[4][0]);
    let whiteBishop2 = new Bishop(true, chessboard.board[5][0]);
    let whiteKnight2 = new Knight(true, chessboard.board[6][0]);
    let whiteRook2 = new Rook(true, chessboard.board[7][0]);
    let whitePawn1 = new Pawn(true, chessboard.board[0][1]);
    let whitePawn2 = new Pawn(true, chessboard.board[1][1]);
    let whitePawn3 = new Pawn(true, chessboard.board[2][1]);
    let whitePawn4 = new Pawn(true, chessboard.board[3][1]);
    let whitePawn5 = new Pawn(true, chessboard.board[4][1]);
    let whitePawn6 = new Pawn(true, chessboard.board[5][1]);
    let whitePawn7 = new Pawn(true, chessboard.board[6][1]);
    let whitePawn8 = new Pawn(true, chessboard.board[7][1]);

    let blackRook1 = new Rook(false, chessboard.board[0][7]);
    let blackKnight1 = new Knight(false, chessboard.board[1][7]);
    let blackBishop1 = new Bishop(false, chessboard.board[2][7]);
    let blackQueen1 = new Queen(false, chessboard.board[3][7]);
    let blackKing = new King(false, chessboard.board[4][7]);
    let blackBishop2 = new Bishop(false, chessboard.board[5][7]);
    let blackKnight2 = new Knight(false, chessboard.board[6][7]);
    let blackRook2 = new Rook(false, chessboard.board[7][7]);
    let blackPawn1 = new Pawn(false, chessboard.board[0][6]);
    let blackPawn2 = new Pawn(false, chessboard.board[1][6]);
    let blackPawn3 = new Pawn(false, chessboard.board[2][6]);
    let blackPawn4 = new Pawn(false, chessboard.board[3][6]);
    let blackPawn5 = new Pawn(false, chessboard.board[4][6]);
    let blackPawn6 = new Pawn(false, chessboard.board[5][6]);
    let blackPawn7 = new Pawn(false, chessboard.board[6][6]);
    let blackPawn8 = new Pawn(false, chessboard.board[7][6]);

    //testing...
    whiteRook1.displayPiece();
    whiteKnight1.displayPiece();
    whiteBishop1.displayPiece();
    whiteQueen1.displayPiece();
    whiteKing.displayPiece();
    whiteBishop2.displayPiece();
    whiteKnight2.displayPiece();
    whiteRook2.displayPiece();
    whitePawn1.displayPiece();
    whitePawn2.displayPiece();
    whitePawn3.displayPiece();
    whitePawn4.displayPiece();
    whitePawn5.displayPiece();
    whitePawn6.displayPiece();
    whitePawn7.displayPiece();
    whitePawn8.displayPiece();
    
    blackRook1.displayPiece();
    blackKnight1.displayPiece();
    blackBishop1.displayPiece();
    blackQueen1.displayPiece();
    blackKing.displayPiece();
    blackBishop2.displayPiece();
    blackKnight2.displayPiece();
    blackRook2.displayPiece();
    blackPawn1.displayPiece();
    blackPawn2.displayPiece();
    blackPawn3.displayPiece();
    blackPawn4.displayPiece();
    blackPawn5.displayPiece();
    blackPawn6.displayPiece();
    blackPawn7.displayPiece();
    blackPawn8.displayPiece();
})


//false === selecting
let selectingOrMoving = false;
let tile;
let piece;

//moving pieces!
document.addEventListener('click', function(e) {
    e = e || window.event;
    var target = e.target
    
    let id = convertNotation(target.id[0] + target.id[1]);
    
    //if you click an image...
    if (target.nodeName === 'IMG') {

        //and we are in the selecting phase
        if (selectingOrMoving === false) {

            //grab tile: if piece, hold onto it and change phase. if not, dont do anything.
            tile = chessboard.board[id[0]][id[1]]
            if (tile.piece != null) {
                displayFeedback('Moving Phase:')
                piece = tile.piece;
                console.dir(piece.validMoves);
                selectingOrMoving = !selectingOrMoving;
            }

        //if moving phase, move piece to wherever you clicked
        } else {
            tile = chessboard.board[id[0]][id[1]];
            let validMove = piece.findValidMoves().includes(tile);
            if ((tile.piece === null || tile.piece.color != piece.color) && validMove) {
                piece.movePiece(chessboard.board[id[0]][id[1]]);
                displayFeedback('Selecting Phase');
            }
            selectingOrMoving = !selectingOrMoving; 

        }  
    }
}, false);

//our output for user feedback
function displayFeedback(str) {
    document.getElementById('user-feedback').innerHTML = str;
}

