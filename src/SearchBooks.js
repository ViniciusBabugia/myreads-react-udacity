import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' // Importando o componente de validação dos parâmetros
import escapeRegExp from 'escape-string-regexp' // Importando o componente para escapar strings na busca
import sortBy from 'sort-by' // Importando o componente para ordenar o resultado da busca

class SearchBooks extends Component {

    // PROP-TYPES especifica que tipo de elemento o books tem que receber
    static propTypes = {
        books: PropTypes.array.isRequired
    }
    // FIM PROP-TYPES

    // BUSCA
    state = {
        query: ''
    }

    // Função que armazena o estado da busca conforme o usuário digita é passado por parâmetrp e atualiza
    updateQuery = (query) => {
        if (this.props.onSearchBook && query !== "")
            this.props.onSearchBook(query);

        this.setState({ query: query })
    }
    // FIM BUSCA

    // MOSTRAR TODOS
    clearQuery = () => {
        // Atualiza o estado do componente e atualiza a IU
        this.setState({ query: '' })
    }
    // FIM MOSTRAR TODOS

    // ATUALIZAÇÃO ESTANTE LIVRO
    updateBook = (book, shelf) => {
        if (this.props.onUpdateBook)
            this.props.onUpdateBook(book, shelf);
    }
    // FIM ATUALIZAÇÃO ESTANTE LIVRO

    render () {

        // Após reenderizar, armazenamos os valores do objeto retornados da Api se passarem pela validação do PROP-TYPE
        const {books} = this.props

        // BUSCA
        let showBooks

        // Após reenderizar o estado do objeto armazenamos o novo valor da query por meio do this.state
        const {query} = this.state;

        // Se foi digitado algo efetuamos a busca
        if (query) {
            const  match = new RegExp(escapeRegExp(query), 'i')
            showBooks = books.filter((book) => match.test([book.title,book.authors]))
        // Se não retorna todos os valores
        } else {
            showBooks = books
        }
        // FIM BUSCA

        // ORDENAÇÃO DA LISTAGEM DE RESULTADOS
        showBooks.sort(sortBy('title'))

        //console.log(showBooks);

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className='close-search' to='/'>Voltar</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Pesquise pelo título ou autor"
                               value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                <div className="search-books-results">
                    {showBooks.length == 0 && (
                        <div>
                            <span>Nenhum livro encontrado para a sua busca! </span>
                        </div>
                    )}
                    {showBooks.length !== books.length &&  (
                        <div>
                            <span>Mostrando {showBooks.length} de {books.length} livros </span>
                            <button onClick={this.clearQuery}> Mostrar todos</button>
                        </div>
                    )}
                    <ol className="books-grid">
                        {showBooks.map((book) => (
                            <li key={book.id} >
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks.thumbnail !== '' ? book.imageLinks.thumbnail : ' ')})` }} />
                                        <div className="book-shelf-changer">
                                            <select onChange={(event) => this.updateBook(book, event.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="none">None</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
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
        )
    }
}

export default SearchBooks;