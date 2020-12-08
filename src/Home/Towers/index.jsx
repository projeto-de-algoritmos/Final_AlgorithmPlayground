import React from 'react';
import './style.css';
import Tower from '../Tower';

class Towers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      towers: {
        a: [1, 2, 3, 4, 5],
        b: [],
        c: []
      },
      moves: [],
      value: 5,
      canChange: false
    };
    this.solutionTower(this.state.value, "a", "c", "b");
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async execute() {
    this.setState({ canChange: false });
    var nextMove;
    while ((nextMove = this.state.moves.pop())) {
      await this.sleep(500);
      var disk = this.state.towers[nextMove[0]].shift();
      this.state.towers[nextMove[1]].unshift(disk);
      this.setState({ towers: this.state.towers });
    }
    this.setState({ canChange: true });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  solutionTower(n, from, to, aux) {
    if (n === 1) {
      this.state.moves.unshift([from, to]);
      return;
    } else {
      this.solutionTower(n - 1, from, aux, to);
      this.solutionTower(1, from, to, aux);
      this.solutionTower(n - 1, aux, to, from);
    }
  }

  handleChange(event) {
    if (event.target.value < 10) {
      this.setState({
        value: event.target.value,
      });
    }
    else {
      alert("Please insert at most 9 discs :)");
    }
  }

  handleSubmit(event) {
    let discs = [];
    for (let i = 0; i < this.state.value; i++) {
      discs.push(i + 1);
    }
    this.setState({
      towers: {
        a: discs,
        b: [],
        c: []
      },
      value: discs.length
    })
    this.solutionTower(discs.length, "a", "c", "b");
    event.preventDefault();
  }

  render() {
    return (
      <div className='towers-container'>
        <button
          style={{
            position: 'absolute',
            left: 160,
            top: 150
          }}
          type="button"
          className="btn btn-primary"
          onClick={() => this.execute()}>
          Start!
          </button>
        {Object.keys(this.state.towers).map((tower, i) => (
          <Tower
            key={tower}
            towerDiscs={this.state.towers[tower]}
            maxSize={this.props.discsNumber}
          />
        ))}
        {
          this.state.canChange &&
          <form onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
            <label>
              Number of discs:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Ok" />
          </form>
        }
      </div>
    );
  }
}

export default Towers;