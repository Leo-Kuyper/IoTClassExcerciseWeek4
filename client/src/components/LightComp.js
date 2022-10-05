import React, { useEffect, useState } from 'react'
import axios from 'axios'; 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ledOn from '../assets/ledOnWhite.png'
import ledOff from '../assets/ledOffWhite.png'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LightComp = (props) => {

  let name = props.name;

  const [light, setLight] = useState("-- ");
  const [labels, setLabels] = useState([]);
  const [chartdata, setChartData] = useState([]);
  const [relayState, setRelayState] = useState();
  const [ledImage, setLedImage] = useState(ledOff);

    useEffect(() => {
      const interval = setInterval(() => {
        axios.get('http://localhost:80/api/getLight/' + name)
        .then(res => {
        let labelArray = [];
        let dataArray = [];
 
        for(var i = 0; i < res.data.length; i++){
          labelArray.push(res.data[i].time.slice(11, 16));
          setLabels(labelArray);
          dataArray.push(res.data[i].light);
          setChartData(dataArray);
        } 

      });

      axios.get('http://localhost:80/api/getRelay/' + name)
        .then(res => { 
          setRelayState(res.data.relay)
        if(res.data.relay === false){

          setLedImage(ledOff);
        } else {

          setLedImage(ledOn);
        }

      });

      axios.get('http://localhost:80/api/getLastLight/' + name)
        .then(res => {
        
          setLight(Math.round(res.data.light));
        
      });


      }, 5000);

      
      return () => clearInterval(interval);
    }, []);

    const relayToggle = () => {
      let state = relayState;
      console.log(state);
      if(!state){
        state = true
        setLedImage(ledOn);
        console.log("Relay true");
     }else{
        state = false
        setLedImage(ledOff);
        console.log("Relay false");
     }
     setRelayState(state)
     console.log(state);

      let payload = {
        relay: state
    }
    console.log(payload);
      axios.patch('http://localhost:80/api/updateRelay/' + name, payload)
        .then((res)=> {
         
           if(res){
            console.log('Relay State Updated', payload.relay);
           }
        })
        .catch(function (error) {
            console.log(error);
        });
      
      
    }


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: props.name + "'s Light Levels",
        data: chartdata, 
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgb(75, 192, 192)',
      }
    ],
  };


  return (
    <div>
        <div className='card'>
          <div className='card-left'>
            <h1>{props.name}</h1>
            <p>Week 4: Class Exercise</p>
            <p className='desc'>Build this weeks circuit and upload your code to start seeing data...</p>
          </div>
          <div className='card-right'>
            <h1>{light}</h1>
            <h3>%</h3>
            <p className='latest'>Latest Light Level Reading</p>
          </div>
          
          <Line options={options} data={data} />
          <div onClick={relayToggle} className='button'>Toggle LED</div>
          <div className='led'><img src={ledImage}></img></div>
        </div>
       
      
    </div>
  )
}

export default LightComp
