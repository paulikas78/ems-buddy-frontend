import React, { Component } from 'react'
import { Link } from "react-router-dom"
import EmsAPI from '../api/EmsAPI.js'

class AilmentPage extends Component {

  state = {
    ailment: null
  }


  addDemographic = async () => {
   
      try {
       
        let inputAge = document.getElementById("new-age")
        let inputGender = document.getElementById("new-gender")
        let inputZip = document.getElementById("new-zip")

        if (inputAge && inputGender && inputZip) {
       
          let newDemographicParams = {
            ailment: this.state.ailment.id,
            age: inputAge.value,
            gender: inputGender.value,
            zip: inputZip.value
          }
          
          let data = await EmsAPI.addDemographic(newDemographicParams)
          if (data) {
            this.getAilment()
          }
        }
      }
      catch {
        console.log("error adding new dems")
      }
    }


   async getAilment() {
    const id = this.props.match.params.ailmentId

    let response = await EmsAPI.fetchAilmentByID(id)
    console.log('response: ', response)

    this.setState({
      ailment: response
      
    })
   }


  componentDidMount() {
    this.getAilment()
  }


  renderDemographics() {
         let demographicElements = this.state.ailment.demographics.map((demographic, index) => {
          
           return (
             <li key={`demographic-${index}`}>
               <Link to={`/ailments/${this.props.match.params.ailmentId}/demographics/${demographic.id}`}>ZIP Code {demographic.zip}</Link>
             </li>
           )
         })
      
        return (
          <ul className="simple-list">
            { demographicElements }
          </ul>
        )
      }

  renderAilment()  {
     if (!this.state.ailment) {
       return <p>No ailment found!</p>
     }
     
     return (
             <div>
               <h1>{this.state.ailment.name}</h1>
               
               { this.renderDemographics() }
               <hr />
               <input id="new-age" placeholder="age"/>
               <input id="new-gender" placeholder="gender"/>
               <input id="new-zip" placeholder="zip"/>
               <button onClick={this.addDemographic}>Add Demographic</button>
             </div>
           )
          
         }


  render() {
    
    return (
      <div>
        <h1>Chief Complaint: </h1>
        <h4>{ this.renderAilment() }</h4>

        


      </div>
    )
  }
}


export default AilmentPage