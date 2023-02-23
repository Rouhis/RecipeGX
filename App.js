import {MainProvider} from './contexts/Maincontext';
import Navigator from './navigators/Navigator';
export default function App() {
  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
}
