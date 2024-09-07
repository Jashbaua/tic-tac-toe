const Game=(function(){

    const Board=(function(){

        let board=[]

        function create(){
            for(let i=0;i<9;i++){
                board.push('-')
            }
        }

        function print(){
            for(let i=0;i<3;i++){
                let row=[]
                for(let j=0;j<3;j++){
                    row.push(board[convert2dTo1d(i,j)])
                }
                console.log(row)
            }
        }

        function convert2dTo1d(x,y){
            return 3*x+y
        }

        function checkWin(){
            //horizontal
            for(let i=0;i<3;i++){
                let start=''
                for(let j=0;j<3;j++){
                    if(board[convert2dTo1d(i,j)]=='-')break
                    if(j==0){
                        start=board[convert2dTo1d(i,j)]
                    }
                    else{
                        if(start!=board[convert2dTo1d(i,j)]){
                            break
                        }
                        else if(j==2)return true
                    }
                }
            }
            //vertical
            for(let i=0;i<3;i++){
                let start=''
                for(let j=0;j<3;j++){
                    if(board[convert2dTo1d(j,i)]=='-')break
                    if(j==0){
                        start=board[convert2dTo1d(j,i)]
                    }
                    else{
                        if(start!=board[convert2dTo1d(j,i)]){
                            break
                        }
                        else if(j==2)return true
                    }
                }
            }
            //backslash
            let start=''
            for(let i=0;i<3;i++){
                if(board[convert2dTo1d(i,i)]=='-')break
                if(i==0){
                    start=board[convert2dTo1d(i,i)]
                }
                else{
                    if(start!=board[convert2dTo1d(i,i)]){
                        break
                    }
                    else if(i==2)return true
                }
            }
            //slash
            start=''
            for(let i=0;i<3;i++){
                if(board[convert2dTo1d(i,2-i)]=='-')break
                if(i==0){
                    start=board[convert2dTo1d(i,2-i)]
                }
                else{
                    if(start!=board[convert2dTo1d(i,2-i)]){
                        break
                    }
                    else if(i==2)return true
                }
            }
            return false
        }

        function updateMove(row,column){
            let index=convert2dTo1d(row,column)
            if(board[index]=='-')board[index]=activePlayer==player1?'o':'x'
        }

        function isFinished(){
            if(board.find(char=>char=='-')){
                return false
            }
            return true
        }

        function isValidMove(row,column){
            return board[convert2dTo1d(row,column)]=='-'
        }

        function reset(){
            board=[]
            for(let i=0;i<9;i++){
                board.push('-')
            }
        }

        function getBoard(){}
        return {create,print,checkWin,updateMove,isFinished,isValidMove,reset,getBoard}
    })()

    let player1
    let player2
    let activePlayer
    let startPlayer

    function start(){
        player1={name:'Player1',score:'0'}
        player2={name:'Player2',score:'0'}
        activePlayer=player1
        startPlayer=player1
        Board.reset()
        printScore()
        Board.print()
    }

    function setPlayer1Name(player1Name){player1.name=player1Name}
    function setPlayer2Name(player2Name){player2.name=player2Name}

    function printScore(){
        console.log(player1.name,' score:',player1.score,' ',player2.name,' score:',player2.score)
    }

    function toggleActivePlayer(){
        activePlayer=activePlayer==player1?player2:player1
    }

    function toggleStartPlayer(){
        startPlayer=startPlayer==player1?player2:player1
    }

    function printTie(){
        console.log("It's a tie!")
    }

    function printWinner(winner){
        console.log(`${winner.name} won!`)
    }

    function playMove(row,column){
        if(!Board.isValidMove(row,column))return
        Board.updateMove(row,column)
        if(Board.isFinished()){
            printTie()
            Board.print
            Board.reset()
            toggleStartPlayer()
            activePlayer=startPlayer
        }
        else if(Board.checkWin()){
            printWinner(activePlayer)
            activePlayer.score++
            Board.print()
            Board.reset()
            toggleStartPlayer()
            activePlayer=startPlayer
        }
        else toggleActivePlayer()
        printScore()
        Board.print()
    }
    function getPlayer1(){return {...player1}}
    function getPlayer2(){return {...player2}}
    return {start,setPlayer1Name,setPlayer2Name,getPlayer1,getPlayer2,playMove,getBoard:Board.getBoard}
})()

const Ui=(function(){

    //DOM cache
    const newGameBtn=document.querySelector('#newGameButton')
    const player1inp=document.querySelector('#player1')
    const player2inp=document.querySelector('#player2')
    const board=document.querySelector('.board')
    const player1name=document.querySelector('#player1name')
    const player2name=document.querySelector('#player2name')
    const player1score=document.querySelector('#player1score')
    const player2score=document.querySelector('#player2score')


    //Binding events
    newGameBtn.addEventListener('click',newGame)
    player1inp.addEventListener('input',updateName)
    player2inp.addEventListener('input',updateName)
    board.addEventListener('click',sendMove)

    function renderGame(){
        let board=Game.getBoard()
        let player1=Game.getPlayer1()
        let player2=Game.getPlayer2()
        player1name.textContent=player1.name
        player2name.textContent=player2.name
        player1score.textContent=player1.score
        player2score.textContent=player2.score
    }

    function newGame(){}

    function updateName(e){
        let value=e.target.value
        if(e.target.id=='player1'){
            Game.setPlayer1Name(value==''?'Player1':value)
        }
        else Game.setPlayer2Name(value==''?'Player2':value)
        renderGame()
    }

    function sendMove(){}

    return{renderGame}

})()

Game.start()