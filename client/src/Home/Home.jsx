import { useEffect, useState } from "react";

const RESULT_CAP = 3;

// get all data (i.e. first 100),
// iterate through and look up rarity
// find rarest one and keep track

// show top 3 for options

export default function Home() {
  const [currentRarest, setCurrentRarest] = useState([-1, -1, -1]);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const getAllData = async () => {
    const result = await fetch(
      `https://tlsktfahct.medianetwork.cloud/nft_for_sale?collection=${searchInput}`
    );
    const jsonResult = await result.json();
    setData(jsonResult.slice(0, RESULT_CAP));
  };

  const handleChange = (input) => {
    setSearchInput(input);
  };

  const getRarity = async (id) => {
    const result = await fetch(
      `https://www.raritymon.com/Item-details?collection=lunaria&id=${id}`
    );
  };

  useEffect(() => {
    const getAllRarity = async () => {
      const results = await Promise.all(
        data.map(async (unit) => {
          // get id of unit
          const result = await getRarity(unit.name.split("#")[1]);
          const jsonResult = await result.json();
          console.log(jsonResult);
        })
      );
    };

    getAllRarity();
  }, [data]);
  return (
    <>
      <input onChange={(e) => handleChange(e.target.value)} />
      <button onClick={() => getAllData()}>search</button>
    </>
  );
}
