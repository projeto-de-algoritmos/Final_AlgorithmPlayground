
import _ from 'lodash';
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
      value: 5
    };
    this.solutionTower(this.state.value, "a", "c", "b");
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  startTopDiscDrag(activeTower) {
    this.activeTower = activeTower;
  }

  dropDisc(destTower) {
    const sourceTower = this.activeTower;
    this.activeTower = null;
    if (sourceTower === destTower || sourceTower === null) return;

    this.setState((state) => {
      if (!state.discs[sourceTower]) return state;
      const disc = state.discs[sourceTower][0];
      if (state.discs[destTower][0] < disc) return state;

      let discs = [...state.discs];
      discs[sourceTower] = _.tail(discs[sourceTower]);
      discs[destTower] = [disc, ...state.discs[destTower]];
      return { discs };
    });
  }

  async execute() {
    var nextMove;
    while ((nextMove = this.state.moves.pop())) {
      await this.sleep(500);
      var disk = this.state.towers[nextMove[0]].shift();
      this.state.towers[nextMove[1]].unshift(disk);
      this.setState({ towers: this.state.towers });
    }
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
    if (event.target.value < 10)
      this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let discs = [];
    for (let i = 0; i < this.state.value; i++) {
      discs.push(i + 1);
    }
    console.log(discs.length, discs)
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
            startTopDiscDrag={() => this.startTopDiscDrag(i)}
            dropDisc={() => this.dropDisc(i)}
          />
        ))}
        <form onSubmit={this.handleSubmit} style={{marginTop: 40}}>
          <label>
            Número de discos:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Enviar" />
        </form>
      </div>
    );
  }
}

export default Towers;