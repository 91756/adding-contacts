import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import ContactItem from './components/ContactItem'

import './App.css'

const initialContactsList = [
  {
    id: uuidv4(),
    name: 'Ram',
    mobileNo: 9999988888,
    isFavorite: false,
  },
  {
    id: uuidv4(),
    name: 'Pavan',
    mobileNo: 8888866666,
    isFavorite: true,
  },
  {
    id: uuidv4(),
    name: 'Nikhil',
    mobileNo: 9999955555,
    isFavorite: false,
  },
]

class App extends Component {
  state = {name: '', mobileNo: '', contactsList: initialContactsList}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeMobileNo = event => {
    this.setState({mobileNo: event.target.value})
  }

  onAddContact = event => {
    event.preventDefault()
    const {name, mobileNo} = this.state
    const newContact = {
      id: uuidv4(),
      name,
      mobileNo,
      isFavorite: true,
    }
    this.setState(prevState => ({
      contactsList: [...prevState.contactsList, newContact],
      name: '',
      mobileNo: '',
    }))
  }

  toggleIsFavorite = id => {
    this.setState(prevState => ({
      contactsList: prevState.contactsList.map(eachContact => {
        if (eachContact.id === id) {
          return {...eachContact, isFavorite: !eachContact.isFavorite}
        }
        return eachContact
      }),
    }))
  }

  render() {
    const {name, mobileNo, contactsList} = this.state
    return (
      <div className="app-container">
        <div className="responsive-container">
          <h1 className="heading">Contacts</h1>
          <form className="contact-form-container" onSubmit={this.onAddContact}>
            <input
              type="text"
              className="input"
              onChange={this.onChangeName}
              placeholder="Enter Name"
              value={name}
            />
            <input
              type="text"
              className="input"
              onChange={this.onChangeMobileNo}
              placeholder="Mobile No"
              value={mobileNo}
            />
            <button type="submit" className="button">
              Add Contact
            </button>
          </form>
          <ul className="contacts-table ">
            <li className="table-header">
              <p className="table-header-cell name-column">Name</p>
              <hr className="separator" />
              <p className="table-header-cell">MobileNo</p>
            </li>
            {contactsList.map(eachContact => (
              <ContactItem
                key={eachContact.id}
                contactDetails={eachContact}
                toggleIsFavorite={this.toggleIsFavorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App
