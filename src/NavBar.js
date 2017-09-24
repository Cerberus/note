import React from 'react'
import PropTypes from 'prop-types'

const NavBar = ({ children }) => (
  <div>
    <nav className="nav has-shadow" id="top">
      <div className="container">
        <div className="nav-left">
          <div style={{ marginTop: '5px' }}>
            <h2 className="title is-2 has-text-primary">Note app</h2>
          </div>
        </div>
        <span className="nav-toggle">
          <span />
          <span />
          <span />
        </span>
        <div className="nav-right nav-menu">
          <a className="nav-item is-tab is-active"> Home </a>
          <span className="nav-item">
            <a
              href="https://github.com/Cerberus/note"
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              GitHub
            </a>
          </span>
        </div>
      </div>
    </nav>
    <section className="section">
      <div className="container content">{children}</div>
    </section>
  </div>
)

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
}

export default NavBar
