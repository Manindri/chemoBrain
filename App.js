//import { StatusBar } from 'expo-status-bar';
//import { StyleSheet, Text, View } from 'react-native';
//import Todos from "./src/components/Todo";
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

//import users
import AddUser from "./src/components/AddUser";
import ViewUser from "./src/components/ViewUser";
import UpdateUser from "./src/components/UpdateUser";
import UserList from "./src/components/UserList";

//import articles
import AddArticle from "./src/components/AddArticle";
import ArticleList from "./src/components/ArticleList";
import ViewArticle from "./src/components/ViewArticle";
import UpdateArticle from "./src/components/UpdateArticle";
import ArticleMainPage from "./src/components/ArticleMainPage";

//import events
import AddEvent from "./src/components/AddEvent";
import EventList from "./src/components/EventList";
import UpdateEvent from "./src/components/UpdateEvent";
import ViewEvent from "./src/components/ViewEvent";
import EventMainPage from "./src/components/EventMainPage";

//import community
import AddCommunity from "./src/components/AddCommunity";
import CommunityList from "./src/components/CommunityList";
import UpdateCommunity from "./src/components/UpdateCommunity";
import ViewCommunity from "./src/components/ViewCommunity";
import CommunityMainPage from "./src/components/CommunityMainPage";

//import donate
import AddDonate from "./src/components/AddDonate";
import DonateList from "./src/components/DonateList";
import UpdateDonate from "./src/components/UpdateDonate";
import ViewDonate from "./src/components/ViewDonate";
import DonateMainPage from "./src/components/DonateMainPage";

//import homepage
import HomePage from "./src/components/HomePage";
import MainPage from "./src/components/MainPage";


const Stack = createStackNavigator();

export default function App() {

  //const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* { user ? (
          <Stack.Screen name="List">
            {props => <List {...props} extraData={user} />}
          </Stack.Screen>
        ) : ( */}
        <>
          <Stack.Screen name="Pure Drop" component={HomePage} />
          <Stack.Screen name="Main Page" component={MainPage} />
          
          {/* Article Routes */}
          <Stack.Screen name="Add Article" component={AddArticle} />
          <Stack.Screen name="Article List" component={ArticleList} />
          <Stack.Screen name="View Article" component={ViewArticle} />
          <Stack.Screen name="Update Article" component={UpdateArticle} />
          <Stack.Screen name="Article Main" component={ArticleMainPage} />

          {/* Event Routes */}
          <Stack.Screen name="Add Event" component={AddEvent} />
          <Stack.Screen name="Event List" component={EventList} />
          <Stack.Screen name="Update Event" component={UpdateEvent} />
          <Stack.Screen name="View Event" component={ViewEvent} />
          <Stack.Screen name="Event Main" component={EventMainPage} />

          {/* Community Routes */}
          <Stack.Screen name="Add Community" component={AddCommunity} />
          <Stack.Screen name="Community List" component={CommunityList} />
          <Stack.Screen name="Update Community" component={UpdateCommunity} />
          <Stack.Screen name="View Community" component={ViewCommunity} />
          <Stack.Screen name="Community Main" component={CommunityMainPage} />

          {/* Donate Routes */}
          <Stack.Screen name="Add Donate" component={AddDonate} />
          <Stack.Screen name="Donate List" component={DonateList} />
          <Stack.Screen name="Update Donate" component={UpdateDonate} />
          <Stack.Screen name="View Donate" component={ViewDonate} />
          <Stack.Screen name="Donate Main" component={DonateMainPage} />

          {/* User Routes */}
          <Stack.Screen name="Add User" component={AddUser} />
          <Stack.Screen name="Update User" component={UpdateUser} />
          <Stack.Screen name="View User" component={ViewUser} />
          <Stack.Screen name="User List" component={UserList} />
          {/* <Stack.Screen name="Registration" component={RegistrationScreen} /> */}
        </>

      </Stack.Navigator>
    </NavigationContainer>
    //<Add />

  );
}

