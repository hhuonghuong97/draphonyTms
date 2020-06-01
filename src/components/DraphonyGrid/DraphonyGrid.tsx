import React, { useState } from "react";
import MaterialTable from "material-table";

interface IProps {
    name: string;
    items: Array<{
        id: string,
        name: string,
        description: string
    }>
}

export const DraphonyGrid = (props: IProps) => {
    const [count, setCount] = useState(0);
    const [state, setState] = React.useState({
        columns: [
            { title: 'ID', field: 'id' },
            { title: 'Name', field: 'name' },
            { title: 'description', field: 'description' },
            {
                title: 'Birth Place',
                field: 'birthCity',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
            },
        ],
        data: [
            { name: 'Huong Nguyen', description: 'Baran', id: 1987, birthCity: "Hung Yen" },
            {
                name: 'Zerya Betül',
                description: 'Baran',
                id: 2017,
                birthCity: "Ha Noi",
            },
        ],
    });
    return (
        <>
            <MaterialTable
                title="Editable Example"
                columns={state.columns}
                data={props.items}
                editable={{
                    onRowAdd: (newData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: (oldData) =>
                        new Promise((resolve) => {
                            setTimeout(() => {
                                resolve();
                                setState((prevState) => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
        </>
    )
}
