import React, { Component, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "bootstrap-icons/font/bootstrap-icons.css";
import '../style.css';
import { ShimmerPostList } from "react-shimmer-effects";

const ResCard = (props) => {

    const { cloudinaryImageId, name, cuisines, locality, costForTwo, avgRating } = props;
    return (
        <>
            <div className="card">
                <img src={"https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" + cloudinaryImageId} alt="" />
                <p className="resName">{name}</p>
                <p className="cuisinesName">{cuisines.join(" ")}</p>
                <p className="resLocality">{locality}</p>
                <p className="costForTwo">{costForTwo}</p>
                <p className="avgRating"><i className="bi bi-star-fill"></i>{avgRating}</p>
            </div>
        </>
    )
};

const Res = () => {
    const [dataList, setDataList] = useState([]);
    const [searchData, setsearchData] = useState(" ")
    useEffect(() => { fetchData() }, []);

    const fetchData = async () => {
        const FetchedData = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=25.595128&lng=85.162572&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        const resList = await FetchedData.json();
        const data = resList.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setDataList(data);
    }
    console.log(dataList);
    console.table(dataList);
    return (
        <>
            <Header />

            <div className="headerData">
                <div className="filterbtns">
                    <button onClick={
                        () => {
                            let filtered = dataList.filter((info) => info.info.avgRating > 4.1)
                            setDataList(filtered);
                        }
                    }>
                        Rating 4.0+
                    </button>
                    <button onClick={() =>
                        window.location.reload()}>
                        All Resturents..
                    </button>
                    <button>ssss</button>
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search..."

                    value={searchData}
                    onChange={
                        (e) => {
                            const data = e.target.value;
                            setsearchData(data)
                            const searchFilter = dataList.filter((name) =>
                                name.info.name.toLowerCase().includes(data.toLowerCase())
                            )
                            setDataList(searchFilter)
                            console.log(e.target.value)
                        }
                    }
                />
            </div>
            <h2 >Resturents near me</h2>
            {
            dataList.length==0?
            <ShimmerPostList postStyle="STYLE_FOUR" col={4} row={4} gap={30} />:
            <div className="containers">
                {
                    dataList.map((data) => <ResCard{...data.info} />)
                }
            </div>
            }
           
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Res />);


