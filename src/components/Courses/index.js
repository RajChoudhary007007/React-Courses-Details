import {Link} from 'react-router-dom'
import './index.css'

const Courses = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link className="links" to={`/Courses/${id}`}>
      <li className="corse-item-container">
        <img className="corses-logo" src={logoUrl} alt="corses logo" />
        <h1 className="heading">{name}</h1>
      </li>
    </Link>
  )
}
export default Courses
