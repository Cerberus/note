import React from 'react'
import 'bulma/css/bulma.css'
import NavBar from './NavBar'
import NoteList from './NoteList'
import CreateNote from './CreateNote'

const App = () => (
  <NavBar>
    <NoteList />
    <CreateNote />
  </NavBar>
)

export default App
