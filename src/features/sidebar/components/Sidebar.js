import React, { Component } from 'react'
import ReactSidebar from 'react-sidebar'

class Sidebar extends Component {

  constructor() {
    super()
    this.state = {
      isOpen: true
    }
  }

  renderContent = () => {
    return (
      <ul>
        <li>Tournaments</li>
        <li>My Tickets</li>
      </ul>
    )
  }

  onSetSidebarOpen = (open) => {
    this.setState({ isOpen: open })
  }


  render() {
    const { isOpen } = this.state
    return (
      <ReactSidebar 
        sidebar={ this.renderContent() }
        open={ this.state.isOpen }
        onSetOpen={ this.onSetSidebarOpen }
      >
      </ReactSidebar>
    )
  }
}

export default Sidebar
