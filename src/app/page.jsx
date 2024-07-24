import SearchBar from "./components/SearchBar/SearchBar"

const HomePage = () => {
    return (
        <main className="flex flex-col ">
            <div className="searchContainer w-[60%] m-auto">
                <SearchBar />
            </div>
            <p>Home page under works</p>
        </main>
    )
}

export default HomePage