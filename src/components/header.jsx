import { useContext} from "react";
import { ClockCircleOutlined } from "@ant-design/icons"
import Input from "antd/es/input/Input";
//context
import { SearchContext } from "../App";
//componets
import TabBar from "./tabs";
//style
import styles from './header.module.css'

export default function Header() {
    const {search, setSearch} = useContext(SearchContext)
    return ( 
        <div className={styles.mainContainer} >
            <div className={styles.headerContainer} >
                <ClockCircleOutlined style={{ fontSize: '150%'}} />
                <h3> نتایج زنده </h3>
            </div>
            <div className={styles.searchContainer} >
                <Input 
                    onChange={(event) => setSearch(event.target.value)} 
                    value={search} 
                    className={styles.searchInput} 
                    placeholder="جستجو بر اساس لیگ" 
                />
            </div>
            <TabBar/>
        </div>
     );
}