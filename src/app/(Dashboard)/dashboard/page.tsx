"use client";
import React from 'react';
import { 
  Grid, 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from "@mui/material";
import PageContainer from "@/app/(Dashboard)/components/container/PageContainer";
import {
  Home,
  Business,
  Star,
  TrendingUp,
  People,
  AttachMoney
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Sample data (replace with actual data from your API or database)
const projectData = [
  { name: 'Residential', value: 400 },
  { name: 'Commercial', value: 300 },
  { name: 'Industrial', value: 200 },
  { name: 'Land', value: 100 },
];

const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const latestProjects = [
  { id: 1, name: 'Luxury Apartments', location: 'Downtown', status: 'In Progress' },
  { id: 2, name: 'Office Complex', location: 'Business District', status: 'Planning' },
  { id: 3, name: 'Retail Center', location: 'Suburb', status: 'Completed' },
];

const latestReviews = [
  { id: 1, name: 'John Doe', rating: 5, comment: 'Excellent service and beautiful properties!' },
  { id: 2, name: 'Jane Smith', rating: 4, comment: 'Great experience overall, highly recommended.' },
  { id: 3, name: 'Mike Johnson', rating: 5, comment: 'Professional team and top-notch properties.' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="Anaa Developer Ltd Dashboard">
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Grid container spacing={3}>
          {/* Welcome Message */}
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Welcome to Anaa Developer Ltd
            </Typography>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Total Projects
                </Typography>
                <Typography variant="h5" component="div">
                  156
                </Typography>
                <Home color="primary" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Active Listings
                </Typography>
                <Typography variant="h5" component="div">
                  42
                </Typography>
                <Business color="secondary" />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Client Satisfaction
                </Typography>
                <Typography variant="h5" component="div">
                  4.8/5
                </Typography>
                <Star style={{ color: '#FFD700' }} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Revenue Growth
                </Typography>
                <Typography variant="h5" component="div">
                  +15%
                </Typography>
                <TrendingUp style={{ color: '#4CAF50' }} />
              </CardContent>
            </Card>
          </Grid>

          {/* Project Distribution Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Project Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={projectData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Revenue Chart */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Revenue Trend
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={revenueData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Latest Projects */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Projects
                </Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {latestProjects.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell>{project.name}</TableCell>
                          <TableCell>{project.location}</TableCell>
                          <TableCell>{project.status}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box mt={2}>
                  <Button variant="contained" color="primary">
                    View All Projects
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Latest Reviews */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Latest Reviews
                </Typography>
                <List>
                  {latestReviews.map((review) => (
                    <React.Fragment key={review.id}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar>{review.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={review.name}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                color="textPrimary"
                              >
                                {Array(review.rating).fill(<Star style={{ color: '#FFD700' }} />)}
                              </Typography>
                              {` — ${review.comment}`}
                            </React.Fragment>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </React.Fragment>
                  ))}
                </List>
                <Box mt={2}>
                  <Button variant="contained" color="primary">
                    View All Reviews
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" startIcon={<Home />}>
                      Add New Property
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" startIcon={<People />}>
                      Manage Clients
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="info" startIcon={<AttachMoney />}>
                      Financial Reports
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;

