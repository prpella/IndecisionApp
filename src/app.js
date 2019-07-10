
// import React from 'react'
// import ReactDOM from 'react-dom'

// Basic Component Structure

// class Header extends React.Component {
//   render() {
//     return <p>This is from Header</p>
//   }
// }

// const jsx = (
//   <div>
//     <h1>Title</h1>
//     <Header/>
//   </div>
// )

// ReactDOM.render(jsx, document.getElementById('app'))

// eslint-disable-next-line no-undef
class IndecisionApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
    this.handlePick = this.handlePick.bind(this)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.handleDeleteOption = this.handleDeleteOption.bind(this)
    this.state = {
      options : props.options
    }
  }
  
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }))
  }

  handleDeleteOption(optionToRemove) {
    this.setState((prevState) => ({
      options: prevState.options.filter((option) => {optionToRemove !== option})
    }))
  }
  // no state needed for option
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length)
    const option = this.state.options[randomNum]
    alert(option)
  }

  handleAddOption(option) {
    if(!option) {
      return "Enter valid Value to add item"
    } else if (this.state.options.indexOf(option) > -1) { // checks, if there is a match in the array
      return "This option already exists"
    }
 // concat is used instead of .push, as push is manipulating the this.state object.
 // Never manipulate this.state or prevState! Just compute the new one! concat does this,
 // as it returns a new array

    this.setState((prevState) => ({options: prevState.options.concat(option)}))

  }

  render() {
    const subTitle = 'Put your Life in the hands of a computer!'

    return (
      <div>
        <Header subTitle={subTitle} />
        <Action 
          hasOptions={this.state.options.length > 0} 
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options} 
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption 
          handleAddOption={this.handleAddOption}
        />
      </div>
    )
  }
}



// stateless functional components
const Header = (props) => {
  return (
    <div>
      <h1 style={{ backgroundColor: 'green', color: 'white' }}>{props.title}</h1>
      {props.subTitle && <h2>{props.subTitle}</h2>}
    </div>
  )  
}

Header.defaultProps = {
  title: 'Indecision App'
}

const Action = (props) => {
  return (
    <div>
      <button onClick={props.handlePick}
      disabled={!props.hasOptions}
      >
        What Should I Do, say ?
      </button>
    </div>
  )
}

// ------CALLING BIN IN THE CONSTRUCTOR METHOD------
// method binding! use .bind(this) in the render function (expensive in data) Better: 
// overwrite the React.Component constructor function with constructor method and pass props in (here same as this.props)
// call super to make use the values got set
// set this.handle... to the binding of this

const Options = (props) => {
  return (
    <div>
    <button onClick={props.handleDeleteOptions}>Remove all</button>
      {
        props.options.map((option) => (
          <Option 
            key={option} 
            optionText={option}
            handleDeleteOption={props.handleDeleteOption}
          />
        ))
      }
    </div>
  )
}

const Option = (props) => {
  return (
    <div>
      {props.optionText}
      <button 
        onClick={() => {
          props.handleDeleteOption(props.optionText)
        }}
      >Remove</button>
    </div>
  )
}

// eslint-disable-next-line no-undef
class AddOption extends React.Component {
  constructor(props) {
    super(props)
    this.handleAddOption = this.handleAddOption.bind(this)
    this.state = {
      error : undefined
    }
  }
  handleAddOption(e) {
    e.preventDefault()
    const option = e.target.elements.option.value.trim()
    // parent method returns only error, if something went wrong, if no error occurs,
    // undefinded is returned. that is why we can store the error return value.
    const error = this.props.handleAddOption(option)

    this.setState(() => ({error}))
  }
  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddOption}>
          <input type="text" name="option" />
          <button>Add Option</button>
        </form>
      </div>
    )
  }
}
  


// eslint-disable-next-line no-undef
ReactDOM.render(<IndecisionApp />, document.getElementById('app'))