import Header from "./components/Header";
import DashboardCards from "./components/DashboardCards";
import SearchBar from "./components/SearchBar";
import FilterButtons from "./components/FilterButtons";
import PostList from "./components/PostList";
import Statistics from "./components/Statistics";
import RenderCounter from "./components/RenderCounter";
import ReduxStatePanel from "./components/ReduxStatePanel";

function App() {

  return (

    <div className="container">

      <Header />

      <DashboardCards />

      <SearchBar />

      <FilterButtons />

      <PostList />

      <Statistics />

      <RenderCounter />

      <ReduxStatePanel />

    </div>

  );
}

export default App;