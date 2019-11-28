import * as React from "react";
import {LASTDROPPED, USERS} from "../../queries";
import {useQuery} from "@apollo/react-hooks";


export default function LastDrops (props) {

    const {loading: droppedLoading, error: droppedError, data} = useQuery(LASTDROPPED);


    const _renderUserTabRow = () => {
        if (data) {
            return data.dropped.map((drop, index) => {
                let date = new Date(drop.createdAt);
                return (
                    <tr className="stripe-dark" key={drop.id}>
                        <td className="pa3" >{drop.text}</td>
                        <td className="pa3">{drop.author.username}</td>
                        <td className="pa3">{ date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()}</td>
                    </tr>
                );
            });
        }

    };

    return(
        <div className="pa4">
            <h2 className="f3 f2-m f1-l fw2 black-90 mv3 tc">Last Drops</h2>
            <div className="overflow-auto">
                <table className="f6 w-100 mw8 center" cellSpacing="0">
                    <thead>
                    <tr className="stripe-dark">
                        <th className="fw6 tl pa3 bg-white">Text</th>
                        <th className="fw6 tl pa3 bg-white">Username</th>
                        <th className="fw6 tl pa3 bg-white">Date</th>
                    </tr>
                    </thead>
                    <tbody className="lh-copy">
                    {_renderUserTabRow()}
                    </tbody>
                </table>
            </div>
        </div>

    )
}