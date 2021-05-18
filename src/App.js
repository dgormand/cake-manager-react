import React from 'react';
import axios from 'axios'

const CakeTemplate = ({ handleClose, show, handleSubmit,handleInputChange, cakeList }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="closeButton" onClick={handleClose}>X</div>
        <h2>Please add your cake here!</h2>
        <form>
        <label htmlFor="name">Name:</label> <input className="formControl" name="cakeName"  type="text" maxLength="100" id="name" onChange={handleInputChange} />
        <label htmlFor="image">Image Url:</label><input className="formControl" name="cakeImg"  type="text" maxLength="300" id="image" onChange={handleInputChange} />
        <label htmlFor="desc">Description:</label> <input className="formControl" name="cakeDesc" type="text" maxLength="100" id="desc" onChange={handleInputChange} />
        <br />
        <button type="buttonClass" onClick={handleSubmit}>Submit</button>
        </form>
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
    axios.get('/cakes/').then((repos) => {
      this.setState({ loaded: true, cakeList: repos.data });
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  addCake(event){
    this.toggleAddPage();
    let data = JSON.stringify({
      name: this.state.cakeName,
      image: this.state.cakeImg,
      description:this.state.cakeDesc
    });

    axios.post('/cakes/',data,{
      headers: {
          'Content-Type': 'application/json'
      }
  }).then((response) => this.loadCakes());
  }

  toggleAddPage(){
    this.setState({showAddPage: !this.state.showAddPage});
  }

  render(){
    return (
    <div className="App">
        <CakeHeader onClick={this.toggleAddPage.bind(this)}/>
        {this.state.loaded && <CakeList cakeList={this.state.cakeList}/>}
        <CakeTemplate show={this.state.showAddPage} 
                      handleClose={this.toggleAddPage.bind(this)} 
                      handleSubmit={this.addCake.bind(this)} 
                      handleInputChange={this.handleInputChange.bind(this)}
                      cakeList={this.state.cakeList}
                      />
    </div>
  );}
}

export default App;
