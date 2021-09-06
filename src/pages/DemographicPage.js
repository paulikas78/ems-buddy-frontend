import { Component } from "react";
import EmsAPI from '../api/EmsAPI'

class DemographicPage extends Component {

  static MODE_TYPE = {
    VIEW: 1,
    UPDATE: 2,
  }

  state = {
    demographic: null,
    mode: DemographicPage.MODE_TYPE.VIEW
  }


  changeMode = (newMode) => {
    this.setState({mode: newMode})
  }



  // getDemographicbyId
   // helper methods

   async getDemographic() {
    try {
      let demographicId = this.props.match.params.demographicId
      let demographicData = await EmsAPI.fetchDemographicByID(demographicId)
      if (demographicData) {
        this.setState({ demographic: demographicData })
      }
    }
    catch (error) {
      console.log(error)
    }
  }



  updateDemographic = async () => {
    try {
      let inputAge = document.getElementById("demographic-age")
      let inputGender = document.getElementById("demographic-gender")
      let inputZip = document.getElementById("new-zip")
      let demographicId = this.props.match.params.demographicId
    
      if (inputAge && inputGender && inputZip && demographicId > 0) {
        let updatedDemographic = {
          ailment: this.props.match.params.ailmentId,
          age: inputAge.value,
          gender: inputGender.value,
          zip: inputZip.value
        }

        let data = await EmsAPI.updateDemographic(demographicId, updatedDemographic)
        if (data) {
          this.setState({demographic: data})
          this.changeMode(DemographicPage.MODE_TYPE.VIEW)
        }
      }     
    }
    catch {
      console.eror("update demographic error")

    }

  }


  deleteDemographic = async () => {
    
    try {
     
      let ailmentId = this.props.match.params.ailmentId
      let demographicId = this.props.match.params.demographicId
      
      if (demographicId > 0) {
        let result = await EmsAPI.deleteDemographic(demographicId)
        if (result.success) {
          this.props.history.push(`/ailments/${ailmentId}/`)
        }
      }
    }
    catch {
      console.error("delete demographic error")
    }
  }


    // life cycle
    componentDidMount() {
      this.getDemographic()
    }


    // render
    renderDemographic() {
      if (!this.state.demographic) {
        return <p>No demographic found!</p>
      }

      if (this.state.mode === DemographicPage.MODE_TYPE.UPDATE) {
        return (
          <div>
            <div>
              <h3 className="nonbreak">Age: </h3>
              <input id="demographic-age" placeholder="age" defaultValue={this.state.demographic.age}/>
            </div>
            <div>
              <h3 className="nonbreak">Gender: </h3>
              <input id="demographic-gender" placeholder="gender" defaultValue={this.state.demographic.gender}/>
            </div>
            <div>
              <h3 className="nonbreak">ZIP Code: </h3>
              <input id="new-zip" placeholder="zip" defaultValue={this.state.demographic.zip}/>
            </div>
            <br />
            <button onClick={this.updateDemographic}>Save</button>
            <button onClick={() => this.changeMode(DemographicPage.MODE_TYPE.VIEW)}>Cancel</button>
          </div>
        )
      }
  
      
      return (
        <div>
          <h1>Demographic of Patient in ZIP Code: { this.state.demographic.zip }</h1>
        
          <h2>Age: {this.state.demographic.age}</h2>
          <h2>Gender: {this.state.demographic.gender}</h2>
        
          <hr />

          <h2>Location: </h2>
          <iframe 
            width="600"
            height="450" 
            style={{ "border":"0 0 0 0" }}
            loading="lazy" 
            allowFullScreen
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDRWop4QSkZ_rQLqaYOtwGx9zvYlZ_EuMY&q=${this.state.demographic.zip}`}>
          </iframe>
          <hr />
        </div>
      )
    }

  render() {
    
    return (
      
      <div>
        
        { this.renderDemographic() }
       
         <button onClick={() => this.changeMode(DemographicPage.MODE_TYPE.UPDATE)}>Update</button>
         <button onClick={this.deleteDemographic}>Delete</button>

      </div>
    )
  }
}

export default DemographicPage;