"use client"
import { tableData } from "@/Types/tableData";
import { useState } from "react";


const TavbleRow = ({ tableData }: { tableData: tableData }) => {

    const [editHandle, setEditHadle] = useState(false)

    const [dataName, setDataName] = useState(tableData.name)
    const [dataMail, setDataMail] = useState(tableData.email)
    const [dataBirthday, setDataBirthday] = useState(tableData.birthday_date)
    const [dataPnone, setDataPhone] = useState(tableData.phone_number)
    const [dataAddress, setDataAddress] = useState(tableData.address)


    return (
        <tr className="table-row">
            <td className="table-cell table-btns">
                {editHandle
                    ? <button
                        className="table-button"
                        onClick={async () => {

                            if (!dataBirthday.match(/\d\d\d\d-\d\d-\d\d/)) {
                                alert('Date must be in format: YYYY-MM-DD')
                            }
                            else if (!dataMail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
                                alert('Wrong format for email')
                            }
                            else {
                                const res = await fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/${tableData.id}/`, {
                                    method: "PATCH",
                                    body: JSON.stringify({
                                        name: dataName,
                                        email: dataMail,
                                        birthday_date: "2023-10-24",
                                        phone_number: dataPnone,
                                        address: dataAddress
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                if (res.status !== 200) {
                                    alert("Sorry, unexpected error")
                                }
                                setEditHadle(false)

                            }

                        }}
                    >
                        save
                    </button>
                    : <button
                        className="table-button"
                        onClick={() => {
                            setEditHadle(true)
                        }}
                    >
                        edit
                    </button>
                }
            </td>
            <td className="table-cell">
                {editHandle ?
                    <input
                        className="table-input"
                        type="text"
                        value={dataName}
                        onChange={(event) => {
                            setDataName(event.currentTarget.value)
                        }}
                        maxLength={255}
                        minLength={1}
                    />
                    :
                    <p>{dataName}</p>
                }


            </td>
            <td className="table-cell">
                {editHandle ?
                    <input
                        className="table-input"
                        type="text"
                        value={dataMail}
                        onChange={(event) => {
                            setDataMail(event.currentTarget.value)
                        }}
                        maxLength={254}
                        minLength={1}
                    />
                    :
                    <p>{dataMail}</p>
                }
            </td>
            <td className="table-cell">
                {editHandle ?
                    <input
                        className="table-input"
                        type="text"
                        value={dataBirthday}
                        onChange={(event) => {
                            setDataBirthday(event.currentTarget.value)
                        }}
                        maxLength={20}
                        minLength={1}
                    />
                    :
                    <p>{dataBirthday}</p>
                }
            </td>
            <td className="table-cell">
                {editHandle ?
                    <input
                        className="table-input"
                        type="text"
                        value={dataPnone}
                        onChange={(event) => {
                            setDataPhone(event.currentTarget.value)
                        }}
                    />
                    :
                    <p>{dataPnone}</p>
                }
            </td>
            <td className="table-cell">
                {editHandle ?
                    <input
                        className="table-input"
                        type="text"
                        value={dataAddress}
                        onChange={(event) => {
                            setDataAddress(event.currentTarget.value)
                        }}
                        minLength={1}
                    />
                    :
                    <p>{dataAddress}</p>
                }
            </td>

        </tr>
    );
}

export default TavbleRow;