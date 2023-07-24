import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import BasicForm from "../components/login/Form";
import { useSelector } from "react-redux";
import Candidate from "../components/candidate/tableCandidate/candidate";
import Mentors from "../components/table/mentor/mentors";
import Students from "../components/table/student/students";
import Home from "../components/table/home/index";
import Interview from "../components/table/interview/search/interview";
import Internships from "../components/table/internships/InternShips";
import MenuBar from "../components/home/navbar/menuBar";
import ListDg from "../components/dg/table/listDg";
import SelectBatch from "../components/main/batch/selectBatch";

function App() {
  const isAuthen = useSelector((state) => state.auth.isAuthenticated);
  const idBatch = localStorage.getItem("idBatch");
  const home = `/home/batch/?id=${idBatch}`;
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {!isAuthen && <Redirect to="/login" />}
          {isAuthen && <Redirect to={home} />}
        </Route>
        <Route path="/login" exact>
          <BasicForm />
        </Route>
        {isAuthen && (
          <>
            <MenuBar />
            <Switch>
              <Route>
                <Route path="/candidate" exact component={Candidate} />
                <Route path="/mentor" exact component={Mentors} />
                <Route path="/student" exact component={Students} />
                <Route path="/home/batch" exact component={Home} />
                <Route path="/interview" exact component={Interview} />
                <Route path="/internshipcourse" exact component={Internships} />
                <Route path="/dg" exact component={ListDg} />
                <Route path="/batch" exact component={SelectBatch} />
              </Route>
            </Switch>
          </>
        )}
        <Route path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
