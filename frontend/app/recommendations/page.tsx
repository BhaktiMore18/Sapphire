"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, CheckCircle, Leaf, Car, Zap, ShoppingBag, Utensils, TrendingDown } from "lucide-react"

export default function RecommendationsPage() {
  const [completedTips, setCompletedTips] = useState(new Set())
  const [likedTips, setLikedTips] = useState(new Set())

  const recommendations = {
    food: [
      {
        id: 1,
        title: "Try Meatless Monday",
        description: "Skip meat one day per week to reduce your carbon footprint",
        co2Saved: 12,
        difficulty: "Easy",
        category: "Diet",
      },
      {
        id: 2,
        title: "Buy Local Produce",
        description: "Choose locally grown fruits and vegetables to reduce transport emissions",
        co2Saved: 8,
        difficulty: "Easy",
        category: "Shopping",
      },
      {
        id: 3,
        title: "Reduce Food Waste",
        description: "Plan meals and use leftovers to minimize food waste",
        co2Saved: 15,
        difficulty: "Medium",
        category: "Habits",
      },
      {
        id: 4,
        title: "Grow Your Own Herbs",
        description: "Start a small herb garden to reduce packaging and transport",
        co2Saved: 5,
        difficulty: "Medium",
        category: "Gardening",
      },
    ],
    travel: [
      {
        id: 5,
        title: "Use Public Transport",
        description: "Take the bus or train twice a week instead of driving",
        co2Saved: 25,
        difficulty: "Easy",
        category: "Commute",
      },
      {
        id: 6,
        title: "Cycle Short Distances",
        description: "Use a bicycle for trips under 5km",
        co2Saved: 18,
        difficulty: "Easy",
        category: "Exercise",
      },
      {
        id: 7,
        title: "Work From Home",
        description: "Work remotely 2-3 days per week if possible",
        co2Saved: 35,
        difficulty: "Easy",
        category: "Work",
      },
      {
        id: 8,
        title: "Carpool or Rideshare",
        description: "Share rides with colleagues or use carpooling apps",
        co2Saved: 20,
        difficulty: "Medium",
        category: "Social",
      },
    ],
    energy: [
      {
        id: 9,
        title: "Switch to LED Bulbs",
        description: "Replace all incandescent bulbs with energy-efficient LEDs",
        co2Saved: 30,
        difficulty: "Easy",
        category: "Lighting",
      },
      {
        id: 10,
        title: "Unplug Electronics",
        description: "Unplug devices when not in use to avoid phantom energy consumption",
        co2Saved: 12,
        difficulty: "Easy",
        category: "Electronics",
      },
      {
        id: 11,
        title: "Use a Programmable Thermostat",
        description: "Set your thermostat to automatically adjust temperature when away",
        co2Saved: 40,
        difficulty: "Medium",
        category: "Heating",
      },
      {
        id: 12,
        title: "Air Dry Clothes",
        description: "Skip the dryer and hang clothes to dry naturally",
        co2Saved: 22,
        difficulty: "Easy",
        category: "Laundry",
      },
    ],
    shopping: [
      {
        id: 13,
        title: "Buy Second-Hand",
        description: "Choose pre-owned items for clothing, furniture, and electronics",
        co2Saved: 28,
        difficulty: "Easy",
        category: "Clothing",
      },
      {
        id: 14,
        title: "Use Reusable Bags",
        description: "Bring your own bags when shopping to reduce plastic waste",
        co2Saved: 6,
        difficulty: "Easy",
        category: "Waste",
      },
      {
        id: 15,
        title: "Buy in Bulk",
        description: "Purchase non-perishables in bulk to reduce packaging",
        co2Saved: 10,
        difficulty: "Medium",
        category: "Packaging",
      },
      {
        id: 16,
        title: "Choose Quality Over Quantity",
        description: "Invest in durable products that last longer",
        co2Saved: 45,
        difficulty: "Medium",
        category: "Mindful",
      },
    ],
  }

  const toggleComplete = (tipId) => {
    setCompletedTips((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(tipId)) {
        newSet.delete(tipId)
      } else {
        newSet.add(tipId)
      }
      return newSet
    })
  }

  const toggleLike = (tipId) => {
    setLikedTips((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(tipId)) {
        newSet.delete(tipId)
      } else {
        newSet.add(tipId)
      }
      return newSet
    })
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTabIcon = (tab) => {
    switch (tab) {
      case "food":
        return Utensils
      case "travel":
        return Car
      case "energy":
        return Zap
      case "shopping":
        return ShoppingBag
      default:
        return Leaf
    }
  }

  const renderTips = (tips) => (
    <div className="grid md:grid-cols-2 gap-6">
      {tips.map((tip) => (
        <Card
          key={tip.id}
          className={`transition-all hover:shadow-lg ${
            completedTips.has(tip.id) ? "bg-green-50 border-green-200" : "bg-white"
          }`}
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg mb-2 flex items-center gap-2">
                  {tip.title}
                  {completedTips.has(tip.id) && <CheckCircle className="h-5 w-5 text-green-600" />}
                </CardTitle>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge className="bg-blue-100 text-blue-800">
                <TrendingDown className="h-3 w-3 mr-1" />
                {tip.co2Saved} kg CO₂
              </Badge>
              <Badge className={getDifficultyColor(tip.difficulty)}>{tip.difficulty}</Badge>
              <Badge variant="outline">{tip.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex gap-2">
              <Button
                size="sm"
                className={`flex-1 ${
                  completedTips.has(tip.id) ? "bg-green-600 hover:bg-green-700" : "bg-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => toggleComplete(tip.id)}
              >
                {completedTips.has(tip.id) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Completed
                  </>
                ) : (
                  "Mark as Done"
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className={`${likedTips.has(tip.id) ? "text-red-600 border-red-200" : ""}`}
                onClick={() => toggleLike(tip.id)}
              >
                <Heart className={`h-4 w-4 ${likedTips.has(tip.id) ? "fill-current" : ""}`} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const totalTips = Object.values(recommendations).flat().length
  const completedCount = completedTips.size
  const totalCO2Potential = Object.values(recommendations)
    .flat()
    .filter((tip) => completedTips.has(tip.id))
    .reduce((sum, tip) => sum + tip.co2Saved, 0)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Smart Recommendations</h1>
          <p className="text-xl text-gray-600">Personalized tips to reduce your carbon footprint</p>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{completedCount}</div>
              <div className="text-green-100">Tips Completed</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <TrendingDown className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{totalCO2Potential}</div>
              <div className="text-blue-100">kg CO₂ Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{Math.round((completedCount / totalTips) * 100)}%</div>
              <div className="text-purple-100">Progress</div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Tabs */}
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Personalized Tips</CardTitle>
            <p className="text-gray-600">Choose a category to explore recommendations</p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="food" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {Object.keys(recommendations).map((tab) => {
                  const Icon = getTabIcon(tab)
                  return (
                    <TabsTrigger key={tab} value={tab} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </TabsTrigger>
                  )
                })}
              </TabsList>

              {Object.entries(recommendations).map(([category, tips]) => (
                <TabsContent key={category} value={category}>
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 capitalize">{category} Recommendations</h3>
                    <p className="text-gray-600">
                      {tips.length} tips available • {tips.filter((tip) => completedTips.has(tip.id)).length} completed
                    </p>
                  </div>
                  {renderTips(tips)}
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Impact Summary */}
        {completedCount > 0 && (
          <Card className="mt-8 bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Great Progress! 🎉</h3>
              <p className="text-lg text-gray-700 mb-4">
                You've completed {completedCount} recommendations and could save up to{" "}
                <span className="font-bold text-green-600">{totalCO2Potential} kg of CO₂</span> annually!
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-600 text-white px-4 py-2">🌱 Eco Champion</Badge>
                <Badge className="bg-blue-600 text-white px-4 py-2">
                  📈 {Math.round((completedCount / totalTips) * 100)}% Complete
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
