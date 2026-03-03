import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../ui/chart';

import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, XAxis } from 'recharts';

const InfoPage = () => {
  const [cod, setCod] = useState(0);
const [online, setOnline] = useState(0)
const [data, setData] = useState([])
 const fetchStats = async()=>{
  const {data} = await axios.get(`${server}/api/v1/stats`, {withCredentials:true})
  setData(data.data)
  setCod(data.cod)
  setOnline(data.online)
 }
 useEffect(()=>{
  fetchStats()
 },[])
 const paymentData = [
  {method:"online", user:online, fill:"#FF3E9B"},
  {method:"cod", user:cod, fill:"#00F7FF"}
 ]
 const paymentChartConfig={
  user:{
    label:"User"
  },
  online:{
    label:"Online",
    color:"hls(var(--chart1))"
  },
  cod:{
    label:"COD",
    color:"hls(var(--chart2))"
  }
 }
 const paymentPercentage = paymentData.map((data)=>({...data, percentage: parseFloat(((data.user/(cod+online))*100).toFixed(2))}))

   return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
      <Card className="felx flex-col">
        <CardHeader className="items-center pb-0">
        <CardTitle>
          Pie Chart - Payment Method 
        </CardTitle>
        <CardDescription>Payment Breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
           config={paymentChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
               <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
              <Pie
              data={paymentData}
              dataKey={"user"}
              nameKey={"method"}
              innerRadius={60}
               strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {cod+online}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Users
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Showing total users for payment methods
          </div>
        </CardFooter>
      </Card>
      <Card className="felx flex-col">
        <CardHeader className="items-center pb-0">
        <CardTitle>
          Pie Chart - Payment Percentage 
        </CardTitle>
        <CardDescription>Payment Breakdown</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
           config={paymentChartConfig}
          className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
               <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
              <Pie
              data={paymentPercentage}
              dataKey={"percentage"}
              nameKey={"method"}
              innerRadius={60}
               strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          100%
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Dispaying percentage distribution of payment methods
          </div>
        </CardFooter>
      </Card>
       <Card>
      <CardHeader>
        <CardTitle>Bar chart - Products Sold</CardTitle>
        <CardDescription>Units Sold for each products</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={paymentChartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="sold"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              cursor={false}
              content={({ payload }) => {
                if (payload && payload.length) {
                  const { name, sold } = payload[0].payload;
                  return (
                    <div
                      style={{
                        backgroundColor: "white",
                        padding: "10px",
                        border: "1px solid #ddd",
                        fontSize: "12px",
                      }}
                    >
                      <strong>{name}</strong>
                      <br />
                      <span>Sold: {sold}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey={"sold"} fill="#00F7FF" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Hover over a bar to see the product details
        </div>
      </CardFooter>
    </Card>
    
    </div>
  )
}

export default InfoPage
