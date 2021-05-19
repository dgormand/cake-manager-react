function CakeForm(props){
    return (
      <div className={props.show ? "modal display-block" : "modal display-none"}>
        <section className="modal-main">
          <div className="closeButton" onClick={props.handleClose}>X</div>

          <h2>Please add your cake here!</h2>
          <div className="modalSub">
              <div className="modalPicture"><img src={props.cakeImg} alt="Test Me" /></div>
              <div>
                <label htmlFor="name">Name:</label> <input className="formControl" value={props.cakeName} name="cakeName"  type="text" maxLength="100" id="name" onChange={props.handleInputChange} />
                <label htmlFor="image">Image Url:</label><input className="formControl"  value={props.cakeImg} name="cakeImg"  type="text" maxLength="300" id="image" onChange={props.handleInputChange} />
                <label htmlFor="desc">Description:</label> <input className="formControl" value={props.cakeDesc} name="cakeDesc" type="text" maxLength="100" id="desc" onChange={props.handleInputChange} />
                <br />
                <button className="submitButton" type="buttonClass" onClick={props.handleSubmit}>Submit</button>
              </div>
              {props.showError && <p className="error">All the fields have to be filled</p>}
            </div>
        </section>
      </div>
    );
  };

export default CakeForm;