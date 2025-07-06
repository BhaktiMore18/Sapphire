"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp, Target, CheckCircle, Leaf, Zap, Car } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

export default function DashboardPage() {
  const [completedChallenges, setCompletedChallenges] = useState(new Set())

  const weeklyData = [
    { week: "Week 1", emissions: 120 },
    { week: "Week 2", emissions: 115 },
    { week: "Week 3", emissions: 108 },
    { week: "Week 4", emissions: 102 },
    { week: "Week 5", emissions: 98 },
    { week: "Week 6", emissions: 95 },
    { week: "Week 7", emissions: 89 },
    { week: "Week 8", emissions: 85 },
  ]

  const monthlyData = [
    { month: "Jan", emissions: 450 },
    { month: "Feb", emissions: 420 },
    { month: "Mar", emissions: 380 },
    { month: "Apr", emissions: 350 },
    { month: "May", emissions: 320 },
    { month: "Jun", emissions: 290 },
  ]

  const emissionsBreakdown = [
    { name: "Travel", value: 1200, color: "#ef4444" },
    { name: "Energy", value: 800, color: "#f59e0b" },
    { name: "Food", value: 600, color: "#10b981" },
    { name: "Shopping", value: 400, color: "#8b5cf6" },
  ]

  const challenges = [
    {
      id: 1,
      title: "Use public transport 3 times this week",
      progress: 66,
      target: 3,
      current: 2,
      co2Saved: 15,
      icon: Car,
    },
    {
      id: 2,
      title: "Reduce energy consumption by 10%",
      progress: 80,
      target: 10,
      current: 8,
      co2Saved: 25,
      icon: Zap,
    },
    {
      id: 3,
      title: "Have 2 meat-free days",
      progress: 50,
      target: 2,
      current: 1,
      co2Saved: 12,
      icon: Leaf,
    },
  ]

  const recentActivities = [
    { action: "Took the bus to work", co2Saved: 5.2, time: "2 hours ago" },
    { action: "Used LED bulbs in living room", co2Saved: 3.1, time: "1 day ago" },
    { action: "Had a vegetarian lunch", co2Saved: 2.8, time: "2 days ago" },
    { action: "Cycled to the grocery store", co2Saved: 4.5, time: "3 days ago" },
  ]

  const tips = [
    "Switch to renewable energy sources to reduce your carbon footprint by up to 40%",
    "Walking or cycling for short trips can save 2.6 kg of CO₂ per day",
    "Eating less meat one day per week can save 310 kg of CO₂ annually",
    "Using a programmable thermostat can reduce emissions by 10-15%",
  ]

  const markChallengeComplete = (challengeId) => {
    setCompletedChallenges((prev) => new Set([...prev, challengeId]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Carbon Dashboard</h1>
          <p className="text-xl text-gray-600">Track your progress and environmental impact</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Total Footprint</p>
                  <p className="text-3xl font-bold">3,200 kg</p>
                  <p className="text-sm text-green-100">CO₂/year</p>
                </div>
                <TrendingDown className="h-8 w-8 text-green-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">This Month</p>
                  <p className="text-3xl font-bold">290 kg</p>
                  <p className="text-sm text-blue-100">12% reduction</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">CO₂ Saved</p>
                  <p className="text-3xl font-bold">450 kg</p>
                  <p className="text-sm text-purple-100">This year</p>
                </div>
                <Leaf className="h-8 w-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100">Goal Progress</p>
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-sm text-orange-100">Annual target</p>
                </div>
                <Target className="h-8 w-8 text-orange-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Emissions Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="weekly" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                  </TabsList>
                  <TabsContent value="weekly" className="mt-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="week" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} kg`, "CO₂ Emissions"]} />
                        <Line type="monotone" dataKey="emissions" stroke="#10b981" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="monthly" className="mt-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value} kg`, "CO₂ Emissions"]} />
                        <Bar dataKey="emissions" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* CO₂ Breakdown */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Emissions Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={emissionsBreakdown} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                    {emissionsBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kg`, "CO₂ Emissions"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {emissionsBreakdown.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium">{item.value} kg</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Challenges */}
        <Card className="mt-8 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">Weekly Challenges</CardTitle>
            <p className="text-gray-600">Complete challenges to reduce your carbon footprint</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <div key={challenge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <challenge.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{challenge.title}</h3>
                      <p className="text-sm text-gray-600">Save {challenge.co2Saved} kg CO₂</p>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>
                        {challenge.current}/{challenge.target}
                      </span>
                    </div>
                    <Progress value={challenge.progress} className="h-2" />
                  </div>
                  <Button
                    size="sm"
                    className={`w-full ${
                      completedChallenges.has(challenge.id)
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-600 hover:bg-gray-700"
                    }`}
                    onClick={() => markChallengeComplete(challenge.id)}
                    disabled={completedChallenges.has(challenge.id)}
                  >
                    {completedChallenges.has(challenge.id) ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      "Mark as Done"
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Activity */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      -{activity.co2Saved} kg CO₂
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="bg-white shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900">Eco Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
