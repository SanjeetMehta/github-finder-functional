import axios from "axios";
import React, {useState, Fragment, useEffect} from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Search from "./components/users/Search";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Alert from "./components/layout/Alert";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/pages/About";
const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);
    // Search github users.
    const searchUsers = async text => {
        setLoading(true);
        const result = await axios.get(
            `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUsers(result.data.items);
        setLoading(false);
    };

    // Clear users from state.
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // Get Single user.
    const getUser = async username => {
        setLoading(true);
        const result = await axios.get(
            `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setUser(result.data);
        setLoading(false);
    };

    // Get users repos.
    const getUserRepos = async username => {
        setLoading(true);
        const result = await axios.get(
            `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
        );
        setRepos(result.data);
        setLoading(false);
    };
    // Set alert.
    const showAlert = (message, type) => {
        setAlert({msg: message, type: type});
        setTimeout(() => {
            setAlert(null);
        }, 5000);
    };

    useEffect(() => {
        setLoading(true);

        async function fetchData() {
            const result = await axios.get(
                `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
            );
            setUsers(result.data);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="container">
                    <Alert alert={alert} />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={props => (
                                <Fragment>
                                    <Search
                                        searchUsers={searchUsers}
                                        clearUsers={clearUsers}
                                        showClear={users.length ? true : false}
                                        setAlert={showAlert}
                                    />
                                    <Users loading={loading} users={users} />
                                </Fragment>
                            )}
                        />

                        <Route exact path="/about" component={About} />
                        <Route
                            exact
                            path="/user/:login"
                            render={props => (
                                <User
                                    {...props}
                                    getUser={getUser}
                                    getUserRepos={getUserRepos}
                                    repos={repos}
                                    user={user}
                                    loading={loading}
                                />
                            )}
                        />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
