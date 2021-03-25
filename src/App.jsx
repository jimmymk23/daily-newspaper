// Import Libraries
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// Import Styles
import './sass/main.sass';
// Import Components
import ProtectedRoute from './components/ProtectedRoute';
import Nav from './components/Nav';
import HomeSection from './components/HomeSection';
import Post from './components/post/Post';
import Edit from './components/post/Edit';
import Compose from './components/post/Compose';
import Drafts from './components/Drafts';
import SignUpPage from './components/SignUpPage';
import SignInPage from './components/SignInPage';
import Account from './components/Account';
import Footer from './components/Footer';
import PromptsDash from './components/prompt/PromptsDash';
import PageNotFount from './components/PageNotFount';

export default function App() {
	// Handlers
	const logoutHandler = () => {
		localStorage.removeItem('token');
	};

	return (
		<div id='app'>
			<Router>
				<Nav logoutHandler={logoutHandler} />
				<Switch>
					<Route path='/' exact render={() => <HomeSection />} />
					<Route path='/post/:id' exact render={() => <Post />} />
					<ProtectedRoute
						path='/post/edit/:id'
						render={() => <Edit />}
					/>
					<ProtectedRoute
						path='/compose'
						render={() => <Compose />}
					/>
					<ProtectedRoute path='/drafts' render={() => <Drafts />} />
					<ProtectedRoute
						path='/prompts'
						render={() => <PromptsDash />}
					/>
					<Route path='/signup' render={() => <SignUpPage />} />
					<Route path='/login' render={() => <SignInPage />} />
					<ProtectedRoute
						path='/account'
						render={() => <Account />}
					/>
					<Route path='/404' render={() => <PageNotFount />} />
					<Route render={() => <PageNotFount />} />
				</Switch>
				<Footer />
			</Router>
		</div>
	);
}
