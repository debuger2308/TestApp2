"use client"

import { tableData } from "@/Types/tableData";
import PaginationControl from "@/components/PaginationControl/PaginationControl";
import TavbleRow from "@/components/TableRow/TableRow";
import Link from "next/link";
import { useEffect, useState } from "react";



const Table = () => {
    const [isUserAuth, setIsUserAuth] = useState({})




    const [isAuth, setIsAuth] = useState(false)
    const [isLoadLoginReq, setIsLoadLoginReq] = useState(true)

    const [tableData, setTableData] = useState<tableData[]>([])
    const [paginCount, setPaginCount] = useState(1)



    async function getTableData() {
        fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/?limit=10&offset=${10 * paginCount}`)
            .then(res => res.json())
            .then(result => {
                setTableData(result.results)
            })
    }

    useEffect(()=>{
        setIsUserAuth(JSON.parse(localStorage.getItem("TestApp/login-info") || ''))
    },[])

    useEffect(() => {
        getTableData()
    }, [paginCount])

    useEffect(() => {
        async function isAuthHandler() {
            const res = await fetch('https://technical-task-api.icapgroupgmbh.com/api/login/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(isUserAuth)
            },)
            if (res.status === 200) {
                setIsAuth(true)
                setIsLoadLoginReq(false)
            }

            else {
                setIsAuth(false)
                setIsLoadLoginReq(false)
            }
        }


        isAuthHandler()
    }, [])

    return (
        <main className="main-table">
            {isLoadLoginReq
                ? <div className="login__loading">
                    <span className={isLoadLoginReq ? "loader loader--active login__loader" : "loader login__loader"}></span>
                    <h1 className="loading__title">Loading...</h1>
                </div>
                : isAuth
                    ? <>
                        <table className="table">
                            <thead>
                                <tr className="table-row">
                                    <td className="table-cell"></td>
                                    <td className="table-cell">Name</td>
                                    <td className="table-cell">Email</td>
                                    <td className="table-cell">Birthday date</td>
                                    <td className="table-cell">Phone</td>
                                    <td className="table-cell">Address</td>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.map((item) => {
                                    return <TavbleRow tableData={item} key={item.id} />
                                })}
                            </tbody>
                        </table>
                        <div className="table__pagination">
                            <PaginationControl paginPoint={paginCount} setPaginPoinit={setPaginCount} isLoadLoginReq={isLoadLoginReq} />
                        </div>
                    </>
                    : <div className="table__authed">
                        <h1>You are not authenticated</h1>
                        <Link href="/" className="table__authed-link">To auth page <span className="table-link__arrow">{"->"}</span></Link>
                    </div>
            }





        </main>


    );
}

export default Table;