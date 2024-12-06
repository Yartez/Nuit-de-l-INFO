function launchTetris() {
    const canvas = document.createElement('canvas');
    canvas.id = "tetrisCanvas";
    canvas.width = 300; // Largeur du canvas
    canvas.height = 600; // Hauteur du canvas
    canvas.style.border = "1px solid black";
    canvas.style.backgroundColor = "#ffffff"; // Fond blanc
    document.body.appendChild(canvas);

    const nextCanvas = document.createElement('canvas');
    nextCanvas.id = "nextPieceCanvas";
    nextCanvas.width = 120; // Largeur pour la prochaine pièce
    nextCanvas.height = 120; // Hauteur pour la prochaine pièce
    nextCanvas.style.border = "1px solid black";
    nextCanvas.style.marginLeft = "10px";
    nextCanvas.style.backgroundColor = "#ffffff"; // Fond blanc
    document.body.appendChild(nextCanvas);

    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = "scoreDisplay";
    scoreDisplay.style.fontFamily = "Arial, sans-serif";
    scoreDisplay.style.marginTop = "10px";
    scoreDisplay.style.fontSize = "18px";
    scoreDisplay.innerHTML = "Score : 0";
    document.body.appendChild(scoreDisplay);

    const ctx = canvas.getContext("2d");
    const nextCtx = nextCanvas.getContext("2d");

    // Dimensions de la grille Tetris
    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30;

    const COLORS = ["#2d2e87", "#9bc41b"];

    let grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    let score = 0;

    const TETROMINOS = [
        [[1, 1, 1], [0, 1, 0]], // T
        [[1, 1], [1, 1]],       // O
        [[1, 1, 1, 1]],         // I
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 1, 0], [0, 1, 1]], // Z
        [[1, 1, 1], [1, 0, 0]], // L
        [[1, 1, 1], [0, 0, 1]]  // J
    ];

    function createPiece() {
        const type = Math.floor(Math.random() * TETROMINOS.length);
        return {
            shape: TETROMINOS[type],
            x: Math.floor(COLS / 2) - Math.ceil(TETROMINOS[type][0].length / 2),
            y: 0,
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    function rotatePiece(piece) {
        const rotatedShape = piece.shape[0].map((_, colIndex) =>
            piece.shape.map(row => row[colIndex]).reverse()
        );
        const clone = { ...piece, shape: rotatedShape };
        return isValidMove(clone, 0, 0) ? rotatedShape : piece.shape;
    }

    let currentPiece = createPiece();
    let nextPiece = createPiece();

    function drawPiece(piece, ctxToUse, offsetX = 0, offsetY = 0, blockSize = BLOCK_SIZE) {
        piece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctxToUse.fillStyle = piece.color;
                    ctxToUse.fillRect(
                        (piece.x + x + offsetX) * blockSize,
                        (piece.y + y + offsetY) * blockSize,
                        blockSize,
                        blockSize
                    );
                    ctxToUse.strokeStyle = "#000";
                    ctxToUse.strokeRect(
                        (piece.x + x + offsetX) * blockSize,
                        (piece.y + y + offsetY) * blockSize,
                        blockSize,
                        blockSize
                    );
                }
            });
        });
    }

    function drawGhostPiece() {
        const ghostPiece = { ...currentPiece };
        while (isValidMove(ghostPiece, 0, 1)) {
            ghostPiece.y++;
        }
        ghostPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    ctx.fillStyle = "rgba(128, 128, 128, 0.4)"; // Gris clair avec transparence
                    ctx.fillRect(
                        (ghostPiece.x + x) * BLOCK_SIZE,
                        (ghostPiece.y + y) * BLOCK_SIZE,
                        BLOCK_SIZE,
                        BLOCK_SIZE
                    );
                }
            });
        });
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "#ccc";
        for (let x = 0; x < COLS; x++) {
            for (let y = 0; y < ROWS; y++) {
                ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
            }
        }
        grid.forEach((row, y) => {
            row.forEach((color, x) => {
                if (color) {
                    ctx.fillStyle = color;
                    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                    ctx.strokeStyle = "#000";
                    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                }
            });
        });
    }

    function drawNextPiece() {
        nextCtx.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
        drawPiece(nextPiece, nextCtx, 0.5, 0.5, 20); // Ajusté pour le centrage
    }

    function isValidMove(piece, dx, dy) {
        return piece.shape.every((row, y) =>
            row.every((value, x) => {
                if (!value) return true;
                const newX = piece.x + x + dx;
                const newY = piece.y + y + dy;
                return (
                    newX >= 0 &&
                    newX < COLS &&
                    newY < ROWS &&
                    (!grid[newY] || !grid[newY][newX])
                );
            })
        );
    }

    function dropPiece() {
        while (isValidMove(currentPiece, 0, 1)) {
            currentPiece.y++;
        }
        lockPiece();
        clearLines();
        spawnNewPiece();
    }

    function lockPiece() {
        currentPiece.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    grid[currentPiece.y + y][currentPiece.x + x] = currentPiece.color;
                }
            });
        });
    }

    function clearLines() {
        const fullRows = grid.filter(row => row.every(cell => cell));
        grid = grid.filter(row => !row.every(cell => cell));
        while (grid.length < ROWS) {
            grid.unshift(Array(COLS).fill(null));
        }
        // Mise à jour du score
        const points = [0, 3, 9, 27, 81];
        score += points[fullRows.length];
        scoreDisplay.innerHTML = "Score : " + score;
    }

    function spawnNewPiece() {
        currentPiece = nextPiece;
        nextPiece = createPiece();
        if (!isValidMove(currentPiece, 0, 0)) {
            alert("Game Over!");
            grid = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
            score = 0;
        }
    }

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowLeft":
                if (isValidMove(currentPiece, -1, 0)) currentPiece.x--;
                break;
            case "ArrowRight":
                if (isValidMove(currentPiece, 1, 0)) currentPiece.x++;
                break;
            case "ArrowDown":
                dropPiece();
                break;
            case "ArrowUp":
                currentPiece.shape = rotatePiece(currentPiece);
                break;
        }
    });

    function gameLoop() {
        drawGrid();
        drawGhostPiece();
        drawPiece(currentPiece, ctx);
        drawNextPiece();
        if (isValidMove(currentPiece, 0, 1)) {
            currentPiece.y++;
        } else {
            lockPiece();
            clearLines();
            spawnNewPiece();
        }
        setTimeout(gameLoop, 500);
    }

    gameLoop();
}

launchTetris();