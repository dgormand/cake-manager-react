import React from 'react';

const CakeTemplate = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="closeButton" onClick={handleClose}>X</div>
        <h2>Please add your cake here!</h2>
        <label htmlFor="name">Name:</label> <input className="formControl"  type="text" maxLength="100" id="name" />
        <label htmlFor="image">Image Url:</label><input className="formControl"  type="text" maxLength="300" id="image"  />
        <label htmlFor="desc">Description:</label> <input className="formControl" type="text" maxLength="100" id="desc" />
        <br />
        <button type="buttonClass">Submit</button>
      </section>
    </div>
  );
};

function CakeCard(props) {
  return(<div className="cakeCard">
            <h3>{props.item.name}</h3>
        <img src={props.item.image} alt={props.item.name} />
        <p>{props.item.description}</p>
  </div>)
}

function CakeList(props) {
  return(
      <div className="cakeList">
        {props.cakeList.map((item, index) => (
        <CakeCard key={index} item={item} />
      ))}
      </div>
  )
}

function CakeHeader(props) {
  return(
    <div>
      <div className="cakeHeader">
        <h2>Welcome to cake manager</h2>
      </div>
      <div className="subMenu">
        <button className="buttonClass" onClick={props.onClick}> Add Cake </button>
      </div>
      </div>
      )
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      cakeList: [],
      loaded:false,
      showAddPage:false,
    }
  }

  componentDidMount() {
    this.loadCakes();
    return;
  }

  loadCakes(){
    fetch('/cakes/cakeEntities')
    .then(response => response.json())
    .then(data => this.setState({cakeList:data._embedded.cakeEntities, loaded:true}));
  }

  toggleAddPage(){
    this.setState({showAddPage: !this.state.showAddPage});
  }

  render(){
    return (
    <div className="App">
        <CakeHeader onClick={this.toggleAddPage.bind(this)}/>
        {this.state.loaded && <CakeList cakeList={this.state.cakeList}/>}
        <CakeTemplate show={this.state.showAddPage} handleClose={this.toggleAddPage.bind(this)}/>
    </div>
  );}
}

export default App;
