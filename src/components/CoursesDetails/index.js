import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import './index.css'

const apiStatusUpdate = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CoursesDetails extends Component {
  state = {
    corseDetailsList: {},
    apiStatus: apiStatusUpdate.initial,
  }

  componentDidMount() {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({apiStatus: apiStatusUpdate.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.course_details
      const updatedData = {
        description: fetchedData.description,
        imageUrl: fetchedData.image_url,
        name: fetchedData.name,
        id: fetchedData.id,
      }
      console.log(updatedData)
      this.setState({
        corseDetailsList: updatedData,
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

  renderCoursesDetailsView = () => {
    const {corseDetailsList} = this.state

    return <CourseItem corseDetailsList={corseDetailsList} />
  }

  renderApiStatus = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusUpdate.success:
        return this.renderCoursesDetailsView()
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
export default CoursesDetails
