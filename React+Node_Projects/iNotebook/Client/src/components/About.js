import React from 'react'

const About = () => {

  
  return (
    <div className='container'>
      <h1>Welcome to iNotebook!</h1>
      <div>
        <p>iNotebook is a web-app developed using React as the front-end and Node.JS as the back-end.</p>
        <p> The front-end comprises of all the featues such as Routing, using Hooks, functional Components, API calls, error handlings, mapping of the data received from APIs, responsiveness and styling from BootStrap.</p>
        <p> While the back-end uses Node.JS with Express and MongoDB with Mongoose to receive all the data and render the required data by client, all from the Mongo Atlas cloud. Authentication and Security uses B_Crypt for hashing the data and JsonWebTokens for authentication of the sessions. Also checks for the validation of the forms using express-validator and renders the respective errors which are further handled in the front-end.</p>
        <p>Basically what iNotebook does is allow different users to SignUP and Login to the webApp where the users can create some notes and have the ability to edit them and delete them as and when required. Each user will be able to access only his or her own account and respective notes.</p>
        <p>So enough about the details and start using iNotebook now!</p>
      </div>
    </div>
  )
}

export default About