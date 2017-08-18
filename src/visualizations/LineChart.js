import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Note from 'notes/Note';
import ShowNote from 'notes/ShowNote';

import Comment from 'comments/Comment';

import { fetchPost, fetchGet } from 'utils/fetch';

import * as d3 from 'd3';


const style = {
  bar: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  base: {
    border: '1px solid black',
    position: 'absolute',
    left: 0,
  },
  labelX: {
    position: 'absolute',
  },
  labelY: {
    position: 'absolute',
  },
  absolute: {
    position: 'absolute',
  },
  fixed: {
    position: 'absolute',
  }
};

export default class LineChart extends Component {
  constructor(props) {
    super(props);
    this.state = { notes: []};
  }
  componentDidMount() {
    fetchGet(`/getnotes/${this.props.visualization._id}`)
      .then(response => this.setState({notes: response.notes}));
  }

  onMouseOver = (event) => {
    const { offsetY, offsetX } = event.nativeEvent;
    if (!this.state.note) {
      this.setState({ addComment: true, top: offsetY, left: offsetX });
    } 
  };

  onMouseOut = (event) => {
    this.setState({ addComment: false });
  }

  onClick = (event) => {
    this.setState({ note: true, addComment: false });
  }

  onNoteSubmit = (text) => {
    this.state.notes.push({
      text,
      visualization: this.props.visualization._id,
      user: this.props.user._id,
      top: this.state.top,
      left: this.state.left,
    });
    this.setState({
      note: false
    });

    fetchPost('addnotes', this.state.notes).then(response => console.log(response));
  };

  onNoteCancel = (event) => {
    this.setState({ note: false });
  };

  seperateX = (d) => d.map(item => {
    const num = !isNaN(item.x) ? parseInt(item.x) : item.x;
    return new Date(num).valueOf();
  });
  
  seperateY = (d) => d.map(item => {
     const num = !isNaN(item.y) ? parseInt(item.y) : item.y;
    return new Date(num).valueOf();
  });

  scale = (rangeX, rangeY, data) => d3.scaleLinear()
    .domain([d3.min(data), d3.max(data)])
    .range([rangeX, rangeY]);

  scaleX = this.scale(0, this.props.rangeX, this.seperateX(this.props.data))
  scaleY = this.scale(0, this.props.rangeY, this.seperateY(this.props.data))

  // renderBars = () => {
  //   const { data, rangeX, rangeY } = this.props;
  //   return data.map(d =>
  //                   <svg xmlns="http://www.w3.org/2000/svg"
  //                   key={`bar${d.x + d.y}`}
  //                   style={Object.assign({}, style.bar, {
  //                     left: this.scaleX(d.x),
  //                     top: rangeY - this.scaleY(d.y) })}
  //                   >
  //                   <circle cx="5" cy="5" r="5"/>
  //                   </svg>
  //   )};

  addComments = () => {
    if(!this.state.notes) {
      return undefined;
    }
    return this.state.notes.map((note, index) =>
                                <ShowNote
                                key={`notes${index}`}
                                text={note.text}
                                top={note.top}
                                left={note.left}
                                />);
  };

  linePoints = (dataX, dataY) => {
    const { rangeX, rangeY } = this.props;
    const output = dataX.map((item, index) => [this.scaleX(dataX[index]), rangeY - this.scaleY(dataY[index])]);
    const { isLoggedIn } = this.props;
    return (
      <svg width={rangeX} height={rangeY} xmlns="http://www.w3.org/2000/svg">
        <polyline
          onMouseOver={isLoggedIn ? this.onMouseOver : undefined}
          onMouseOut={isLoggedIn ? this.onMouseOut: undefined}
          onClick={isLoggedIn ? this.onClick: undefined}
          fill="none"
          stroke="black" strokeWidth={4}
          points={output.join(' ')}/>
      </svg>
    );
  }

  renderBase = (xMin, xMax, yMin, yMax) => {
    const { data, rangeX, rangeY } = this.props;
    const xBase = Object.assign({}, style.base, { width: rangeX, top: rangeY });
    const yBase = Object.assign({}, style.base, { height: rangeY, left: rangeX });

    const xPoints = [];
    const yPoints = [];
    const xDistance = (xMax - xMin) / data.length;
    const yDistance = (yMax - yMin) / data.length;

    for(let i=0; i < data.length; i++) {
      xPoints.push(xMin + (xDistance * i));
      yPoints.push(yMin + (yDistance * i));
    }

    return (
      <div style={style.absolute}>
        <div style={xBase}>
          {
            xPoints.map((item, index) =>
                     <span key={`X${index}`}
                             style={Object.assign({}, style.labelX, { left: this.scaleX(item)})}>
                         {data[index].x}
                     </span>)
          }
        </div>
        <div style={yBase}>
          {
            yPoints.map((item, index) =>
                     <span key={`Y${index}`}
                     style={Object.assign({},
                                          style.labelY,
                                          { top: rangeY - this.scaleY(item)})}>
                         {data[index].y }
                     </span>)
          }

      </div>
      </div>
    );
  }

  showAddComment = () => {
    const { top, left } = this.state;
    const style1 = Object.assign({}, style.fixed, { top: top - 15,
                                                    left: left - 15 });

    if (this.state.addComment) {
      return <span  className="glyphicon glyphicon-plus" style={style1} />;
    }

    if(this.state.note) {
      return (
        <Note
          style={style1}
          onSubmit={this.onNoteSubmit}
          onCancel={this.onNoteCancel}
        />);
    }
      return undefined;
  };

  render() {
    const { data, rangeX, rangeY } = this.props;
    const xPoint = this.seperateX(data);
    const yPoint = this.seperateY(data);
    
    const xMin = d3.min(xPoint);
    const xMax = d3.max(xPoint);

    const yMin = d3.min(yPoint);
    const yMax = d3.max(yPoint);
    let name = "";
    if (this.props.visualization) {
      name = this.props.visualization.name;
    }

    return (
      <div style={{position: "relative"}}>
        <h1> {name}</h1>
        <div style={{position: 'relative'}}>
          {this.addComments()}
        </div>
        <div>
          {this.showAddComment()}
        </div>
        <div>
          {this.renderBase(xMin, xMax, yMin, yMax)}
        </div>
        <div className="chart" style={style.absolute}>
        </div>
        <div>
          {this.linePoints(xPoint, yPoint)}
        </div>
        <br />
        <br />
        {this.props.isLoggedIn ?
        <Comment {...this.props} /> : undefined}
      </div>
    );
  }
}

LineChart.propTypes = {
  data: PropTypes.array,
  rangeX: PropTypes.number,
  rangeY: PropTypes.number,
  visualization: PropTypes.object,
};

LineChart.defaultProps = {
  rangeX: 800,
  rangeY: 600,
  data: [
  {
    "x": "2014-12-30",
    "y": 17.7
  },
  {
    "x": "2014-12-29",
    "y": 18.65
  },
  {
    "x": "2014-12-26",
    "y": 17.9
  },
  {
    "x": "2014-12-24",
    "y": 17
  },
  {
    "x": "2014-12-23",
    "y": 16.3
  },
  {
    "x": "2014-12-22",
    "y": 16.7
  },
  {
    "x": "2014-12-19",
    "y": 17.15
  },
  {
    "x": "2014-12-18",
    "y": 16.35
  },
  {
    "x": "2014-12-17",
    "y": 15.6
  },
  {
    "x": "2014-12-16",
    "y": 16.2
  }
]
};
