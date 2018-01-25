import React from 'react'
import { Route } from 'react-router-dom' // Importando componente que identifica qual componente chamar
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {

  state = {
    books: []
  }

  // Listagem de todos os livros da API
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  // Atualiza o status dos livros
  updateBook(book, shelf) {
    // Se o estado de leitura for diferente do atual, atualiza
    if (book.shelf != shelf) {
      // Atualizando o estado de leitura do livro
      book.shelf = shelf
      BooksAPI.update(book, shelf).then(rbook => {
        // Atualizando estado, remove o atual pelo filter e adiciona um novo pelo concat
        this.setState((state) => ({
          books: state.books.filter((b) => (b.id !== book.id)).concat([book])
        }))
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books} // Responsável por listar os livros
            onUpdateBook={(book, shelf) => { // Responsável por atualizar os livros
              this.updateBook(book, shelf)
            }} />
        )} />
        <Route path="/search" render ={() => (
          <SearchBooks
            books={this.state.books} // Responsável por listar os livros
            onUpdateBook={(book, shelf) => { // Responsável por atualizar o livro
              this.updateBook(book, shelf)
            }} />
        )} />
      </div>
    )
  }

}

export default BooksApp
