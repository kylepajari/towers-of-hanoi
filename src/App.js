import React, { Component } from "react";
import "./App.css";
import $ from "jquery";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStack1: [4, 3, 2, 1],
      dataStack2: [],
      dataStack3: [],
      gameOver: false,
      pieceMoving: 0,
      difficulty: 4 //easy
    };
    this.move = this.move.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.removeBlock = this.removeBlock.bind(this);
  }

  changeDifficulty = selection => {
    //clear game
    this.resetGame();

    if (selection === 4) {
      this.setState({ difficulty: 4 });
      this.setState({ dataStack1: [4, 3, 2, 1] });
    } else if (selection === 5) {
      this.setState({ difficulty: 5 });
      this.setState({ dataStack1: [5, 4, 3, 2, 1] });
    } else if (selection === 6) {
      this.setState({ difficulty: 6 });
      this.setState({ dataStack1: [6, 5, 4, 3, 2, 1] });
    }
  };

  //MOVE FUNCTION
  ///////////////////////////////////////////////////////////////////////////
  move = stackNum => {
    if (!this.state.gameOver) {
      if (this.state.pieceMoving !== 0) {
        this.addBlock(stackNum);
      } else {
        this.removeBlock(stackNum);
      }
    }
  };

  //ADD BLOCK FUNCTION
  ///////////////////////////////////////////////////////////////////////////
  addBlock(stackNum) {
    console.log("running addBlock");
    console.log("stackNum: " + stackNum);
    console.log("pieceMoving: " + this.state.pieceMoving);
    let stack = null;
    switch (stackNum) {
      case 1:
        stack = this.state.dataStack1;
        break;
      case 2:
        stack = this.state.dataStack2;
        break;
      case 3:
        stack = this.state.dataStack3;
        break;
      default:
    }

    //add pieceMoved to clicked stack, if allowed
    let endPiece = parseInt(stack.slice(stack.length - 1).join(""));
    if (stack.length !== 0 && endPiece > this.state.pieceMoving) {
      console.log("last piece smaller, allowing move");
      this.setState({ stack: stack.push(this.state.pieceMoving) });
    } else if (stack.length === 0) {
      console.log("adding to empty column");
      this.setState({ stack: stack.push(this.state.pieceMoving) });
    } else {
      console.log("piece too large, denying move");
      return false;
    }

    //clear pieceMoving
    this.setState({ pieceMoving: 0 });

    if (this.checkWin()) {
      $("#announce-winner").text("You Win!");
      //display message that player wins
    }
  }

  //REMOVE BLOCK FUNCTION
  ///////////////////////////////////////////////////////////////////////////
  removeBlock(stackNum) {
    console.log("running removeBlock");
    console.log("stackNum: " + stackNum);
    let stack = null;
    switch (stackNum) {
      case 1:
        stack = this.state.dataStack1;
        break;
      case 2:
        stack = this.state.dataStack2;
        break;
      case 3:
        stack = this.state.dataStack3;
        break;
      default:
    }

    if (stack.length === 0) {
      console.log("Cannot remove from empty stack!");
      return false;
    }
    var lastNum = parseInt(stack.slice(stack.length - 1).join(""));
    console.log("lastNum: " + lastNum);
    this.setState({ pieceMoving: lastNum });
    var filteredBlocks = stack.filter(function(num) {
      return num !== lastNum;
    });
    console.log(filteredBlocks);
    if (stackNum === 1) {
      this.setState({
        dataStack1: filteredBlocks
      });
    } else if (stackNum === 2) {
      this.setState({
        dataStack2: filteredBlocks
      });
    } else if (stackNum === 3) {
      this.setState({
        dataStack3: filteredBlocks
      });
    }
  }

  //CHECK WIN FUNCTION
  ///////////////////////////////////////////////////////////////////////////
  checkWin() {
    console.log("running checkWin");

    let win = false;
    if (this.state.dataStack3.length === this.state.difficulty) {
      win = true;
      this.setState({ gameOver: true });
    }
    return win;
  }

  //RESET GAME FUNCTION
  ///////////////////////////////////////////////////////////////////////////
  resetGame = () => {
    //When reset button is clicked, reset stacks/variables to defaults
    if (this.state.difficulty === 4) {
      this.setState({ dataStack1: [4, 3, 2, 1] });
    }
    if (this.state.difficulty === 5) {
      this.setState({ dataStack1: [5, 4, 3, 2, 1] });
    }
    if (this.state.difficulty === 6) {
      this.setState({ dataStack1: [6, 5, 4, 3, 2, 1] });
    }

    this.setState({ dataStack2: [] });
    this.setState({ dataStack3: [] });
    this.setState({ pieceMoving: 0 });
    this.setState({ gameOver: false });
    $("#announce-winner").text("");
  };

  render() {
    return (
      <div className="App">
        <p>Towers of Hanoi</p>
        <span>Choose a difficulty:</span>
        <input
          type="radio"
          name="difficulty"
          value="Easy"
          onChange={() => {
            this.changeDifficulty(4);
          }}
        />
        Easy
        <input
          type="radio"
          name="difficulty"
          value="Medium"
          onChange={() => {
            this.changeDifficulty(5);
          }}
        />
        Medium
        <input
          type="radio"
          name="difficulty"
          value="Hard"
          onChange={() => {
            this.changeDifficulty(6);
          }}
        />
        Hard
        <div>
          <div
            data-stack="1"
            onClick={() => {
              this.move(1);
            }}
          >
            {this.state.dataStack1.map(num => {
              return <div data-block={num * 25} />;
            })}
          </div>
          <div
            data-stack="2"
            onClick={() => {
              this.move(2);
            }}
          >
            {this.state.dataStack2.map(num => {
              return <div data-block={num * 25} />;
            })}
          </div>
          <div
            data-stack="3"
            onClick={() => {
              this.move(3);
            }}
          >
            {this.state.dataStack3.map(num => {
              return <div data-block={num * 25} />;
            })}
          </div>
        </div>
        <div id="announce-game-won" />
        <div id="reset" onClick={this.resetGame}>
          Reset
        </div>
        <div id="announce-winner" />
        <script
          type="text/javascript"
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"
        />
        <script src="https://code.jquery.com/jquery-1.12.4.js" />
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" />
      </div>
    );
  }
}

export default App;
