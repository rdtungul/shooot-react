import "./App";
import RegisterImg from "./formik/assets/register.jpg";
import { SignUp } from "./formik/components/SignUp";

function App() {
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-5">
          <SignUp />
        </div>
        <div className="col-md-7 my-auto">
          <img src={RegisterImg} alt="HeroImg" className="img-fluid w-50" />
        </div>
      </div>
    </div>
  );
}

export default App;
