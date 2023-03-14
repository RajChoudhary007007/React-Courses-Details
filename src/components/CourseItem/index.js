import './index.css'

const CourseItem = props => {
  const {corseDetailsList} = props
  const {imageUrl, name, description} = corseDetailsList

  return (
    <li className="item-details-list">
      <img className="image" alt="website logo" src={imageUrl} />
      <div className="name-container">
        <h1 className="name-heading">{name}</h1>
        <p className="name-description">{description}</p>
      </div>
    </li>
  )
}
export default CourseItem
