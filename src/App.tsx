import Body from "./Body";
import { Provider } from "react-redux";
import appStore from "./utils/store/appStore";

export default function App() {
  return (
    <Provider store={appStore}>
      <Body />
    </Provider>
  );
}
