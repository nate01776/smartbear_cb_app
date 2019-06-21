import React from 'react'

const Header = props => (
  <header className="header" style={{marginBottom: 10}}>
    <div>
      <span > {props.title} </span>
    </div>

    <div className="subheader-body">
      <span className="subheader"> For Internal Use At SmartBear </span>
    </div>
  </header>
)

export default Header
