"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Share2, Twitter, Linkedin, Lock, Star, Trophy, Leaf, Zap, Car, Recycle, Globe, Heart } from "lucide-react"

type Badge = {
  id: number
  name: string
  description: string
  icon: React.ElementType
  status: "unlocked" | "progress" | "locked"
  level: "bronze" | "silver" | "gold" | "platinum"
  dateEarned?: string
  co2Saved?: number
  progress?: number
  target?: number
  current?: number
  requirement?: string
}

export default function BadgesPage() {
  const [shareModal, setShareModal] = useState<Badge | null>(null)

  const badges: Badge[] = [
    {
      id: 1,
      name: "First Steps",
      description: "Completed your first carbon footprint calculation",
      icon: Leaf,
      status: "unlocked",
      level: "bronze",
      dateEarned: "2024-01-15",
      co2Saved: 0,
    },
    {
      id: 2,
      name: "Eco Warrior",
      description: "Reduced carbon footprint by 20%",
      icon: Trophy,
      status: "unlocked",
      level: "silver",
      dateEarned: "2024-02-20",
      co2Saved: 150,
    },
    {
      id: 3,
      name: "Green Commuter",
      description: "Used public transport for 30 days",
      icon: Car,
      status: "unlocked",
      level: "gold",
      dateEarned: "2024-03-10",
      co2Saved: 200,
    },
    {
      id: 4,
      name: "Energy Saver",
      description: "Reduced energy consumption by 30%",
      icon: Zap,
      status: "unlocked",
      level: "silver",
      dateEarned: "2024-03-25",
      co2Saved: 120,
    },
    {
      id: 5,
      name: "Recycling Champion",
      description: "Logged 50 recycling activities",
      icon: Recycle,
      status: "progress",
      level: "bronze",
      progress: 68,
      target: 50,
      current: 34,
    },
    {
      id: 6,
      name: "Climate Hero",
      description: "Saved 500kg of CO₂ in total",
      icon: Globe,
      status: "progress",
      level: "gold",
      progress: 90,
      target: 500,
      current: 450,
    },
    {
      id: 7,
      name: "Community Leader",
      description: "Inspired 10 friends to join Sapphire",
      icon: Heart,
      status: "locked",
      level: "gold",
      requirement: "Invite 10 friends",
    },
    {
      id: 8,
      name: "Sustainability Master",
      description: "Maintained low carbon lifestyle for 1 year",
      icon: Star,
      status: "locked",
      level: "platinum",
      requirement: "Complete 365 days of tracking",
    },
  ]

  const levelColors = {
    bronze: "bg-amber-100 text-amber-800 border-amber-200",
    silver: "bg-gray-100 text-gray-800 border-gray-200",
    gold: "bg-yellow-100 text-yellow-800 border-yellow-200",
    platinum: "bg-purple-100 text-purple-800 border-purple-200",
  }

  const levelIcons = {
    bronze: "🥉",
    silver: "🥈",
    gold: "🥇",
    platinum: "💎",
  }

  const userStats = {
    totalBadges: badges.filter((b) => b.status === "unlocked").length,
    totalCO2Saved: badges.filter((b) => b.status === "unlocked").reduce((sum, b) => sum + (b.co2Saved ?? 0), 0),
    currentLevel: "Silver",
    nextLevel: "Gold",
    levelProgress: 75,
  }

  const shareOnSocial = (platform: string, badge: Badge) => {
    const text = `I just earned the "${badge.name}" badge on Sapphire! 🌱 Join me in reducing carbon footprint. #Sapphire #ClimateAction`
    const url = "https://sapphire.app"

    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(text)}`,
      )
    }
    setShareModal(null)
  }

  const shareProgress = () => {
    const text = `I've earned ${userStats.totalBadges} badges and saved ${userStats.totalCO2Saved}kg of CO₂ with Sapphire! 🌿 #Sapphire #ClimateAction`
    const url = "https://sapphire.app"

    if (navigator.share) {
      navigator.share({
        title: "My Sapphire Progress",
        text: text,
        url: url,
      })
    } else {
      // Fallback to Twitter
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Badges</h1>
          <p className="text-xl text-gray-600">Celebrate your environmental achievements</p>
        </div>

        {/* User Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{userStats.totalBadges}</div>
              <div className="text-green-100">Badges Earned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{userStats.totalCO2Saved}</div>
              <div className="text-blue-100">kg CO₂ Saved</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{userStats.currentLevel}</div>
              <div className="text-purple-100">Current Level</div>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-green-200">
            <CardContent className="p-6">
              <div className="text-center mb-3">
                <div className="text-lg font-semibold text-gray-900">Level Progress</div>
                <div className="text-sm text-gray-600">
                  {userStats.currentLevel} → {userStats.nextLevel}
                </div>
              </div>
              <Progress value={userStats.levelProgress} className="h-3 mb-2" />
              <div className="text-center text-sm text-gray-600">{userStats.levelProgress}% Complete</div>
            </CardContent>
          </Card>
        </div>

        {/* Share Progress */}
        <div className="text-center mb-8">
          <Button onClick={shareProgress} className="bg-green-600 hover:bg-green-700">
            <Share2 className="h-4 w-4 mr-2" />
            Share My Progress
          </Button>
        </div>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge) => (
            <Card
              key={badge.id}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${
                badge.status === "locked" ? "opacity-60" : ""
              }`}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative">
                  <div
                    className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-3 ${
                      badge.status === "unlocked"
                        ? "bg-green-100"
                        : badge.status === "progress"
                          ? "bg-blue-100"
                          : "bg-gray-100"
                    }`}
                  >
                    {badge.status === "locked" ? (
                      <Lock className="h-8 w-8 text-gray-400" />
                    ) : (
                      <badge.icon
                        className={`h-8 w-8 ${
                          badge.status === "unlocked"
                            ? "text-green-600"
                            : badge.status === "progress"
                              ? "text-blue-600"
                              : "text-gray-400"
                        }`}
                      />
                    )}
                  </div>
                  <Badge className={`absolute -top-2 -right-2 ${levelColors[badge.level]}`}>
                    {levelIcons[badge.level]} {badge.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{badge.name}</CardTitle>
                <p className="text-sm text-gray-600">{badge.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                {badge.status === "unlocked" && (
                  <div className="space-y-3">
                    <div className="text-center">
                      <div className="text-sm text-gray-600">Earned on</div>
                      <div className="font-medium">
                        {badge.dateEarned ? new Date(badge.dateEarned).toLocaleDateString() : "Date unavailable"}
                      </div>
                      {typeof badge.co2Saved === "number" && badge.co2Saved > 0 && (
                        <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                          {badge.co2Saved} kg CO₂ saved
                        </Badge>
                      )}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => setShareModal(badge)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Badge
                    </Button>
                  </div>
                )}

                {badge.status === "progress" && (
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>
                          {badge.current}/{badge.target}
                        </span>
                      </div>
                      <Progress value={badge.progress} className="h-2" />
                    </div>
                    <div className="text-center text-sm text-gray-600">
                      {typeof badge.target === "number" && typeof badge.current === "number"
                        ? `${badge.target - badge.current} more to unlock`
                        : "Progress data unavailable"}
                    </div>
                  </div>
                )}

                {badge.status === "locked" && (
                  <div className="text-center">
                    <div className="text-sm text-gray-600 mb-2">Requirement:</div>
                    <div className="text-sm font-medium">{badge.requirement}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Share Modal */}
        {shareModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-center">Share Your Badge</CardTitle>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
                    <shareModal.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold">{shareModal.name}</h3>
                  <p className="text-sm text-gray-600">{shareModal.description}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    I just earned the "{shareModal.name}" badge on Sapphire! 🌱 Join me in reducing carbon footprint.
                    #Sapphire #ClimateAction
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-500 hover:bg-blue-600"
                    onClick={() => shareOnSocial("twitter", shareModal)}
                  >
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </Button>
                  <Button
                    className="flex-1 bg-blue-700 hover:bg-blue-800"
                    onClick={() => shareOnSocial("linkedin", shareModal)}
                  >
                    <Linkedin className="h-4 w-4 mr-2" />
                    LinkedIn
                  </Button>
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setShareModal(null)}>
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
