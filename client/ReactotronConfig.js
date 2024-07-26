import Reactotron, { asyncStorage, trackGlobalLogs } from "reactotron-react-native";
import { reactotronRedux } from 'reactotron-redux'

const reactotron = Reactotron
  .configure({ name: 'React Native Demo' })
  .use(asyncStorage())
  .useReactNative({ storybook: true,}) // add all built-in react native plugins
  .use(reactotronRedux()) //  <- here i am!
  
  .connect() //Don't forget about me!

  reactotron.onCustomCommand("test", () => console.log("This is an example"))
  reactotron.clear();
 export default reactotron 