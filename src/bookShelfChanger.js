import React, { Component } from 'react'
import './App.css'
//book shelf changer component,tell app book's new shelf and update information
class BookShelfChanger extends Component{
  state={
    ops:[{value:'none',cont:'Move to...'},
        {value:'currentlyReading',cont:'Currently Reading'},
        {value:'wantToRead',cont:'Want to Read'},
        {value:'read',cont:'Read'},
        {value:'none',cont:'None'}
        ]
  }
//update function
  updateShelf=(e,c)=>{
    this.props.updateShelf(e,c)
  }
  render(){
    return(
        <div className="book-shelf-changer">
            <select defaultValue={this.props.shelf} onChange={(event) => this.updateShelf(event.target.value,{id:this.props.info.id,title:this.props.info.title,authors:this.props.info.authors,shelf:this.props.shelf,imageLinks:this.props.info.imageLinks})}>
              {this.state.ops.map(op=>(
                <option key={op.cont} value={op.value}  disabled={op.cont==='Move to...'&&'disabled'} >{op.cont}</option>
              ))}
            </select>
        </div>
    )
  }
}
export default BookShelfChanger
