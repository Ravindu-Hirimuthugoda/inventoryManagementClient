import {Switch,Route} from 'react-router-dom';
import "../src/component/Layout/FontawsomeIcon";
import ApproveRequestScreen from './screen/lecturerScreen/approveRequestScreen';
import CheckAvailabilityScreen from './screen/lecturerScreen/CheckAvailabilityScreen';
import CreateNormalRequestScreen from './screen/lecturerScreen/CreateNormalRequestScreen';
import RequestDetail from './screen/lecturerScreen/RequestDetailScreen';
import CreateTemporaryRequestScreen from './screen/lecturerScreen/CreateTemporaryRequestScreen';
import StudentCheckAvailability from './screen/studentScreen/StudentCheckAvailability';
import StudentNormalRequest from './screen/studentScreen/StudentNormalRequest';
import StudentTemporalRequest from './screen/studentScreen/StudentTemporalRequest';
import StudentBorrowingDetails from './screen/studentScreen/StudentBorrowingDetails';

//not relevent

function App() {
  return(
      <Switch>
        <Route path='/'>
          <CheckAvailabilityScreen/>
        </Route>
        <Route path='/createNormalRequest'>
          <CreateNormalRequestScreen/>
        </Route>
        <Route path='/createTemporaryRequest'>
          <CreateTemporaryRequestScreen/>
        </Route>
        <Route path='/approveRequest'>
          <ApproveRequestScreen/>
        </Route>
        <Route path='/requestDetail/:id'>
          <RequestDetail/>
        </Route>
        <Route path='/student/checkAvailability'>
          <StudentCheckAvailability/>
        </Route>
        <Route path='/student/createNormalRequest'>
          <StudentNormalRequest/>
        </Route>
        <Route path='/student/createTemporaryRequest'>
          <StudentTemporalRequest/>
        </Route>
        <Route path='/student/borrowingItems'>
          <StudentBorrowingDetails/>
        </Route>
      </Switch>
  );
}

export default App;
