import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";
import './css/App.css';
import './css/flag.css';

const URLBase = 'https://api.fastforex.io/fetch-all?api_key=1151a5b46a-77029bc3a9-rmskgs';

function App() {
   
  const [money, setMoney] = useState([]);
  const [flags, setFlags] = useState([]);
  const [Datamoney, setDatamoney] = useState([]);
  const [select, setSelect] = useState("SE");

  const [state, setState] = useState({ amount:0, value1:'', value2:''});
  const [amount, setamount] = useState(0);
  const [value1, setvalue1] = useState();
  const [value2, setvalue2] = useState();
  const [finishvalue, setFinishvalue] = useState(0);


  useEffect(() => {
    getDataMoney();
  },[]);

  const getDataMoney = async () => {

    await axios.get(URLBase).then((res) =>  {
      setMoney(res.data);
      setDatamoney(Object.values(res.data.results));
        
      getFlags(); 
    })

  }// end getDataMoney
  
  const Conversiones = () => {
    setFinishvalue(0);

    if( amount == '' || value1 == '' || value2 == '' || !amount || !value1 || !value2 ){
      alert('Por favor revisa los valores nuevamente')
    }else{
      
      let ecu1 = amount * value2;
      ecu1 = ecu1/value1;
      ecu1 = currencyFormat(ecu1);
      setFinishvalue(ecu1)
      console.log(ecu1);
    }

  }
  
  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const onInputchangeV1 = event => { 
    setvalue1(event.target.value);
  };

  const onInputchangeV2 = event => { 
    setvalue2(event.target.value);
  };

  const onInputchangeAmount = event => { 
    setamount(event.target.value);
  };

  function getFlags() {

    let flagsTemporal = Object.keys(money.results);
    let valueFlag = [];

    // for (let index = 0; index < flagsTemporal.length; index++) {
    //   let element = flagsTemporal[index];
    //   //console.log(element); 
    //   let nwFlg = element[0]+element[1];
    //   valueFlag.push(nwFlg);
    // }  
    //setFlags(valueFlag);
    setFlags(flagsTemporal);

  }//end getFlags

  return (
    <div className="container row">
      
      <div className="col-md-4" >
        Amount
        <br/>
        <input className="form-control" type="numer" name="amount" value={amount} onChange={onInputchangeAmount} />
      </div>
      <div className="col-md-4" >
        <p>
        From
        </p>
        <select className="form-control" name="value1" value={value1} onChange={onInputchangeV1}  >
          {  
            flags.map((item, i) => {  
              return(
                <option value={Datamoney[i]} > {item} - {Datamoney[i]}  </option>
              )
            })
          }
        </select>  
      </div>
      <div className="col-md-4" >
        <p>To</p> 
        <select className="form-control" name="value2" value={value2} onChange={onInputchangeV2}  >
          {  
            flags.map((item, i) => {  
              let optionHtml; 
 
              if ( Datamoney[i] != state.value1 ) {
                optionHtml =  <option value={Datamoney[i]} > {item} - {Datamoney[i]}  </option>
              } else {
                optionHtml =  <option value='' > - </option>
              }

              return( optionHtml )
            })
          }
        </select> 
      </div> 

      {/* <div className="react-tel-input flag us"></div> */}
          
      <div className="col-md-12" >
          <button className="btn btn-warning"  onClick={Conversiones} >
            Convertir
          </button>
          <br/><br/>
          <b> {finishvalue} </b>
      </div>
    </div>
  );
}

export default App;
