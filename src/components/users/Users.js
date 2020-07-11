import PropTypes from "prop-types";
import React from "react";
import Spinner from "../layout/Spinner";
import UserItems from "./UserItems";

const Users = ({users, loading}) => {
    if (loading) {
        return <Spinner />;
    } else {
        return (
            <div style={userStyle}>
                {users.map(user => (
                    <UserItems key={user.id} user={user} />
                ))}
            </div>
        );
    }
};

const userStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gridGap: "1rem"
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
};
export default Users;
