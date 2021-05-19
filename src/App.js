import React from 'react';
import axios from 'axios';
import CakeForm from './cakeForm.js'

function ErrorMsg(props) {
  return(
      <div className="errorMsg">
      <div className="closeButton" onClick={props.closeError}>X</div>
        <h3>Something went wrong :(</h3>
        <p>{props.error.message} </p>
        <p>Cake has not been added</p>
      </div>
  )
}

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
    this.child = React.createRef();
    this.state = {
      cakeList: [],
      loaded:false,
      showAddPage:false,
      cakeName:"",
      cakeImg:"",
      cakeDesc:"",
      showError:false,
      reactError:false,
      errorData:[],
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
      [name]: value});
  }

  validEntries(){
      if(this.state.cakeName!=="" && this.state.cakeImg!=="" && this.state.cakeDesc!==""){
        return true;
      }
      return false;
  }

  addCake(){
    if(this.validEntries()){
     
     this.setState({showError:false});
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
     }).then((response) => this.loadCakes())
    .catch((error) => {
      this.setState({errorData:error, reactError:true})
      console.log(error)
    });
      this.setState({cakeName:"", cakeImg:"", cakeDesc:""});
    }
    this.setState({showError:true});
  }

  closeError(){
    this.setState({errorData:[], reactError:false})
  }
  toggleAddPage(){
    this.setState({showAddPage: !this.state.showAddPage, showError:false});
  }

  render(){
    return (
    <div className="App">
        <CakeHeader onClick={this.toggleAddPage.bind(this)}/>
        {this.state.reactError && <ErrorMsg error={this.state.errorData} closeError={this.closeError.bind(this)}/>}
        {this.state.loaded && <CakeList cakeList={this.state.cakeList}/>}
        <CakeForm show={this.state.showAddPage} 
                      handleClose={this.toggleAddPage.bind(this)} 
                      handleSubmit={this.addCake.bind(this)} 
                      handleInputChange={this.handleInputChange.bind(this)}
                      cakeName={this.state.cakeName}
                      cakeImg={this.state.cakeImg}
                      cakeDesc={this.state.cakeDesc}
                      showError={this.state.showError}
                       />
    </div>
  );}
}

export default App;
