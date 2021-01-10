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
        this.currentChessTile = chessTile;
        this.currentChessTile.piece = this;
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
}

class Rook extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-rook.png`;
    }
}

class Queen extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-queen.png`;
    }
}

class King extends Piece {
    constructor(color, chessTile) {
        super(color, chessTile)
        this.imageFile = `images/${this.color}-king.png`;
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

//initialize game
let enterInitBtn = document.getElementById('init-game');
enterInitBtn.addEventListener('click', function() {

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
                piece = tile.piece;
                selectingOrMoving = !selectingOrMoving;
            }
        //if moving, move piece to wherever you clicked
        } else {
            tile = chessboard.board[id[0]][id[1]];
            if (tile.piece === null) {
                piece.movePiece(chessboard.board[id[0]][id[1]]);
                selectingOrMoving = !selectingOrMoving; 
            }
        }  
    }
}, false);

//on load
let chessboard = initChessboard();
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