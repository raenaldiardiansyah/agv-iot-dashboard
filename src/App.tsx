import { Switch, Route } from "wouter";
import Splash from "./pages/splash";
import AccessMode from "./pages/access";
import AuthPage from "./pages/auth";
import Dashboard from "./pages/dashboard";

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/access" component={AccessMode} />
      <Route path="/auth/:mode" component={AuthPage} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/:rest*" component={() => <div>404 Not Found</div>} />
    </Switch>
  );
}