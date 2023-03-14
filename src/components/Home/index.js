import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Courses from '../Courses'

import './index.css'

const apiStatusUpdate = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    coursesList: [],
    apiStatus: apiStatusUpdate.initial,
  }

  componentDidMount() {
    this.getCoursesApi()
  }

  getCoursesApi = async () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress})
    const coursesApiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(coursesApiUrl)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.courses.map(eachData => ({
        id: eachData.id,
        logoUrl: eachData.logo_url,
        name: eachData.name,
      }))
      console.log(updatedData)
      this.setState({
        coursesList: updatedData,
        apiStatus: apiStatusUpdate.success,
      })
    } else {
      this.setState({apiStatus: apiStatusUpdate.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
      />
      <h1 className="main-heading">Oops! Something Went Wrong</h1>
      <p className="">We cannot seem to find the page you are looking for</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderPostLists = () => {
    const {coursesList} = this.state

    return (
      <div className="home-container">
        <div className="header-container">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </div>
        <div className="header-container-heading">
          <h1 className="main-heading">Courses</h1>
        </div>

        <ul className="corses-container">
          {coursesList.map(eachCourse => (
            <Courses key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusUpdate.success:
        return this.renderPostLists()
      case apiStatusUpdate.failure:
        return this.renderFailureView()
      case apiStatusUpdate.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="app-container">{this.renderApiStatus()}</div>
  }
}
export default Home
