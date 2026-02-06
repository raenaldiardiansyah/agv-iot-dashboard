import { Route, Switch, Redirect } from "wouter";
import Home from "./pages/Home";
import AuthPage from "./pages/auth";
import Dashboard from "./pages/dashboard";
import { getCurrentUser } from "./lib/auth";

// Protected Route Component
function ProtectedRoute({ component: Component, ...rest }: any) {
  // Pastikan hanya dijalankan di browser
  if (typeof window === 'undefined') {
    return null;
  }
  
  const currentUser = getCurrentUser();
  
  if (!currentUser) {
    return <Redirect to="/auth" />;
  }
  
  return <Component {...rest} />;
}

function App() {
  return (
    <Switch>
      {/* Home sebagai halaman utama */}
      <Route path="/" component={Home} />
      
      {/* Auth page - hanya login */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Protected Dashboard */}
      <Route path="/dashboard">
        {(params) => <ProtectedRoute component={Dashboard} {...params} />}
      </Route>
      
      {/* Fallback - redirect ke home */}
      <Route>
        {() => <Redirect to="/" />}
      </Route>
    </Switch>
  );
}

export default App;