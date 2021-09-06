import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import EmsAPI from "../api/EmsAPI"
import AilmentSummary from '../components/AilmentSummary'

class HomePage extends Component {

  state = {
    ailments: [],
    bodyweight: 0,
    burnPercentage: 0,
    dripCalc: 0,
    mlPerMin: 0,
    epiIMDose: 0,
    epiIVDose: 0,
    amioDose: 0,
    bicarbDose: 0,
    benadrylDose: 0,
    d10Dose: 0,
    d25Dose: 0,
    normalSalineDose: 0,
    lorazepamDose: 0,
    midazolamDose: 0,
    defib1Dose: 0,
    defib2Dose: 0
  }

  componentDidMount(){
    EmsAPI.fetchAilments()
      .then((apiResponseJSON) => {
        console.log(apiResponseJSON)
        this.setState({
          ailments: apiResponseJSON
        })
      }
    )
  }

        addAilment = async () => {
          let input = document.getElementById("new-ailment")
          if (input) {
            let newAilmentParam = {
              name: input.value
              
            }
            let data = await EmsAPI.addAilment(newAilmentParam)

             if (data) {
                let newAilments = [...this.state.ailments, data]
                this.setState({ailments: newAilments})
            }
          }
        }


        deleteAilment = async (ailmentId) => {
            try {
              if (ailmentId > 0) {
                let result = await EmsAPI.deleteAilment(ailmentId)

                console.log(result)

                if (result.success) {
                  let newAilments = this.state.ailments.filter((ailment, index) => {
                    return ailment.id !== ailmentId
                  })

                  this.setState({ailments: newAilments})
                  console.log(this.state)
                }
              }
            }
          catch {
            console.log('unable to delete ailment')
                  
          }
        }


// FLUID & DOSAGE CALCULATORS

        calculateDrip = (bodyweight, burnPercentage) => {
   
          try {
            if (bodyweight && burnPercentage) {
              let dropsPerSec = ((4 * (bodyweight / 2.2) * burnPercentage) / 5760).toFixed(1)
              this.setState({dripCalc: dropsPerSec})
              }
            
              }
        
          catch {
            console.log("error calculating drip")
          }
        }

        calculateMlPerMin = (bodyweight, burnPercentage) => {
          try {
            if (bodyweight && burnPercentage) {
              let mlPerMinute = ((4 * (bodyweight / 2.2) * burnPercentage) / 960).toFixed(1)
              this.setState({mlPerMin: mlPerMinute})
              }
            
              }
        
          catch {
            console.log("error calculating mL per minute")
          }
        }


        epiIMDosage = (weight) => {
          try {
            if(weight) {
              let epiIM = (0.01 * (weight / 2.2)).toFixed(2)
              this.setState({epiIMDose: epiIM})
            }
          }
          catch {
            console.log("error loading Epi IM dose")
          }
        }


        epiIVDosage = (weight) => {
          try {
            if(weight) {
              let epiIV = (0.1 * (weight / 2.2)).toFixed(1)
              this.setState({epiIVDose: epiIV})
            }
          }
          catch {
            console.log("error loading Epi IV dose")
          }
        }

        amioDosage = (weight) => {
          try {
            if(weight) {
              let amio = (0.1 * (weight / 2.2)).toFixed(1)
              this.setState({amioDose: amio})
            }
          }
          catch {
            console.log("error loading amiodarone dose")
          }
        }

        bicarbDosage = (weight) => {
          try {
            if(weight) {
              let bicarb = (weight / 2.2).toFixed(0)
              this.setState({bicarbDose: bicarb})
            }
          }
          catch {
            console.log("error loading bicarb dose")
          }
        }

        benadrylDosage = (weight) => {
          try {
            if(weight) {
              let benadryl = ((weight / 2.2) / 50).toFixed(2)
              this.setState({benadrylDose: benadryl})
            }
          }
          catch {
            console.log("error loading benadryl dose")
          }
        }

        d10Dosage = (weight) => {
          try {
            if(weight) {
              
              let d10 = 5 * ((weight / 2.2)).toFixed(0)
              this.setState({d10Dose: d10})
            }
          }
          catch {
            console.log("error loading D10 dose")
          }
        }

        d25Dosage = (weight) => {
          try {
            if(weight) {
              let d25 = (2 * (weight / 2.2)).toFixed(0)
              this.setState({d25Dose: d25})
            }
          }
          catch {
            console.log("error loading D25 dose")
          }
        }

        normalSalineDosage = (weight) => {
          try {
            if(weight) {
              let normalSaline = (20 * (weight / 2.2)).toFixed(0)
              this.setState({normalSalineDose: normalSaline})
            }
          }
          catch {
            console.log("error loading normal saline dose")
          }
        }

        lorazepamDosage = (weight) => {
          try {
            if(weight) {
              let lorazepam = (0.05 * (weight / 2.2)).toFixed(1)
              this.setState({lorazepamDose: lorazepam})
            }
          }
          catch {
            console.log("error loading lorazepam dose")
          }
        }

        midazolamDosage = (weight) => {
          try {
            if(weight) {
              let midazolam = (0.04 * (weight / 2.2)).toFixed(1)
              this.setState({midazolamDose: midazolam})
            }
          }
          catch {
            console.log("error loading midazolam dose")
          }
        }

        defib1Dosage = (weight) => {
          try {
            if(weight) {
              let defib1 = (2 * (weight / 2.2)).toFixed(0)
              this.setState({defib1Dose: defib1})
            }
          }
          catch {
            console.log("error loading defib1 dose")
          }
        }

        defib2Dosage = (weight) => {
          try {
            if(weight) {
              let defib2 = (4 * (weight / 2.2)).toFixed(0)
              this.setState({defib2Dose: defib2})
            }
          }
          catch {
            console.log("error loading defib2 dose")
          }
        }

        




  renderAilments() {
    let renderedAilments = this.state.ailments.map((ailment, index) => {
         return ( 
         <li key={`ailment-${index}`}>
         <Link to={`/ailments/${this.props.match.params.ailmentId}`}></Link>

           <AilmentSummary ailment={ailment} handleDelete={this.deleteAilment}/>
         </li>
       )
    })


    // return renderedAilments
    return (
       <div>
            <h2>Chief Complaints of Calls:</h2>
              <ul className="simple-list">
                { renderedAilments }

              </ul>
            
            <input id="new-ailment" placeholder="Chief Complaint"/>
            <button onClick={this.addAilment}>Add New Chief Complaint</button>
        </div>


    )
  }

    handleSubmit = (event) => {
      event.preventDefault()

      let dripCalculation = this.calculateDrip(this.state.bodyweight, this.state.burnPercentage)
      console.log("dripCalulation: ", dripCalculation)
      
      let mlPerMinCalculation = this.calculateMlPerMin(this.state.bodyweight, this.state.burnPercentage)
      console.log("mL Per Minute Calculation: ", mlPerMinCalculation) 

      let doseEpiIM = this.epiIMDosage(this.state.weight)
      console.log("Epi IM Dosage: ", doseEpiIM)

      let doseEpiIV = this.epiIVDosage(this.state.weight)
      console.log("Epi IV Dosage: ", doseEpiIV)

      let doseAmio = this.amioDosage(this.state.weight)
      console.log("Amiodarone Dosage: ", doseAmio)

      let doseBicarb = this.bicarbDosage(this.state.weight)
      console.log("Bicarb Dosage: ", doseBicarb)

      let doseBenadryl = this.benadrylDosage(this.state.weight)
      console.log("Benadryl Dosage: ", doseBenadryl)

      let doseD10 = this.d10Dosage(this.state.weight)
      console.log("D10 Dosage: ", doseD10)

      let doseD25 = this.d25Dosage(this.state.weight)
      console.log("D25 Dosage: ", doseD25)

      let doseNormalSaline = this.normalSalineDosage(this.state.weight)
      console.log("Normal Saline Dosage: ", doseNormalSaline)

      let doseLorazepam = this.lorazepamDosage(this.state.weight)
      console.log("Lorazepam Dosage: ", doseLorazepam)

      let doseMidazolam = this.midazolamDosage(this.state.weight)
      console.log("Midazolam Dosage: ", doseMidazolam)

      let doseDefib1 = this.defib1Dosage(this.state.weight)
      console.log("Defib1 Dosage: ", doseDefib1)

      let doseDefib2 = this.defib2Dosage(this.state.weight)
      console.log("Defib2 Dosage: ", doseDefib2)

      return
    }

    handleChange = (event) => {
      let fieldName = event.target.name
      let fieldValue = event.target.value
      
      if (fieldName === "bodyweight") {
        this.setState({bodyweight: fieldValue})
      } else if (fieldName === "burn-percentage") {
        this.setState({burnPercentage: fieldValue})

      } else if (fieldName === "weight") {
        this.setState({weight: fieldValue})
      }
      
      console.log(this.state)
    }


  render() {
    return (
      <div>
        <h1>EMS Call Tracker and Calculator</h1>
        <hr />
          {/* <img src="https://i.ebayimg.com/images/g/GzQAAOSwWlxcd6qQ/s-l300.jpg" class="lazy-load" alt="..."> */}
      
          <iframe src="https://covid-19.dataflowkit.com/assets/widget/covid-19.html" 
            frameborder="0" scrolling="no"
            width="250" height="250">
          </iframe>
          <hr />
          { this.renderAilments() }
      <hr />

      <h2>Fluid Resuscitation Calculator for Burn Patients:</h2>
      <h5>According to Parkland Formula</h5> 
      <h6>For Burns Over 10% or more of Total Body Surface Area in Pediatrics and Geriatrics</h6>
      <h6>For Burns Over 20% or more of Total Body Surface Area in Adults</h6>

      <form onChange={this.handleChange}>

        <input name="bodyweight" placeholder="Body Weight (lbs.)"/>
        <input name="burn-percentage" placeholder="% Body Area Burned"/>
        <button onClick={this.handleSubmit} type="submit" value="submit">Calculate Drip</button>
        
      </form>
          { this.state.dripCalc > 0 && 
            
            <h4>
              {this.state.dripCalc} Drops Per Second in 10 Drops / mL Dripset
            </h4>
          }
          { this.state.mlPerMin > 0 && 
            
            <h4>
              Infusion Rate: {this.state.mlPerMin} mL / minute
            </h4>
          }

          <iframe src="http://ipadstopwatch.com/embed.html" frameborder="0" scrolling="no" width="391" height="140"></iframe>

        <hr />

        <h2>Pediatric Dosage Calculator:</h2>
        <h5>According to the Handtevy Pediatric Code and NREMT</h5>

        <form onChange={this.handleChange}>

          <input name="weight" placeholder="Body Weight if < 67 lbs."/>
          <button onClick={this.handleSubmit} type="submit" value="submit">Calculate Dose</button>
          
          
              
        </form>
        { this.state.epiIMDose > 0 && 
          
          <h4>
            Epi IM - 1:1000 @ 1 mg / mL:   {this.state.epiIMDose} mL
          </h4>
        }
        { this.state.epiIVDose > 0 && 
          
          <h4>
            Epi IV - 1:10,000 @ 0.1 mg / mL:   {this.state.epiIVDose} mL
          </h4>
        }
        { this.state.amioDose > 0 && 
          
          <h4>
            Amiodarone @ 50 mg / mL:   {this.state.amioDose} mL
          </h4>
        }
        { this.state.bicarbDose > 0 && 
          
          <h4>
            Bicarb 8.4% @ 1 mEq / mL:   {this.state.bicarbDose} mL
          </h4>
        }
         { this.state.benadrylDose > 0 && 
          
          <h4>
            Benadryl @ 50 mg / mL:   {this.state.benadrylDose} mL
          </h4>
        }
        { this.state.d10Dose > 0 && 
          
          <h4>
            D10W @ 0.1 g / mL:   {this.state.d10Dose} mL
          </h4>
        }
        { this.state.d25Dose > 0 && 
          
          <h4>
            D25W @ 0.25g / mL:   {this.state.d25Dose} mL
          </h4>
        }
        { this.state.normalSalineDose > 0 && 
          
          <h4>
            Normal Saline @ 0.9%:   {this.state.normalSalineDose} mL
          </h4>
        }
        { this.state.lorazepamDose > 0 && 
          
          <h4>
            Lorazepam @ 2 mg / mL:   {this.state.lorazepamDose} mL
          </h4>
        }
        { this.state.midazolamDose > 0 && 
          
          <h4>
          Midazolam IM / IN @ 5 mg / mL:   {this.state.midazolamDose} mL
          </h4>
        }
        {
          
          
        }
         { 
         this.state.defib1Dose > 0 && 
          
          <h4>
          <hr />
          <h2>Defibrilation Settings:</h2>
          Initial Defib @ 2 J / kg:   {this.state.defib1Dose} J
          </h4>
        }
         { this.state.defib2Dose > 0 && 
          
          <h4>
          Subsequent Defib @ 4 J / kg:   {this.state.defib2Dose} J
          </h4>
        }
      </div>
    )
  }
}


export default HomePage