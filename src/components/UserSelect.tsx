import React from "react";
import { User } from "../interfaces/user";
import { Form } from "react-bootstrap";
import { userSelect } from "../App";
import { UserListPair } from "../interfaces/UserListPair";

// export function UserSelect({
//     users,
//     setUser
// }: {
//     users: User[];
//     setUser: React.Dispatch<React.SetStateAction<User>>;
// }): JSX.Element {
//     function setCurrentUser(event: React.ChangeEvent<HTMLSelectElement>) {
//         setUser(users[parseInt(event.target.value)]);
//     }
//     return (
//         <div>
//             <Form.Group controlId="userSelect">
//                 <Form.Label>Select Your Role:</Form.Label>
//                 <Form.Select onChange={setCurrentUser}>
//                     {users.map((currUser: User, index) => (
//                         <option key={index} value={index}>
//                             {currUser.name}
//                         </option>
//                     ))}
//                 </Form.Select>
//             </Form.Group>
//         </div>
//     );
// }

export function UserSelect({
    users,
    setUserMovies,
    userListPairs,
    setUser,
    currUser: selectedUser
}: userSelect): JSX.Element {
    function setCurrentUser(event: React.ChangeEvent<HTMLSelectElement>) {
        setUser(users[parseInt(event.target.value)]);
        const currUserMovies = userListPairs.filter(
            (pairs: UserListPair) => selectedUser.name === pairs.username
        );
        const currUserList = currUserMovies[0].userList;
        setUserMovies(currUserList);
    }
    return (
        <div>
            <Form.Group controlId="userSelect">
                <Form.Label>Select Your Role:</Form.Label>
                <Form.Select onChange={setCurrentUser}>
                    {users.map((currUser: User, index) => (
                        <option key={index} value={index}>
                            {currUser.name}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
        </div>
    );
}
