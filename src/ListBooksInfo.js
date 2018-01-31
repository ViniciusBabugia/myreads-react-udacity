import React, {Component} from 'react';
import PropTypes from 'prop-types' // Importando o componente de validação de parâmetros
import { Link } from 'react-router-dom' // Importando o componente responsável por linkar os elementos
import escapeRegExp from 'escape-string-regexp' // Importando o componente para escapar strings na busca
import sortBy from 'sort-by' // Importando o componente para ordenar o resultado da busca

class ListBooksInfo extends Component {

    // PROP-TYPES especifica que tipo de elemento o books tem que receber
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBookList: PropTypes.func.isRequired
    }
    // FIM PROP-TYPES

    // ATUALIZAÇÃO ESTANTE LIVRO
    updateBookList = (book, shelf) => {
        this.props.onUpdateBookList(book, shelf);
    }
    // FIM ATUALIZAÇÃO ESTANTE LIVRO

    render() {

        const {books} = this.props

        return (
            <ol className="books-grid">
                {books.length == 0 && (
                    <span>Prateleira vazia</span>
                )}
                {books.map((book) => (
                    <li key={book.id}>
                        <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks.thumbnail !== "" ? book.imageLinks.thumbnail : '')})` }} />
                                <div className="book-shelf-changer">
                                    <select onChange={(event) => this.updateBookList(book, event.target.value)}>
                                        <option value="none">Selecione</option>
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
        )

    }
}

export default ListBooksInfo
