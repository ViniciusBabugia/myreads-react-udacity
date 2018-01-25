import React, {Component} from 'react';
import PropTypes from 'prop-types' // Importando o componente de validação de parâmetros
import { Link } from 'react-router-dom' // Importando o componente responsável por linkar os elementos
import escapeRegExp from 'escape-string-regexp' // Importando o componente para escapar strings na busca
import sortBy from 'sort-by' // Importando o componente para ordenar o resultado da busca

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

        let showBooksRead
        let showBooksWant
        let showBookReading
        showBooksRead = books.filter(function(b) { return b.shelf == 'read'; });
        showBooksWant = books.filter(function(b) { return b.shelf == 'wantToRead'; });
        showBookReading = books.filter(function(b) { return b.shelf == 'currentlyReading'; });

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                {showBookReading.length == 0 && (
                                    <span>Prateleira vazia</span>
                                )}
                                <ol className="books-grid">
                                    {showBookReading.map((book) => (
                                        <li key={book.id} >
                                            <div className="book">
                                            <div className="book-top">
                                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(event) => this.updateBook(book, event.target.value)}>
                                                        <option value="none" disabled>Move to...</option>
                                                        <option value="currentlyReading">Currently Reading</option>
                                                        <option value="wantToRead">Want to Read</option>
                                                        <option value="read">Read</option>
                                                        <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                {showBooksWant.length == 0 && (
                                    <span>Prateleira vazia</span>
                                )}
                                <ol className="books-grid">
                                    {showBooksWant.map((book) => (
                                        <li key={book.id} >
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(event) => this.updateBook(book, event.target.value)}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="read">Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                {showBooksRead.length == 0 && (
                                    <span>Prateleira vazia</span>
                                )}
                                <ol className="books-grid">
                                    {showBooksRead.map((book) => (
                                        <li key={book.id} >
                                            <div className="book">
                                                <div className="book-top">
                                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }} />
                                                    <div className="book-shelf-changer">
                                                        <select onChange={(event) => this.updateBook(book, event.target.value)}>
                                                            <option value="none" disabled>Move to...</option>
                                                            <option value="read">Read</option>
                                                            <option value="currentlyReading">Currently Reading</option>
                                                            <option value="wantToRead">Want to Read</option>
                                                            <option value="none">None</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="book-title">{book.title}</div>
                                                <div className="book-authors">{book.authors}</div>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </div>
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
