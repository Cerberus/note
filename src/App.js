import 'bulma/css/bulma.css'

import React from 'react'

import CreateNote from 'CreateNote'
import NoteList from 'NoteList'

import NavBar from './NavBar'

const App = () => (
  <NavBar>
    <NoteList />
    <CreateNote />
  </NavBar>
)

export default App
