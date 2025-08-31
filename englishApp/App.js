import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useReducer } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { MyUserContext, MyDispatchContext } from "./configs/Context";
import MyUserReducer from "./reducers/MyUserReducer";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/User/Home";
import Profile from "./components/User/Profile";
import TopicDetail from "./components/User/TopicDetail";
import SubTopicDetail from "./components/User/SubTopicDetail";
import VocabularyDetail from "./components/User/VocabularyDetail";
import Video from "./components/User/Video";
import VideoDetail from "./components/User/VideoDetail";
import Progress from "./components/User/Progress";
import Quiz from "./components/User/Quiz";
import QuizDetail from "./components/User/QuizDetail";
import Toast from "react-native-toast-message";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ChangePassword from "./components/Auth/ChangePassword";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "HomeTab") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "ProfileTab") {
            iconName = focused ? "account" : "account-outline";
          } else if (route.name === "VideoTab") {
            iconName = focused ? "play-circle" : "play-circle-outline";
          } else if (route.name === "ProgressTab") {
            iconName = focused ? "chart-line" : "chart-line";
          } else if (route.name === "QuizTab") {
            iconName = focused ? "clipboard-list" : "clipboard-list";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#d32f2f",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="VideoTab"
        component={Video}
        options={{ tabBarLabel: "Video" }}
      />
      <Tab.Screen
        name="ProgressTab"
        component={Progress}
        options={{ tabBarLabel: "Progress" }}
      />
      <Tab.Screen
        name="QuizTab"
        component={Quiz}
        options={{ tabBarLabel: "Quiz" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={Profile}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [user, dispatch] = useReducer(MyUserReducer, null);

  return (
    <MyUserContext.Provider value={user}>
      <MyDispatchContext.Provider value={dispatch}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={user ? "Home" : "Login"}
            screenOptions={{ headerShown: false }}
          >
            {user ? (
              <>
                <Stack.Screen
                  name="Home"
                  component={TabNavigator}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TopicDetail"
                  component={TopicDetail}
                  options={{
                    headerShown: true,
                    title: "Chi tiết Topic",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="SubTopicDetail"
                  component={SubTopicDetail}
                  options={{
                    headerShown: true,
                    title: "Chi tiết SubTopic",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="VocabularyDetail"
                  component={VocabularyDetail}
                  options={{
                    headerShown: true,
                    title: "Chi tiết Vocabulary",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="VideoDetail"
                  component={VideoDetail}
                  options={{
                    headerShown: true,
                    title: "Chi tiết Video",
                    headerBackTitleVisible: false,
                  }}
                />
                <Stack.Screen
                  name="QuizDetail"
                  component={QuizDetail}
                  options={{
                    headerShown: true,
                    title: "Chi tiết Quiz",
                    headerBackTitleVisible: false,
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ForgotPassword"
                  component={ForgotPassword}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ChangePassword"
                  component={ChangePassword}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
  );
}
