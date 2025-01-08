
import BoxHeader from '@/components/BoxHeader';
import DashboardBox from '@/components/DashboardBox'
import FlexBetween from '@/components/FlexBetween';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { useMemo } from 'react';
import { Tooltip, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, PieChart, Pie, Cell } from 'recharts';

const pieData = [
  { name: "Group A", value: 700 },
  { name: "Group B", value: 400 },
]

const Row2 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  const { data: operatioanlData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();

  const operatioanlExpenses = useMemo(() => {
    return(
      operatioanlData &&
      operatioanlData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses}) => {
        return {
          name: month.substring(0,3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses
        }
      })
      );
    }, [operatioanlData]);

  return (
    <>
    <DashboardBox gridArea="d">
    <BoxHeader
          title="Operational Vs Non-Operational expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operatioanlExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation='left'
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
    </DashboardBox>

    <DashboardBox gridArea="e">
      <BoxHeader title='Campaigns and Targets' subtitle='' sideText='+4%'/>
      <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
    <PieChart 
          width={110} 
          height={100}
          margin={{
            top: 0,
            right: -10,
            left: 10,
            bottom: 0,
          }}        
          >
        <Pie
        stroke='none'
          data={pieData}
          innerRadius={18}
          outerRadius={38}
          paddingAngle={2}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={pieColors[index]} />
          ))}
        </Pie>
      </PieChart>
      <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
        <Typography variant="h5">Target Sales</Typography>
        <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>83</Typography>
        <Typography variant="h6">Finance goals of campaigns</Typography>
      </Box>
      <Box flexBasis="40%">
        <Typography variant="h5">Loses in Revenue</Typography>
        <Typography variant='h6'>83</Typography>
        <Typography mt="0.4rem" variant='h5'>Profit Margins</Typography>
        <Typography variant='h6'>Margins are up by 30% from last month.</Typography>
      </Box>
      </FlexBetween>
    </DashboardBox>
    <DashboardBox gridArea="f"></DashboardBox>
    </>
  )
}

export default Row2;