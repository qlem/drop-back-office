import * as React from "react";
import {USERS} from "../../queries";
import {useQuery} from "@apollo/react-hooks";
import {AUTH_TOKEN} from "../../constants";

export default function TopUser (props) {

    const { loading: usersLoading, error: usersError, data: usersData } = useQuery(USERS);

    const _renderUserTabRow = () => {
        if (usersData) {
            let datas = usersData.users;
            datas.sort((a, b) => {return b.drops.length - a.drops.length});
            return datas.map((user, index) => {
                return (
                    <tr className="stripe-dark" key={user.id}>
                        <td className="pa3">{user.username}</td>
                        <td className="pa3">{user.email}</td>
                        <td className="pa3">{user.drops.length}</td>
                    </tr>
                );
            });
        }

    };

    return(
        <div className="pa4">
            <h2 className="f3 f2-m f1-l fw2 black-90 mv3 tc">Top Dropers Users</h2>
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                    <thead>
                    <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Username</th>
                        <th className="fw6 tl pa3 bg-white">Email</th>
                        <th className="fw6 tl pa3 bg-white">Drops</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
                    {_renderUserTabRow()}
                    </tbody>
                </table>
            </div>
        </div>

    )
};