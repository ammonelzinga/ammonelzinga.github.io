// Chess Game implementation for Ammon Elzinga's portfolio

class ChessGame {
    constructor() {
        this.board = this.createInitialBoard();
        this.currentPlayer = 'WHITE';
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameStatus = 'ACTIVE'; // ACTIVE, CHECK, CHECKMATE, STALEMATE
        this.moveHistory = [];
        this.kings = {
            'WHITE': {row: 0, col: 4},
            'BLACK': {row: 7, col: 4}
        };
        this.castlingRights = {
            'WHITE': {kingSide: true, queenSide: true},
            'BLACK': {kingSide: true, queenSide: true}
        };
        this.enPassantTarget = null;
    }

    createInitialBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Place pawns
        for (let col = 0; col < 8; col++) {
            board[1][col] = {type: 'PAWN', color: 'WHITE'};
            board[6][col] = {type: 'PAWN', color: 'BLACK'};
        }
        
        // Place rooks
        board[0][0] = {type: 'ROOK', color: 'WHITE'};
        board[0][7] = {type: 'ROOK', color: 'WHITE'};
        board[7][0] = {type: 'ROOK', color: 'BLACK'};
        board[7][7] = {type: 'ROOK', color: 'BLACK'};
        
        // Place knights
        board[0][1] = {type: 'KNIGHT', color: 'WHITE'};
        board[0][6] = {type: 'KNIGHT', color: 'WHITE'};
        board[7][1] = {type: 'KNIGHT', color: 'BLACK'};
        board[7][6] = {type: 'KNIGHT', color: 'BLACK'};
        
        // Place bishops
        board[0][2] = {type: 'BISHOP', color: 'WHITE'};
        board[0][5] = {type: 'BISHOP', color: 'WHITE'};
        board[7][2] = {type: 'BISHOP', color: 'BLACK'};
        board[7][5] = {type: 'BISHOP', color: 'BLACK'};
        
        // Place queens
        board[0][3] = {type: 'QUEEN', color: 'WHITE'};
        board[7][3] = {type: 'QUEEN', color: 'BLACK'};
        
        // Place kings
        board[0][4] = {type: 'KING', color: 'WHITE'};
        board[7][4] = {type: 'KING', color: 'BLACK'};
        
        return board;
    }

    getPieceAt(row, col) {
        if (row < 0 || row > 7 || col < 0 || col > 7) return null;
        return this.board[row][col];
    }

    isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    isOccupied(row, col) {
        return this.getPieceAt(row, col) !== null;
    }

    isOpponentPiece(row, col, color) {
        const piece = this.getPieceAt(row, col);
        return piece !== null && piece.color !== color;
    }

    selectPiece(row, col) {
        const piece = this.getPieceAt(row, col);
        if (piece && piece.color === this.currentPlayer) {
            this.selectedPiece = {row, col, piece};
            this.validMoves = this.getValidMovesForPiece(row, col, piece);
            return true;
        }
        return false;
    }

    movePiece(toRow, toCol) {
        if (!this.selectedPiece) return false;
        
        const {row: fromRow, col: fromCol, piece} = this.selectedPiece;
        
        // Check if the move is valid
        const moveIsValid = this.validMoves.some(move => 
            move.row === toRow && move.col === toCol
        );
        
        if (!moveIsValid) return false;
        
        // Handle special moves
        const specialMove = this.handleSpecialMoves(fromRow, fromCol, toRow, toCol, piece);
        
        // Save for move history
        const capturedPiece = this.getPieceAt(toRow, toCol);
        const moveRecord = {
            piece: {...piece},
            from: {row: fromRow, col: fromCol},
            to: {row: toRow, col: toCol},
            captured: capturedPiece ? {...capturedPiece} : null,
            specialMove
        };
        
        // Make the move
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Update king position if king moved
        if (piece.type === 'KING') {
            this.kings[piece.color] = {row: toRow, col: toCol};
            // Update castling rights
            this.castlingRights[piece.color].kingSide = false;
            this.castlingRights[piece.color].queenSide = false;
        }
        
        // Update castling rights if rook moved
        if (piece.type === 'ROOK') {
            if (fromRow === 0 && fromCol === 0) this.castlingRights['WHITE'].queenSide = false;
            if (fromRow === 0 && fromCol === 7) this.castlingRights['WHITE'].kingSide = false;
            if (fromRow === 7 && fromCol === 0) this.castlingRights['BLACK'].queenSide = false;
            if (fromRow === 7 && fromCol === 7) this.castlingRights['BLACK'].kingSide = false;
        }
        
        // Handle pawn promotion
        if (piece.type === 'PAWN' && (toRow === 7 || toRow === 0)) {
            // Default promotion to queen - UI will allow choice
            this.promotePawn(toRow, toCol, 'QUEEN');
            moveRecord.promotion = 'QUEEN';
        }
        
        // Set en passant target
        this.enPassantTarget = null;
        if (piece.type === 'PAWN' && Math.abs(fromRow - toRow) === 2) {
            this.enPassantTarget = {
                row: (fromRow + toRow) / 2,
                col: toCol
            };
        }
        
        // Add to move history
        this.moveHistory.push(moveRecord);
        
        // Change player
        this.currentPlayer = this.currentPlayer === 'WHITE' ? 'BLACK' : 'WHITE';
        
        // Clear selection
        this.selectedPiece = null;
        this.validMoves = [];
        
        // Check game status
        this.updateGameStatus();
        
        return true;
    }

    handleSpecialMoves(fromRow, fromCol, toRow, toCol, piece) {
        // Castling
        if (piece.type === 'KING' && Math.abs(fromCol - toCol) === 2) {
            const isKingSide = toCol > fromCol;
            const rookCol = isKingSide ? 7 : 0;
            const newRookCol = isKingSide ? toCol - 1 : toCol + 1;
            
            // Move the rook
            const rook = this.board[fromRow][rookCol];
            this.board[fromRow][newRookCol] = rook;
            this.board[fromRow][rookCol] = null;
            
            return {type: 'CASTLING', side: isKingSide ? 'KING_SIDE' : 'QUEEN_SIDE'};
        }
        
        // En Passant
        if (piece.type === 'PAWN' && 
            this.enPassantTarget && 
            toRow === this.enPassantTarget.row && 
            toCol === this.enPassantTarget.col) {
            // Remove the captured pawn
            const capturedPawnRow = piece.color === 'WHITE' ? toRow - 1 : toRow + 1;
            this.board[capturedPawnRow][toCol] = null;
            
            return {type: 'EN_PASSANT'};
        }
        
        return null;
    }

    promotePawn(row, col, pieceType) {
        const piece = this.getPieceAt(row, col);
        if (piece && piece.type === 'PAWN') {
            piece.type = pieceType;
        }
    }

    getValidMovesForPiece(row, col, piece) {
        const moves = [];
        
        switch (piece.type) {
            case 'PAWN':
                this.getPawnMoves(row, col, piece, moves);
                break;
            case 'KNIGHT':
                this.getKnightMoves(row, col, piece, moves);
                break;
            case 'BISHOP':
                this.getBishopMoves(row, col, piece, moves);
                break;
            case 'ROOK':
                this.getRookMoves(row, col, piece, moves);
                break;
            case 'QUEEN':
                this.getQueenMoves(row, col, piece, moves);
                break;
            case 'KING':
                this.getKingMoves(row, col, piece, moves);
                break;
        }
        
        // Filter moves that would leave the king in check
        return this.filterMovesToPreventCheck(row, col, piece, moves);
    }

    filterMovesToPreventCheck(row, col, piece, moves) {
        return moves.filter(move => {
            // Create a temporary board copy
            const tempBoard = this.board.map(r => [...r]);
            
            // Make the move on the temporary board
            tempBoard[move.row][move.col] = piece;
            tempBoard[row][col] = null;
            
            // If the piece is a king, update its position for the check test
            let kingPos = {...this.kings[piece.color]};
            if (piece.type === 'KING') {
                kingPos = {row: move.row, col: move.col};
            }
            
            // Check if the king would be in check
            return !this.isPositionUnderAttack(kingPos.row, kingPos.col, piece.color, tempBoard);
        });
    }

    isPositionUnderAttack(row, col, color, board = this.board) {
        // Check if any opponent piece can attack the given position
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const attackingPiece = board[r][c];
                if (attackingPiece && attackingPiece.color !== color) {
                    // Check if this piece can attack the position
                    if (this.canPieceAttackPosition(r, c, attackingPiece, row, col, board)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    canPieceAttackPosition(pieceRow, pieceCol, piece, targetRow, targetCol, board) {
        switch (piece.type) {
            case 'PAWN':
                // Pawns attack diagonally forward
                const forwardDir = piece.color === 'WHITE' ? 1 : -1;
                return (Math.abs(pieceCol - targetCol) === 1) && 
                       (targetRow - pieceRow === forwardDir);
            
            case 'KNIGHT':
                // Knights move in L-shapes
                const rowDiff = Math.abs(targetRow - pieceRow);
                const colDiff = Math.abs(targetCol - pieceCol);
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
            
            case 'BISHOP':
                // Bishops move diagonally
                if (Math.abs(targetRow - pieceRow) !== Math.abs(targetCol - pieceCol)) {
                    return false;
                }
                return this.isPathClear(pieceRow, pieceCol, targetRow, targetCol, board);
            
            case 'ROOK':
                // Rooks move horizontally or vertically
                if (targetRow !== pieceRow && targetCol !== pieceCol) {
                    return false;
                }
                return this.isPathClear(pieceRow, pieceCol, targetRow, targetCol, board);
            
            case 'QUEEN':
                // Queens combine bishop and rook movement
                const isDiagonal = Math.abs(targetRow - pieceRow) === Math.abs(targetCol - pieceCol);
                const isStraight = targetRow === pieceRow || targetCol === pieceCol;
                if (!isDiagonal && !isStraight) {
                    return false;
                }
                return this.isPathClear(pieceRow, pieceCol, targetRow, targetCol, board);
            
            case 'KING':
                // Kings move one square in any direction
                return Math.abs(targetRow - pieceRow) <= 1 && 
                       Math.abs(targetCol - pieceCol) <= 1;
        }
        return false;
    }

    isPathClear(startRow, startCol, endRow, endCol, board = this.board) {
        const rowDir = endRow > startRow ? 1 : (endRow < startRow ? -1 : 0);
        const colDir = endCol > startCol ? 1 : (endCol < startCol ? -1 : 0);
        
        let row = startRow + rowDir;
        let col = startCol + colDir;
        
        while (row !== endRow || col !== endCol) {
            if (board[row][col] !== null) {
                return false; // Path is blocked
            }
            row += rowDir;
            col += colDir;
        }
        
        return true;
    }

    getPawnMoves(row, col, piece, moves) {
        const direction = piece.color === 'WHITE' ? 1 : -1;
        const startingRow = piece.color === 'WHITE' ? 1 : 6;
        
        // Forward move
        if (this.isValidPosition(row + direction, col) && !this.isOccupied(row + direction, col)) {
            moves.push({row: row + direction, col, special: null});
            
            // Double forward move from starting position
            if (row === startingRow && !this.isOccupied(row + 2 * direction, col)) {
                moves.push({row: row + 2 * direction, col, special: 'DOUBLE_PAWN'});
            }
        }
        
        // Captures
        const captureOffsets = [-1, 1];
        captureOffsets.forEach(offset => {
            const newCol = col + offset;
            const newRow = row + direction;
            
            if (this.isValidPosition(newRow, newCol)) {
                // Normal capture
                if (this.isOpponentPiece(newRow, newCol, piece.color)) {
                    moves.push({row: newRow, col: newCol, special: 'CAPTURE'});
                }
                
                // En passant
                if (this.enPassantTarget && 
                    newRow === this.enPassantTarget.row && 
                    newCol === this.enPassantTarget.col) {
                    moves.push({row: newRow, col: newCol, special: 'EN_PASSANT'});
                }
            }
        });
    }

    getKnightMoves(row, col, piece, moves) {
        const offsets = [
            {row: -2, col: -1}, {row: -2, col: 1},
            {row: -1, col: -2}, {row: -1, col: 2},
            {row: 1, col: -2}, {row: 1, col: 2},
            {row: 2, col: -1}, {row: 2, col: 1}
        ];
        
        offsets.forEach(offset => {
            const newRow = row + offset.row;
            const newCol = col + offset.col;
            
            if (this.isValidPosition(newRow, newCol)) {
                if (!this.isOccupied(newRow, newCol)) {
                    moves.push({row: newRow, col: newCol, special: null});
                } else if (this.isOpponentPiece(newRow, newCol, piece.color)) {
                    moves.push({row: newRow, col: newCol, special: 'CAPTURE'});
                }
            }
        });
    }

    getBishopMoves(row, col, piece, moves) {
        const directions = [
            {rowDir: -1, colDir: -1}, // up-left
            {rowDir: -1, colDir: 1},  // up-right
            {rowDir: 1, colDir: -1},  // down-left
            {rowDir: 1, colDir: 1}    // down-right
        ];
        
        this.getSlidingMoves(row, col, piece, moves, directions);
    }

    getRookMoves(row, col, piece, moves) {
        const directions = [
            {rowDir: -1, colDir: 0}, // up
            {rowDir: 1, colDir: 0},  // down
            {rowDir: 0, colDir: -1}, // left
            {rowDir: 0, colDir: 1}   // right
        ];
        
        this.getSlidingMoves(row, col, piece, moves, directions);
    }

    getQueenMoves(row, col, piece, moves) {
        // Queen combines bishop and rook moves
        this.getBishopMoves(row, col, piece, moves);
        this.getRookMoves(row, col, piece, moves);
    }

    getKingMoves(row, col, piece, moves) {
        // Normal king moves (one square in any direction)
        for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
            for (let colOffset = -1; colOffset <= 1; colOffset++) {
                if (rowOffset === 0 && colOffset === 0) continue;
                
                const newRow = row + rowOffset;
                const newCol = col + colOffset;
                
                if (this.isValidPosition(newRow, newCol)) {
                    if (!this.isOccupied(newRow, newCol)) {
                        moves.push({row: newRow, col: newCol, special: null});
                    } else if (this.isOpponentPiece(newRow, newCol, piece.color)) {
                        moves.push({row: newRow, col: newCol, special: 'CAPTURE'});
                    }
                }
            }
        }
        
        // Castling
        this.getCastlingMoves(row, col, piece, moves);
    }

    getCastlingMoves(row, col, piece, moves) {
        if (this.isKingInCheck(piece.color)) return; // Can't castle out of check
        
        const castlingRights = this.castlingRights[piece.color];
        const kingRow = piece.color === 'WHITE' ? 0 : 7;
        
        // King-side castling
        if (castlingRights.kingSide && 
            !this.isOccupied(kingRow, 5) && 
            !this.isOccupied(kingRow, 6) && 
            !this.isPositionUnderAttack(kingRow, 5, piece.color)) {
            moves.push({row: kingRow, col: 6, special: 'CASTLING_KING_SIDE'});
        }
        
        // Queen-side castling
        if (castlingRights.queenSide && 
            !this.isOccupied(kingRow, 3) && 
            !this.isOccupied(kingRow, 2) && 
            !this.isOccupied(kingRow, 1) && 
            !this.isPositionUnderAttack(kingRow, 3, piece.color)) {
            moves.push({row: kingRow, col: 2, special: 'CASTLING_QUEEN_SIDE'});
        }
    }

    getSlidingMoves(row, col, piece, moves, directions) {
        directions.forEach(({rowDir, colDir}) => {
            let newRow = row + rowDir;
            let newCol = col + colDir;
            
            while (this.isValidPosition(newRow, newCol)) {
                if (!this.isOccupied(newRow, newCol)) {
                    moves.push({row: newRow, col: newCol, special: null});
                } else {
                    if (this.isOpponentPiece(newRow, newCol, piece.color)) {
                        moves.push({row: newRow, col: newCol, special: 'CAPTURE'});
                    }
                    break; // Stop in this direction if we hit any piece
                }
                
                newRow += rowDir;
                newCol += colDir;
            }
        });
    }

    isKingInCheck(color) {
        const kingPos = this.kings[color];
        return this.isPositionUnderAttack(kingPos.row, kingPos.col, color);
    }

    updateGameStatus() {
        const currentColor = this.currentPlayer;
        const isInCheck = this.isKingInCheck(currentColor);
        
        // Check if the current player has any valid moves
        let hasValidMoves = false;
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.getPieceAt(row, col);
                if (piece && piece.color === currentColor) {
                    const moves = this.getValidMovesForPiece(row, col, piece);
                    if (moves.length > 0) {
                        hasValidMoves = true;
                        break;
                    }
                }
            }
            if (hasValidMoves) break;
        }
        
        if (!hasValidMoves) {
            if (isInCheck) {
                this.gameStatus = 'CHECKMATE';
            } else {
                this.gameStatus = 'STALEMATE';
            }
        } else if (isInCheck) {
            this.gameStatus = 'CHECK';
        } else {
            this.gameStatus = 'ACTIVE';
        }
    }

    resetGame() {
        this.board = this.createInitialBoard();
        this.currentPlayer = 'WHITE';
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameStatus = 'ACTIVE';
        this.moveHistory = [];
        this.kings = {
            'WHITE': {row: 0, col: 4},
            'BLACK': {row: 7, col: 4}
        };
        this.castlingRights = {
            'WHITE': {kingSide: true, queenSide: true},
            'BLACK': {kingSide: true, queenSide: true}
        };
        this.enPassantTarget = null;
    }

    // Helper for the UI
    getPieceSymbol(piece) {
        if (!piece) return '';
        
        const symbols = {
            'WHITE': {
                'KING': '♔', 'QUEEN': '♕', 'ROOK': '♖',
                'BISHOP': '♗', 'KNIGHT': '♘', 'PAWN': '♙'
            },
            'BLACK': {
                'KING': '♚', 'QUEEN': '♛', 'ROOK': '♜',
                'BISHOP': '♝', 'KNIGHT': '♞', 'PAWN': '♟'
            }
        };
        
        return symbols[piece.color][piece.type];
    }
}

// UI Controller
class ChessUI {
    constructor() {
        this.game = new ChessGame();
        this.boardElement = document.getElementById('chess-board');
        this.statusElement = document.getElementById('game-status');
        this.moveHistoryElement = document.getElementById('move-history-list');
        this.promotionModal = document.getElementById('promotion-modal');
        this.pendingPromotion = null;
        
        this.initializeBoard();
        this.initializeEventListeners();
        this.updateBoard();
        this.updateStatus();
    }
    
    initializeBoard() {
        this.boardElement.innerHTML = '';
        
        // Create 64 squares
        for (let row = 7; row >= 0; row--) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                this.boardElement.appendChild(square);
            }
        }
    }
    
    initializeEventListeners() {
        // Square click event
        this.boardElement.addEventListener('click', (e) => {
            const square = e.target.closest('.square');
            if (!square) return;
            
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            
            this.handleSquareClick(row, col);
        });
        
        // Reset button
        document.getElementById('reset-button').addEventListener('click', () => {
            this.game.resetGame();
            this.updateBoard();
            this.updateStatus();
            this.updateMoveHistory();
        });
        
        // Promotion piece selection
        document.querySelectorAll('.promotion-piece').forEach(element => {
            element.addEventListener('click', () => {
                const pieceType = element.dataset.piece;
                if (this.pendingPromotion) {
                    this.game.promotePawn(
                        this.pendingPromotion.row, 
                        this.pendingPromotion.col, 
                        pieceType
                    );
                    this.pendingPromotion = null;
                    this.promotionModal.style.display = 'none';
                    this.updateBoard();
                }
            });
        });
    }
    
    handleSquareClick(row, col) {
        const piece = this.game.getPieceAt(row, col);
        
        // If we have a piece selected
        if (this.game.selectedPiece) {
            // If clicking on a valid move
            const validMove = this.game.validMoves.find(move => 
                move.row === row && move.col === col
            );
            
            if (validMove) {
                const moved = this.game.movePiece(row, col);
                if (moved) {
                    this.updateBoard();
                    this.updateStatus();
                    this.updateMoveHistory();
                    
                    // Check if we need to handle a pawn promotion
                    if (this.game.board[row][col]?.type === 'PAWN' && 
                        (row === 0 || row === 7)) {
                        this.showPromotionDialog(row, col);
                    }
                }
                return;
            }
            
            // If clicking on same piece, deselect
            if (this.game.selectedPiece.row === row && this.game.selectedPiece.col === col) {
                this.game.selectedPiece = null;
                this.game.validMoves = [];
                this.updateBoard();
                return;
            }
        }
        
        // If clicking on a new piece of the current player
        if (piece && piece.color === this.game.currentPlayer) {
            const selected = this.game.selectPiece(row, col);
            if (selected) {
                this.updateBoard();
            }
        }
    }
    
    updateBoard() {
        const squares = this.boardElement.querySelectorAll('.square');
        
        squares.forEach(square => {
            const row = parseInt(square.dataset.row);
            const col = parseInt(square.dataset.col);
            const piece = this.game.getPieceAt(row, col);
            
            // Clear existing classes
            square.classList.remove('selected', 'valid-move', 'capture-move');
            
            // Set the piece symbol
            square.textContent = piece ? this.game.getPieceSymbol(piece) : '';
            
            // Highlight the selected piece
            if (this.game.selectedPiece && 
                this.game.selectedPiece.row === row && 
                this.game.selectedPiece.col === col) {
                square.classList.add('selected');
            }
            
            // Highlight valid moves
            const validMove = this.game.validMoves.find(move => 
                move.row === row && move.col === col
            );
            
            if (validMove) {
                if (validMove.special === 'CAPTURE' || 
                    validMove.special === 'EN_PASSANT') {
                    square.classList.add('capture-move');
                } else {
                    square.classList.add('valid-move');
                }
            }
        });
    }
    
    updateStatus() {
        let statusText = '';
        
        switch(this.game.gameStatus) {
            case 'ACTIVE':
                statusText = `${this.game.currentPlayer}'s turn`;
                break;
            case 'CHECK':
                statusText = `${this.game.currentPlayer} is in CHECK`;
                break;
            case 'CHECKMATE':
                const winner = this.game.currentPlayer === 'WHITE' ? 'BLACK' : 'WHITE';
                statusText = `CHECKMATE! ${winner} wins!`;
                break;
            case 'STALEMATE':
                statusText = 'STALEMATE! The game is a draw.';
                break;
        }
        
        this.statusElement.textContent = statusText;
    }
    
    updateMoveHistory() {
        this.moveHistoryElement.innerHTML = '';
        
        this.game.moveHistory.forEach((move, index) => {
            const moveNumber = Math.floor(index / 2) + 1;
            const isWhite = index % 2 === 0;
            
            const li = document.createElement('li');
            li.className = 'move-history-item';
            
            if (isWhite) {
                li.textContent = `${moveNumber}. ${this.formatMove(move)}`;
            } else {
                // Get the previous li for white's move
                const prevLi = this.moveHistoryElement.lastChild;
                prevLi.textContent += ` ${this.formatMove(move)}`;
                return; // Skip adding a new li
            }
            
            this.moveHistoryElement.appendChild(li);
        });
        
        // Scroll to the bottom
        this.moveHistoryElement.scrollTop = this.moveHistoryElement.scrollHeight;
    }
    
    formatMove(move) {
        const piece = move.piece;
        const from = this.algebraicNotation(move.from.row, move.from.col);
        const to = this.algebraicNotation(move.to.row, move.to.col);
        
        let notation = '';
        
        // Piece letter (except for pawns)
        if (piece.type !== 'PAWN') {
            notation += piece.type[0];
        }
        
        // Add from position if not a pawn
        if (piece.type !== 'PAWN') {
            notation += from;
        }
        
        // Capture symbol
        if (move.captured || move.specialMove?.type === 'EN_PASSANT') {
            if (piece.type === 'PAWN') {
                notation += from[0]; // Add file of the pawn
            }
            notation += 'x';
        }
        
        // Destination
        notation += to;
        
        // Special notation
        if (move.specialMove?.type === 'CASTLING') {
            notation = move.specialMove.side === 'KING_SIDE' ? 'O-O' : 'O-O-O';
        }
        
        // Promotion
        if (move.promotion) {
            notation += '=' + move.promotion[0];
        }
        
        // Check or checkmate
        if (this.game.gameStatus === 'CHECK') {
            notation += '+';
        } else if (this.game.gameStatus === 'CHECKMATE') {
            notation += '#';
        }
        
        return notation;
    }
    
    algebraicNotation(row, col) {
        const files = 'abcdefgh';
        const ranks = '12345678';
        return files[col] + ranks[row];
    }
    
    showPromotionDialog(row, col) {
        this.pendingPromotion = {row, col};
        this.promotionModal.style.display = 'flex';
    }
}

// Initialize the chess UI when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ChessUI();
});
