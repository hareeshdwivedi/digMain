import "./App.css";
import Header from "./component/Header";
import Grid from "./component/Grid";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function App() {
  const [apiData, setApiData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [gridData, setGridData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const throttledFetchData = useRef(false);

  useEffect(() => {
    //On mount call the API
    getApiData();

    // Clean up function
    return () => {

      getApiData();
    }

  }, []);

  useEffect(() => {
    // Add the scroll event on update of apiData

    window.addEventListener("scroll", handleScroll);


    return () => {

      window.removeEventListener("scroll", handleScroll);
    };
  }, [apiData]);




  useEffect(() => {

    // Filter data when search value changes


    filterGridData();

    // **** Can call the debounce as per requirement ****

    //   const searchDebounce = setTimeout(()=>{
    //     filterGridData();

    //  }, 500);

    //  return ()=>{
    //   clearTimeout(searchDebounce)
    //  }


  }, [searchValue, gridData]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = (window.scrollY / scrollableHeight) * 100;

    // Next API call after 40% scroll
    if (scrollPercentage >= 40 && !throttledFetchData.current) {
      // Throttling
      window.removeEventListener("scroll", handleScroll);
      throttledFetchData.current = true;

      setTimeout(() => {
        getMoreData();
        throttledFetchData.current = false;
      }, 100);

    }
  };



  const getMoreData = () => {
    try {

      // Check if there are more data

      if (
        (Number(apiData?.["page-num-requested"]) *
          Number(apiData?.["page-size-requested"]) <
          Number(apiData?.["total-content-items"]))


      ) {
        getApiData(Number(apiData?.['page-num-requested']) + 1);
      }
    } catch (Error) {
      console.log("Error in get more data", Error);
    }
  };

  const getApiData = async (page = 1) => {
    try {
      // Call the API
      const response = await axios.get(
        `https://test.create.diagnal.com/data/page${page}.json`
      );

      if (response.status === 200) {

        // Response is ok, update the state
        setApiData(response?.data?.page || null);

        if (response?.data?.page?.["content-items"]?.content?.length > 0) {
          setGridData((gridDataLocal) => [
            ...gridDataLocal,
            ...response?.data?.page?.["content-items"]?.content,
          ]);
        }
      }
    } catch (Error) {
      console.log("Error in API calling");
    }
  };

  const filterGridData = () => {
    // Filter the api data


    if (searchValue && gridData?.length) {
      setFilteredData(
        gridData.filter((poster) =>
          poster?.name?.toLowerCase().includes(searchValue?.toLowerCase())
        )
      );
    } else {
      setFilteredData(gridData);
    }

  };

  return (
    <>
      <Header
        title={apiData?.title}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Grid data={filteredData} />
    </>
  );
}

export default App;
