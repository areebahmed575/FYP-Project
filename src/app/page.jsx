import SearchBar from "./components/SearchBar/SearchBar"
import TrendingBox from "./components/TrendingBox/TrendingBox"

const HomePage = () => {
    return (
        <main className="flex flex-col ">
            <div className="searchContainer flex justify-center">
                <SearchBar />
            </div>
            <h1 className="text-[32px] font-bold mt-[40px]">Tranding Destinations</h1>
            <p className="text-gray-400">Most popular choices for travellers</p>
            <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
            </div>
            <h1 className="text-[32px] font-bold mt-[40px]">City Hours</h1>
            <p className="text-gray-400">Most popular cities for travellers</p>
            <div className="trendingContainer flex items-center justify-between flex-wrap my-[30px]">
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
                <TrendingBox />
            </div>
        </main>
    )
}

export default HomePage