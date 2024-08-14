import { Box, useTheme } from '@mui/material';


const Dashboard = () => {
    const { palette } = useTheme();
    return (
        <Box color={palette.grey[300]}>Dashboard</Box>
    )
}

export default Dashboard;