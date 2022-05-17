import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Line , Bar ,Pie ,Doughnut} from "react-chartjs-2";

export default function BookChart () {
    let [arr , setArr] = useState([]);
    const data = {
        labels: label(),
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4','#B21F00','#C9DE00','#2FDE00','#00A6B4','#6800B4',
              '#B21F00','#C9DE00','#2FDE00','#00A6B4','#00A6B4','#B21F00','#C9DE00','#2FDE00','#00A6B4','#00A6B4','#6800B4','#B21F00','#C9DE00',
            ],
            // hoverBackgroundColor: [
            // '#501800',
            // ],
            data: Quantity()
          },
        ],
      }
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }
      useEffect(()=>{
        axios.get("http://localhost:4000/booklist")
            .then((response) => {
                setArr(response.data.book);
            })
      },[])
      function Quantity(){ 
        let x = [];
        arr.map((val, index) => {
          x[index] = val.available_books
        })
        return x
      }
      function label(){ 
        let x = [];
        arr.map((val, index) => {
          x[index] = val.bookname
        })
        return x
      }
    return (
      <div>
        <section className='card' >
            <Doughnut data={data}
                options={{
                title:{
                    display:true,
                    text:'Books Availability in  Library',
                    fontSize:20
                },
                legend:{
                    display:true,
                    position:'left',
                }
                }} />
            </section>
      </div>
    )
}
