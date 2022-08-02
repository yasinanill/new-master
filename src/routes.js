import AuthLayout from "./pages/auth";
import Home from './pages/home'

import MainLayout from "./pages/layout";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/auth/login";
import Register from "./pages/auth/Register";
import ProfileLayout from "./pages/profile/profile";
import ProfilePosts from "./pages/profile/posts";
import ProfileTagged from "./pages/profile/tagget";
import Logout from "./pages/logout";
import Inboxlayout from "./pages/inbox";
import Inbox from "./pages/inbox/inbox";
import Chat from "./pages/inbox/chat";




const routes = [
  {
    path: "/",
    element: <MainLayout />,
    auth: true,
    children: [
      
      {
        index : true,
        element: <Home />

    },
    {
      path: 'logout',
      element: <Logout  />
    },
    {
        path: ":username",
        element: <ProfileLayout />,

        children: [ 
            {
                index: true,
              
                element: <ProfilePosts/>
            },
            {
            
              path: "tagged",
              element: <ProfileTagged/>
          },
        ]
    },
    {
      path: '/inbox',
      element: <Inboxlayout />,
      children: [
          {
            index: true,
            element: <Inbox />
  
          },
          {
						path: ':conversationId',
						element: <Chat />
					}
        ]
    },
  
  
  ],

  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
        {
          path: 'register',
          element: <Register />

        }



    ]




  },


];

 const authCheck = routes => routes.map(route => {
 	if (route?.auth) {
 		route.element = <PrivateRoute>{route.element}</PrivateRoute>
 	}
 	if (route?.children) {
 		route.children = authCheck(route.children)
 	}
 	return route
 })

export default  authCheck(routes)