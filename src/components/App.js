import _ from 'lodash';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { database } from '../firebase';
import { getNotes, saveNote, deleteNote } from '../actions/notesAction';
import NoteCard from './NoteCard'
import {getUser} from '../actions/userAction'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      notes: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderNotes = this.renderNotes.bind(this);
  }

  componentDidMount() {
    this.props.getNotes();
    this.props.getUser()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const note = {
      title: this.state.title,
      body: this.state.body,
    };
    this.props.saveNote(note);
    this.setState({
      title: '',
      body: '',
    });
  }

  renderNotes() {
    console.log(':', this.props.notes);
    return _.map(this.props.notes, (note, key) => (
      <NoteCard key={key}>
        <h2>{note.title}</h2>
        <p>{note.body}</p>
        <button
          className="btn btn-danger btn-xs"
          onClick={() => {
            this.props.deleteNote(key);
          }}
        >
          Delete
        </button>
      </NoteCard>
    ));
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  onChange={this.handleChange}
                  value={this.state.title}
                  type="text"
                  name="title"
                  className="form-control no-border"
                  placeholder="Title..."
                  required
                />
              </div>
              <div className="form-group">
                <textarea
                  onChange={this.handleChange}
                  value={this.state.body}
                  type="text"
                  name="body"
                  className="form-control no-border"
                  placeholder="body..."
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary col-sm-12">Save</button>
              </div>
            </form>
            {this.renderNotes()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ notes, user }) => {
  return {
    notes,
    user
  };
};

export default connect(mapStateToProps, { getNotes, saveNote, deleteNote, getUser })(App);
