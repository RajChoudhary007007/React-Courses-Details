import {Switch, Route, BrowserRouter} from 'react-router-dom'
import Home from './components/Home'
import CoursesDetails from './components/CoursesDetails'
import NotFound from './components/NotFound'
import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/courses/:id" component={CoursesDetails} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
