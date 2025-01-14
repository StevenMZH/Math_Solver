import { useState } from "react";

export function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            const response = await fetch(`/dataBase/search?q=${encodeURIComponent(query)}`);
            const data = await response.json();
            setResults(data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <div className="searchBar-container">
            <form onSubmit={handleSearch}>
                <div className="flexCenter searchContainer">
                    <input
                        type="text"
                        className="searchBar courseSearchBar"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search Courses, Classes, Exercises..."
                    />
                    <div className="button-container">
                        <button type="submit" className="searchButton">
                            <img className='searchIcon' src='../../../public/images/search_Icon.png' alt="search" />
                        </button>
                    </div>
                </div>
            </form>

            <div>
                {results.length > 0 && (
                    <ul>
                        {results.map((result) => (
                            <li key={result.id}>
                                <strong>{result.name}</strong>
                                <p>{result.description}</p>
                            </li>
                        ))}
                    </ul>
                )
                }
            </div>

            <style>{`
                .searchContainer {
                    width: 100%;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    position: relative;
                    width: fit-content; /* Ajusta el ancho al contenido */
                }

                .searchBar {
                    width: clamp(280px,30vw, 600px);
                    font-size: 12px;
                    border-radius: 20px;
                    padding: 8px 15px;
                    box-sizing: border-box;
                }

                .button-container{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: end;
                    align-items: center;
                }
                .searchButton {
                    top: 0;
                    position: absolute;
                    border: none;
                    background-color: #00000000;
                    border-radius: 50%;
                    padding: 6px;
                    padding-bottom: 3px;
                    margin-right: 3px;
                    margin-top: 2px;
                    cursor: pointer;
                    align-items: center;
                    justify-content: center;
                }
                .searchButton:hover {
                    background-color: #00000022;
                }

                .searchIcon {
                    width: 14px;
                    height: 14px;
                }
            `}</style>
        </div>
    );
}

export default SearchBar;
