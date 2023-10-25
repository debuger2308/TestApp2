"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react";

const PaginationControl = ({ paginPoint, setPaginPoinit, isLoadLoginReq }:
    { paginPoint: number, setPaginPoinit: Dispatch<SetStateAction<number>>, isLoadLoginReq: boolean }) => {

    const [quantityPoints, setQuantityPoints] = useState(0)
    const [pointsArray, setPointsArray] = useState<number[]>([])

    useEffect(() => {
        const points = []
        for (let i = 1; i <= quantityPoints; i++) points.push(i)
        setPointsArray([...points]);
    }, [quantityPoints])

    useEffect(() => {
        async function GetPointsQ() {
            const pagesCount = []

            fetch(`https://technical-task-api.icapgroupgmbh.com/api/table/`)
                .then(res => res.json())
                .then(result => {
                    setQuantityPoints(Math.ceil(result.count / 10 - 1))
                })
        }
        GetPointsQ()
    }, [])

    return (
        <div className="pagination">
            {pointsArray.map((point, id) => {
                return <button
                    key={id}
                    className={point === paginPoint && !isLoadLoginReq ? "pagination__point pagination__point--active" : "pagination__point"}
                    onClick={() => {
                        setPaginPoinit(point)
                    }}
                >
                    {point.toString()}
                </button>
            })}
        </div>
    );
}

export default PaginationControl;