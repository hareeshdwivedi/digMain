import React from "react"

const Grid = React.memo(({ data }) => {


    const handleImageLoadError = (e) => {
        // Placeholder image URL if any error
        e.target.src = 'https://test.create.diagnal.com/images/placeholder_for_missing_posters.png';
    };

    return (<>

        <section>

            {data?.length ?

                <ul className="grid-list-wrapper flex">

                    {data.map((element, index) => (

                        <li key={index}>
                            <div className="image-wrapper">
                                <img onError={handleImageLoadError} src={`https://test.create.diagnal.com/images/${element?.['poster-image']}`} alt={element?.['poster-image']} />
                            </div>
                            <div className="title-wrapper">
                                {element?.name || "N/A"}
                            </div>

                        </li>
                    ))}
                </ul>

                :

                <div className="no-data-found">No data found</div>}
        </section>





        <style jsx="true">{`

        .grid-list-wrapper{
            
            list-style:none;
            font-weight:300;
            padding: .5rem;
            margin-top:0;
            margin-bottom: 0;
            }

            .grid-list-wrapper>li{

            flex: 0 0 33.333%;
            max-width: 33.333%;
            padding-left:.5rem;
            padding-right:.5rem;

            padding-bottom:2.5rem;

            .image-wrapper{
            
            img{
            aspect-ratio: 2 / 3;
            object-fit: cover;
            width:100%;
            }

            }

             .title-wrapper{
             
             padding-top:.4rem;
                     white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
             }
            
            
            }


     .no-data-found{
            padding-top:1.5rem;
             text-align:center;
         }
           

   
    `
        }

        </style>


    </>)

})

export default Grid