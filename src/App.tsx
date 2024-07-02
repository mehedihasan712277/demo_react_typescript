import Body from "./Todo-App-1/Body"
import BasicTabs from "./Todo-App-1/Tabs";
import TaskProvider from "./Todo-App-1/TaskProvider";

const App = () => {
  return (
    <div className="bg-slate-200 min-h-screen px-4 py-8">
      {/* -----------------todo app----------- */}
      <TaskProvider>
        <Body></Body>
        <BasicTabs></BasicTabs>
      </TaskProvider>
    </div>
  )
}

export default App