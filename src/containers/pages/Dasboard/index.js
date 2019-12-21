import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addDataToAPI, getDataFromAPI, updateDataAPI } from '../../../config/redux/action';

class Dasboard extends Component {

  state = {
    title: '',
    content: '',
    date: '',
    noteId: '',
    textButton: 'Simpan'
  }

  componentDidMount() {
    const userData = JSON.parse(localStorage.getItem('userData'))
    this.props.getNotes(userData.uid)
  }

  handleSaveNotes = () => {
    const { title, content, textButton, noteId } = this.state;
    const { saveNotes, updateNotes } = this.props;
    const userData = JSON.parse(localStorage.getItem('userData'))
    const data = {
      title: title,
      content: content,
      date: new Date().getTime(),
      userId: userData.uid
    }
    if (textButton === 'Simpan') {
      saveNotes(data)
    } else {
      data.noteId = noteId
      updateNotes(data)
      // console.log(data)
    }

  }

  onInputChange = (e, type) => {
    this.setState({
      [type]: e.target.value
    })

  }

  updateNotes = (note) => {
    // console.log(note);
    this.setState({
      title: note.data.title,
      content: note.data.content,
      noteId: note.id,
      textButton: 'Update'
    })
  }

  cancelUpdate = () => {
    this.setState({
      title: '',
      content: '',
      textButton: 'Simpan'
    })
  }

  render() {
    const { title, content, textButton } = this.state;
    const { notes } = this.props
    const { updateNotes } = this
    // console.log('notes:', notes);
    return (
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-7">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg">
                    <div className="p-5">
                      <div className="text-center">
                        <h1 className="h4 text-primary mb-4">Dasboard Page</h1>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-user"
                          id="title"
                          name="title"
                          onChange={(e) => this.onInputChange(e, 'title')}
                          value={title}
                          placeholder="Title"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          type="text"
                          className="form-control form-control-user"
                          id="content"
                          name="content"
                          onChange={(e) => this.onInputChange(e, 'content')}
                          value={content}
                          placeholder="Content"
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-around">
                        {
                          textButton === 'Update' ? (
                            <button className="btn btn-warning btn-user"
                              onClick={this.cancelUpdate}
                            >Cancel</button>
                          ) : null
                        }
                        <button className="btn btn-primary btn-user"
                          onClick={this.handleSaveNotes}
                        >{textButton}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        {
          notes.length > 0 ? (
            <Fragment>
              {
                notes.map(note => {
                  return (
                    <div className="card my-2" width='18rem' key={note.id}>
                      <div className="card-body">
                        <h5 className="card-title">{note.data.title} </h5>
                        <p>{note.data.date} </p>
                        <p className="card-text">{note.data.content}</p>
                        <div className="d-flex justify-content-center">
                          <button className="btn btn-success" onClick={() => updateNotes(note)}> Update</button>
                          <button className="btn btn-danger mx-2">delete</button>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </Fragment>
          ) : null
        }
      </div>
    );
  }
}

const reduxState = (state) => ({
  userData: state.user,
  notes: state.notes
})

const reduxDispatch = (dispatch) => ({
  saveNotes: (data) => dispatch(addDataToAPI(data)),
  getNotes: (data) => dispatch(getDataFromAPI(data)),
  updateNotes: (data) => dispatch(updateDataAPI(data)),
})

export default connect(reduxState, reduxDispatch)(Dasboard);
