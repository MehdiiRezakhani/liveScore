import {useContext} from "react";
import { Collapse} from "antd";
import moment from "jalali-moment"
//context
import {GamesContext, SearchContext} from "../App";
//style
import styles from "./container.module.css";

const { Panel } = Collapse;

export default function Container() {
    moment.locale('fa', { useGregorianParser: true });  
    const getTehranTime = (h ,m) => {
        const iranH = +h + 3 > 24 ? (+h+3)-24 : +h+3
        const iranM = +m + 30 > 60 ? (+m+30) - 60 : +m+30 == 60 ? "00" : +m+30
        return `${iranH}:${iranM}`
    }

    const {search} = useContext(SearchContext)
    const data = useContext(GamesContext)
    const filterData = data?.all?.filter((item) => item?.name.includes(search))

    return ( 
        <div className={styles.container}>
            {
                filterData?.map((item) => {
                    return(
                        <Collapse key={item.api_id} className={styles.accordion}>
                            <Panel  header={
                                <div  className={styles.accordionTitle}  >
                                    <img src={item?.logo} alt="league logo" />
                                    <p> {item?.name} </p>
                                </div>
                            } key="1">
                                {
                                    item?.fixtures?.map(game => {
                                        return(
                                            <div key={game?.api_id} className={styles.accordionDescriptionContainer} >
                                                <p> {game?.away?.name} </p>
                                                <img src={game?.away?.logo} alt="away team logo" />
                                                <p> {getTehranTime(moment(game?.start_time).format().split("T")[1].split("+")[0].split(":")[0] ,moment(game?.start_time).format().split("T")[1].split("+")[0].split(":")[1])} </p>
                                                <img src={game?.home?.logo} alt="away team logo" />
                                                <p> {game?.home?.name} </p>
                                            </div>
                                        )
                                    })

                                }
                            </Panel>
                        </Collapse>
                    )
                })
            }
        </div>
     );
}
 