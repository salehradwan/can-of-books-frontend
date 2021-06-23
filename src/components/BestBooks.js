import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';

class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serverUrl: process.env.REACT_APP_PORT,
            email: this.props.auth0.user.email,
            booksData: [],
            bookName: '',
            description: '',
            status: '',
            showUpdateForm: false,
            bookNameUpdate: '',
            descriptionUpdate: '',
            statusUpdate: '',
            bookIndex: 0
        }
    }

    updateBookName = (bookName) => this.setState({ bookName });
    updateBookDescription = (description) => this.setState({ description });
    updateBookStatus = (status) => this.setState({ status });

    updateBookNameUpdate = (bookName) => this.setState({ bookNameUpdate: bookName });
    updatedescriptionUpdate = (description) => this.setState({ descriptionUpdate: description });
    updatestatusUpdate = (status) => this.setState({ statusUpdate: status });
    showUpdateForm = (booksObj, idx) => this.setState({
        showUpdateForm: !this.state.showUpdateForm,
        bookNameUpdate: booksObj.name,
        descriptionUpdate: booksObj.description,
        statusUpdate: booksObj.status,
        bookIndex: idx
    })

    creteMyBook = (evt) => {
        evt.preventDefault();
        const requestBody = {
            bookName: this.state.bookName,
            description: this.state.description,
            status: this.state.status,
            email: this.state.email
        }

        axios.post(`${this.state.serverUrl}/book`, requestBody).then(response => {
            this.setState({
                booksData: response.data.books
            })
        }).catch(error => {
            alert(error.message)
        })
    }

    updateMyBook = (evt) => {
        evt.preventDefault();
        const requestBody = {
            bookName: this.state.bookNameUpdate,
            description: this.state.descriptionUpdate,
            status: this.state.statusUpdate,
            email: this.state.email
        }

        axios.put(`${this.state.serverUrl}/book/${this.state.bookIndex}`, requestBody).then(response => {
            this.setState({
                booksData: response.data.books
            })
        }).catch(error => {
            alert(error.message)
        })
    }
    deleteMyBook = (idx) => {
       
        axios.delete(`${this.state.serverUrl}/book/${idx}?email=${this.state.email}`).then(response => {
            this.setState({
                booksData: response.data.books,
                showUpdateForm: false
            })
        }).catch(error => {
            alert(error.message)
        })

    }
  
    componentDidMount = () => {
        axios.get(`${this.state.serverUrl}/books?email=${this.state.email}`).then(response => {
            this.setState({
                booksData: response.data.books
            })
        }).catch(
            error => {
                alert(error.message);
            }
        );
    }
    render() {
        return (
            <>
                <h2>My Books</h2>
                {this.state.booksData.length > 0 && this.state.booksData.map((book, idx) => (
                    
                    <>
                        <div key={idx}>
                            {book.name} <br></br>
                            {book.description}<br></br>
                            {book.status}<br></br>
                            <button onClick={evt => this.deleteMyBook(idx)}>Delete</button>
                            <button onClick={evt => this.showUpdateForm(book, idx)}>Update Form</button>
                            <br></br>
                            <br></br>
                        </div>
                        
                    </>
                ))}
                <div>
                    <CreateBook 
                        creteMyBook={this.creteMyBook}
                        updateBookName={this.updateBookName}
                        updateBookDescription={this.updateBookDescription}
                        updateBookStatus={this.updateBookStatus}
                    />
                    {
                        this.state.showUpdateForm && 
                        <div>
                            <UpdateBook 
                                updateMyBook={this.updateMyBook}
                                updateBookNameUpdate={this.updateBookNameUpdate}
                                updatedescriptionUpdate={this.updatedescriptionUpdate}
                                updatestatusUpdate={this.updatestatusUpdate}
                                bookNameUpdate={this.state.bookNameUpdate}
                                descriptionUpdate={this.state.descriptionUpdate}
                                statusUpdate={this.state.statusUpdate}

                            />
                        </div>
                    }
                </div>
            </>
        )
    }
}

export default withAuth0(BestBooks);