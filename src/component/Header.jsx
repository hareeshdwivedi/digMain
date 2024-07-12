import React, { useEffect, useState } from "react"

const Header = React.memo(({ title, searchValue, setSearchValue }) => {


    const [searchBarOpen, setSearchBarOpen] = useState(false);

    useEffect(() => {
        // Updating the search value on search bar toggle
        setSearchValue('')
    }, [searchBarOpen])


    return (<>

        {/* Need to get height dynamically */}
        <header style={{ minHeight: "57px" }}>
            <div className="flex align-center header-wrapper">



                <div className="left-side-wrapper flex align-center">

                    {/* Back button */}

                    <div className="back-btn" onClick={() => setSearchBarOpen(false)}>
                        <img src="https://test.create.diagnal.com/images/Back.png" alt="back-btn" />
                    </div>

                    {searchBarOpen ?
                        <input className="search-input" maxLength={30} autoFocus={true} type="text" value={searchValue} placeholder="Type to search" onChange={(ev) => setSearchValue(ev?.target?.value)} /> :
                        <p className="title-text">{title}</p>
                    }

                </div>


                {/* search bar */}

                {!searchBarOpen && <div className="search-bar-wrapper" onClick={() => setSearchBarOpen(true)}>
                    <img src="https://test.create.diagnal.com/images/search.png" alt="back-btn" />




                </div>}

            </div>

        </header>

        <style jsx="true">{`

    .header-wrapper{
    background: url('https://test.create.diagnal.com/images/nav_bar.png') top / cover no-repeat;
    margin-bottom: 15px;
    padding:15px;
    padding-bottom:50px;
    position:fixed;
    left:0;
    right:0;
    top:0;


    .search-input{

        margin-left: 1rem;
        min-height: 1.50rem;
        padding: .1rem 0.5rem;
        flex: 1;
        border-radius: .25rem;
        border: none;
        outline: none;
    }


    .left-side-wrapper{        
    flex:1;
   
    }

    .back-btn img{

    width:4.5vw;
    
    }

    .title-text{
        font-size:1.4rem;
     padding-left:15px;
    }

    .search-bar-wrapper img{
    width:4.5vw;
     margin-left:15px;
    }


    
    }  
    
    `
        }

        </style>


    </>)

})

export default Header