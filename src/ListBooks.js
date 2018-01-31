import React, {Component} from 'react';
import PropTypes from 'prop-types' // Importando o componente de validação de parâmetros
import { Link } from 'react-router-dom' // Importando o componente responsável por linkar os elementos
import escapeRegExp from 'escape-string-regexp' // Importando o componente para escapar strings na busca
import sortBy from 'sort-by' // Importando o componente para ordenar o resultado da busca
import ListBooksInfo from './ListBooksInfo' // Importando o componente de listagem dos livros

class ListBooks extends Component {

    // PROP-TYPES especifica que tipo de elemento o books tem que receber
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    // FIM PROP-TYPES

    // ATUALIZAÇÃO ESTANTE LIVRO
    updateBook = (book, shelf) => {
        if (this.props.onUpdateBook)
            this.props.onUpdateBook(book, shelf);
    }
    // FIM ATUALIZAÇÃO ESTANTE LIVRO

    render() {

        const {books} = this.props

        // Utilizado para percorrer cada categoria e listar suas informações
        const bookShelves = [
            {
                id: "currentlyReading",
                name: "Currently Reading",
            },
            {
                id: "read",
                name: "Read",
            },
            {
                id: "wantToRead",
                name: "Want to Read",
            }
        ]

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            {bookShelves.map(shelf => (
                                <div key={shelf.id}>
                                    <h2 className="bookshelf-title">{shelf.name}</h2>
                                    <ListBooksInfo
                                        books={books.filter(book => book.shelf === shelf.id)}
                                        onUpdateBookList={(book, shelf) => { // Responsável por atualizar o livro
                                          this.updateBook(book, shelf)
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Buscar</Link>
                </div>
            </div>
        )
    }
}

export default ListBooks
