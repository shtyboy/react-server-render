import React, { Component } from 'react';
import { connect } from 'react-redux';

class Global extends Component {
  constructor (props) {
    super (props);
    this.state = {
    };
  }
  componentDidMount () {
    const pageLimit = 960;
    const pageSize = 720;
    if(document.documentElement.clientWidth<= pageLimit){
      document.documentElement.style.fontSize = 100 * document.documentElement.clientWidth / pageSize + 'px';
    }else{
      document.documentElement.style.fontSize = 100 * pageLimit/ pageSize + 'px';
    }
  }
  render () {
    return (
      <div className='global'>
        {this.props.children}
      </div>
    );
  }
}

const mapStateToProps = ({
  app
}) => ({
  app
});

export default connect(mapStateToProps)(Global);
