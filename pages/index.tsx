import Head from 'next/head'
import SearchBox from "../components/SearchBox";
import { WiDayCloudyWindy } from "react-icons/wi";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App - Next</title>
      </Head>

      <div className="home">
        <div className="container">
          <div className="home-icon">
            <WiDayCloudyWindy/>
          </div>
          <h1 className="home-title">Discover the Weather in Your City from Venezuela</h1>
          <SearchBox placeholder="Search for a city..." />
        </div>
      </div>
    </div>
  );
}