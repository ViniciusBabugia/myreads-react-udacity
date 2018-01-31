import React, {Component} from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types' // Importando o componente de validação dos parâmetros
import escapeRegExp from 'escape-string-regexp' // Importando o componente para escapar strings na busca
import sortBy from 'sort-by' // Importando o componente para ordenar o resultado da busca
import ListBooksInfo from './ListBooksInfo'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            booksSearch: this.props.books
        };
    }

    // PROP-TYPES especifica que tipo de elemento o books tem que receber
    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired
    }
    // FIM PROP-TYPES

    // BUSCA


    // Função que armazena o estado da busca conforme o usuário digita é passado por parâmetrp e atualiza
    updateQuery = (query) => {
        if (query !== "")
            BooksAPI.search(query).then((booksList) => {
                this.setState({booksSearch: booksList})
            }).catch(error => {
                this.setState({booksSearch: []})
            })

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
        this.props.onUpdateBook(book, shelf);
    }
    // FIM ATUALIZAÇÃO ESTANTE LIVRO

    // BOTÃO VOLTAR
    handlerInit = () => {
        window.location.href = '/'
    }
    // FIM BOTÃO VOLTAR

    render () {

        // Após reenderizar, armazenamos os valores do objeto retornados da Api se passarem pela validação do PROP-TYPE
        const {books} = this.state.booksSearch

        let showBooks = this.state.booksSearch

        // Após reenderizar o estado do objeto armazenamos o novo valor da query por meio do this.state
        const {query} = this.state.query;

        // Se foi digitado algo efetuamos a busca
        if (query) {
            const  match = new RegExp(escapeRegExp(query), 'i')
            showBooks = books.filter((book) => match.test([book.title,book.authors]))
        // Se não retorna todos os valores
        }
        // FIM BUSCA

        // ORDENAÇÃO DA LISTAGEM DE RESULTADOS
        showBooks.sort(sortBy('title'))

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link onClick={(event) => this.handlerInit()} className='close-search' to='/'>Voltar</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Pesquise pelo título ou autor"
                               value={query} onChange={(event) => this.updateQuery(event.target.value)} />
                    </div>
                </div>
                {showBooks.length == 0 && (
                    <div>
                        <span>Nenhum livro encontrado para a sua busca! </span>
                    </div>
                )}
                {showBooks.length !== this.props.length &&  (
                    <div>
                        <span>Mostrando {showBooks.length} de {this.props.length} livros </span>
                        <button onClick={this.clearQuery}> Mostrar todos</button>
                    </div>
                )}
                <div className="search-books-results">
                    <ListBooksInfo
                        books={showBooks}
                        onUpdateBookList={(book, shelf) => {
                          this.updateBook(book, shelf)
                        }}
                    />
                </div>
            </div>
        )
    }
}

export default SearchBooks;