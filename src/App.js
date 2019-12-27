import React, { Component } from 'react';
import './App.css';
import { sampleText } from './sampleText'
import marked from 'marked'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      text: sampleText
    }
  }

  componentDidMount () {
    const text = localStorage.getItem('text')
  
    if (text) {
      this.setState({ text })
    } else {
      this.setState({ text: sampleText})
    }
  }

  componentDidUpdate () {
    localStorage.setItem('text', this.state.text)
  }

  handleChange = event => {
    const text = event.target.value
    this.setState({ text })
  }

  renderMarkdown = content => {
    const __html = marked(content, {sanitize:true})
    return { __html }
  }

  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea 
            className="form-control" 
            rows="35" 
            value={this.state.text}
            onChange={this.handleChange}
            />
          </div>
          <div className="col-sm-6">
            <div dangerouslySetInnerHTML={this.renderMarkdown(this.state.text)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
