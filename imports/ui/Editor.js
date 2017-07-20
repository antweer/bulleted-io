import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleBodyChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      body: event.target.value
    });
  }
  
  handleTitleChange(event) {
    this.props.call('notes.update', this.props.note._id, {
      title: event.target.value
    });
  }
  
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder='Add a title!' onChange={this.handleTitleChange.bind(this)} />
          <textarea value={this.props.note.body} placeholder='Add a note!' onChange={this.handleBodyChange.bind(this)} ></textarea>
          <button>Delete Note</button>
        </div>
      );
    } else {
      return (
        <p>
          { this.props.selectedNoteId ? 'Note not found' : 'Pick or create a note to get started' }
        </p>
      );
    }
  }
};

Editor.propTypes = {
  note: React.PropTypes.object,
  selectedNoteId: React.PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  
  return {
    selectedNoteId: selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
  };
}, Editor);