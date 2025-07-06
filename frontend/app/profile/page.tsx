"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Mail, Calendar, Trophy, Share2, Twitter, Instagram, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    joinDate: "2024-01-15",
    bio: "Passionate about sustainability and reducing my carbon footprint. Love cycling and growing my own vegetables! 🌱",
  })
  const [editedInfo, setEditedInfo] = useState(userInfo)

  const userStats = {
    totalCO2Saved: 450,
    currentStreak: 28,
    badgesEarned: 6,
    rank: "Eco Warrior",
    level: "Silver",
  }

  const badges = [
    { name: "First Steps", icon: "🌱", level: "Bronze", date: "2024-01-15" },
    { name: "Eco Warrior", icon: "🏆", level: "Silver", date: "2024-02-20" },
    { name: "Green Commuter", icon: "🚌", level: "Gold", date: "2024-03-10" },
    { name: "Energy Saver", icon: "⚡", level: "Silver", date: "2024-03-25" },
    { name: "Recycling Champion", icon: "♻️", level: "Bronze", date: "2024-04-05" },
    { name: "Plant Parent", icon: "🪴", level: "Bronze", date: "2024-04-12" },
  ]

  const achievements = [
    { title: "Reduced carbon footprint by 35%", date: "2024-04-01" },
    { title: "Completed 50 eco-friendly actions", date: "2024-03-28" },
    { title: "Maintained 4-week green streak", date: "2024-04-10" },
    { title: "Inspired 5 friends to join Sapphire", date: "2024-03-15" },
  ]

  const socialConnections = {
    twitter: { connected: true, handle: "@saraheco" },
    instagram: { connected: false, handle: "" },
  }

  const handleSave = () => {
    setUserInfo(editedInfo)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedInfo(userInfo)
    setIsEditing(false)
  }

  const connectSocial = (platform: string) => {
    // In a real app, this would handle OAuth flow
    alert(`Connect to ${platform} functionality would be implemented here`)
  }

  const shareProfile = () => {
    const text = `Check out my Sapphire profile! I've saved ${userStats.totalCO2Saved}kg of CO₂ and earned ${userStats.badgesEarned} badges. Join me in fighting climate change! 🌍 #Sapphire #ClimateAction`

    if (navigator.share) {
      navigator.share({
        title: "My Sapphire Profile",
        text: text,
        url: "https://sapphire.app/profile/sarah",
      })
    } else {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Profile</h1>
          <p className="text-xl text-gray-600">Track your environmental journey</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl text-gray-900">Profile Information</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                    <AvatarFallback className="bg-green-100 text-green-600 text-2xl">
                      {userInfo.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editedInfo.name}
                            onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedInfo.email}
                            onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{userInfo.name}</h2>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4" />
                          {userInfo.email}
                        </p>
                        <p className="text-gray-600 flex items-center gap-2 mt-1">
                          <Calendar className="h-4 w-4" />
                          Joined {new Date(userInfo.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <textarea
                      id="bio"
                      className="w-full mt-1 p-3 border border-gray-300 rounded-md resize-none"
                      rows={3}
                      value={editedInfo.bio}
                      onChange={(e) => setEditedInfo({ ...editedInfo, bio: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-700 mt-1">{userInfo.bio}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">My Badges</CardTitle>
                <p className="text-gray-600">Achievements unlocked on your eco journey</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {badges.map((badge, index) => (
                    <div
                      key={index}
                      className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-medium text-gray-900 text-sm">{badge.name}</h3>
                      <Badge
                        className={`mt-1 text-xs ${
                          badge.level === "Gold"
                            ? "bg-yellow-100 text-yellow-800"
                            : badge.level === "Silver"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {badge.level}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{new Date(badge.date).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Trophy className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{achievement.title}</p>
                        <p className="text-sm text-gray-600">{new Date(achievement.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats & Social */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-xl">Your Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">{userStats.totalCO2Saved}</div>
                  <div className="text-green-100">kg CO₂ Saved</div>
                </div>
                <Separator className="bg-green-400" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-100">Current Streak</span>
                    <span className="font-semibold">{userStats.currentStreak} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Badges Earned</span>
                    <span className="font-semibold">{userStats.badgesEarned}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Current Rank</span>
                    <span className="font-semibold">{userStats.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Level</span>
                    <span className="font-semibold">{userStats.level}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Connections */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Social Connections</CardTitle>
                <p className="text-gray-600">Connect your social media accounts</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Twitter className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      {socialConnections.twitter.connected && (
                        <p className="text-sm text-gray-600">{socialConnections.twitter.handle}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={socialConnections.twitter.connected ? "outline" : "default"}
                    onClick={() => connectSocial("Twitter")}
                  >
                    {socialConnections.twitter.connected ? "Connected" : "Connect"}
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-500" />
                    <div>
                      <p className="font-medium">Instagram</p>
                      {!socialConnections.instagram.connected && <p className="text-sm text-gray-600">Not connected</p>}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant={socialConnections.instagram.connected ? "outline" : "default"}
                    onClick={() => connectSocial("Instagram")}
                  >
                    {socialConnections.instagram.connected ? "Connected" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share Profile */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Share Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={shareProfile} className="w-full bg-green-600 hover:bg-green-700">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Profile
                </Button>
                <p className="text-sm text-gray-600 mt-2 text-center">Inspire others with your environmental impact</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
