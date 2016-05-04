import React, { Component, PropTypes } from 'react'
import HtmlTerminalElement from './HtmlTerminalElement'
import HtmlStartTag  from './HtmlStartTag'
import HtmlEndTag    from './HtmlEndTag'
import HtmlIndent    from './HtmlIndent'

export default class HtmlParentElement extends React.Component {
  render() {
    if (this.props.element.children.length === 0) {
      return (
        <HtmlTerminalElement
          element  ={this.props.element}
          highlight={this.props.highlight}
        />
      )
    }
    else {
      return (
        <div>
          <HtmlStartTag tagName={this.props.element.localName} attributes={this.props.element.attributes} />
          {this.childrenElements()}
          <HtmlEndTag   tagName={this.props.element.localName} />
        </div>
      )
    }
  }
  
  childrenElements(){
    //html element's children is not an array, so children.map() method is not available
    let htmlElements = [];
    for(let i = 0; i < this.props.element.children.length; i++ ) {
      let element = this.props.element.children[i];
      htmlElements.push(
        <div key={i} className="html-block">
          <HtmlIndent />
          <HtmlParentElement element={element} highlight={this.props.highlight} />
        </div>
      );
    }
    
    return htmlElements;    
  }

  className() {
    if(this.props.highlight)
      return "html-node html-highlight"
    else
      return "html-node"
  }
};
HtmlTerminalElement.propTypes = {
  element  : PropTypes.object.isRequired, //data model of the component
  highlight: PropTypes.bool               //whether to highlight this component
};
HtmlParentElement.defaultProps = {
  highlight: false,
};
