import React, { useContext, useEffect, useState } from "react";
import { SectionContext } from "../pages/evenimente/context";
import PopInfoMenu from "./PopInfoMenu";
import c, { div } from "../pages/evenimente/Eveniment.module.css";
import axios from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";
import HistoryTransactions from "./HistoryTransactions";
import { Transactions } from "../pages/evenimente/models";
import { Context } from "../context";
import { ProfileInfo, functiiTypeBD } from "../pages/Registration/models";
import { useParams } from "react-router-dom";
import { parse, format } from "date-fns";

function StatisticaSection() {
  interface Data {
    data: string;
    suma: string;
    organizatie: string;
  }

  const { setShowTr, showTr, id, p, setShowMenu, showMenu, section } =
    useContext(SectionContext);
  const { userState, setUserInfo } = useContext(Context);
  const [data, setData] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useContext(Context);
  const [maxSuma, setMaxSuma] = useState<number>();

  async function getMoney() {
    try {
      const res = await axios.get(
        `http://localhost:5000/get-project-transactions/${id}`
      );
      setData(res.data);
      res.data && setLoading(false);

      setData((prevData) => {
        const max = Math.max(...prevData.map((i) => parseInt(i.suma)));
        setMaxSuma(max);
        return prevData; // Returning the previous data to keep the state consistent
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getMoney();
  }, []);

  useEffect(() => {
    userState.logged &&
      localStorage.setItem("userInfo", JSON.stringify(userState));
  }, []);

  useEffect(() => {
    // Recuperare date din localStorage la încărcarea componentei
    const storedUserInfoString = localStorage.getItem("userInfo");

    if (storedUserInfoString !== null) {
      const storedUserInfo = JSON.parse(storedUserInfoString);
      setUserInfo(storedUserInfo);
    }
  }, []);

  useEffect(() => {
    userInfo.email && fetchdata(userInfo.email);
  }, [userInfo]);
  const [showTrForm, setShowTrForm] = useState(false);
  const [suma, setSuma] = useState<number>(0);
  const [sponsor_id, setSponsorId] = useState<number>(0);

  const fetchdata = async (em: string) => {
    try {
      const res = await axios.post("http://localhost:5000/sponsor-info", {
        email: em,
      });
      setSponsorId(res.data[0].id);
    } catch (e) {
      console.log(e);
    }
  };

  async function ajuta(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    try {
      if (suma > 0) {
        const res = await axios.post("http://localhost:5000/sponsorizare", {
          id_proiect: parseInt(id!),
          id_sponsor: sponsor_id,
          suma: suma,
        });
        if (res.data) {
          getMoney();
          setSuccessPlaceholder(true);

          // Reset success placeholder after 2 seconds (you can adjust the timeout as needed)
          setTimeout(() => {
            setSuccessPlaceholder(false);
          }, 4000);
          setShowTrForm(false);
          setSuma(0)
        }
      } else {
        console.log("suma mai mica ca 0");
      }
    } catch (e) {
      console.log(e);
    }
  }

  const [transactions, setTransactions] = useState<Transactions[] | null>(null);

  // async function getTransactions() {
  //   try{
  //       const res=await axios.get(`http://localhost:5000/get-project-transactions/${id}`)
  //       setTransactions(res.data)

  //   }catch(e){
  //       console.log(e);

  //   }
  // }

  // useEffect(()=>{
  // getTransactions()
  // },[setData])

  const [successPlaceholder, setSuccessPlaceholder] = useState(false);



  function formatSuma(suma: string) {
    const milioane = 1000000;
    const sumaNumeric = parseInt(suma, 10);
  
    if (sumaNumeric >= milioane) {
      return `${(sumaNumeric / 1000000).toFixed(2)}M`
    }
  
    return suma;
  }
  
  return (
    <div className={`${showTr ? c["section-st"] : c.section}`}>
      <header className={c.header}>
        <span>{section}</span>
        <i className="bi bi-list" onClick={() => setShowMenu(!showMenu)}></i>
        {showMenu && <PopInfoMenu p={p!} />}
      </header>
      {loading ? (
        <div className={c.lodaing}>
          Loading...
          <div className={c["loading-spinner"]}></div>
        </div>
      ) : data ? (
        <div>
          <LineChart className={c.chart} width={800} height={400} data={data}>
            <Line type="monotone" dataKey="suma" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="data" />
            <YAxis tickFormatter={(value:string) => formatSuma(value)}  domain={[20, maxSuma!]} />
          </LineChart>
          <div className={c["transactions-btn-div"]}>
            <div>
              {userInfo.functie === functiiTypeBD.sponsori &&p?.suma_necesara&& (
                <button
                  onClick={() => setShowTrForm(!showTrForm)}
                  className={c.sponsorizeaza}
                >
                  Sponsorizează
                </button>
              )}
              {userInfo.functie === functiiTypeBD.sponsori && showTrForm && (
                <div className={c["sponsorizeaza-container"]}>
                  <form className={c["sponsorizeaza-form"]} action="">
                    <i
                      className={`bi bi-x ${c["close-x"]}`}
                      onClick={() => setShowTrForm(!showTrForm)}
                    ></i>
                    <div className={c["sponsor-input"]}>
                      <input
                        type="number"
                        min={1}
                        placeholder={
                          successPlaceholder ? "Succes" : "Introdu suma dorită"
                        }
                        onChange={(e) => setSuma(parseInt(e.target.value, 10))}
                      />
                      MDL
                    </div>
                    <button onClick={(e) => ajuta(e)} className={c.ajuta}>
                      Ajută
                    </button>
                  </form>
                </div>
              )}
            </div>
            <div>
              <i
                className={`bi bi-clock-history ${c["history-icon"]}`}
                onClick={() => setShowTr(!showTr)}
              ></i>
            </div>
          </div>

          {showTr && <HistoryTransactions data={data} />}
        </div>
       ): (
        <h3>Nu-s inregistrari</h3>
      )}
    </div>
  );
}

export default StatisticaSection;
