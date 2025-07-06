"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Calculator, TrendingDown, Users, Star, ArrowRight, CheckCircle, Globe, Zap, Car } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [communityStats, setCommunityStats] = useState(0)

  useEffect(() => {
    // Animate counter
    const target = 125847
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCommunityStats(target)
        clearInterval(timer)
      } else {
        setCommunityStats(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [])

  const features = [
    {
      icon: Calculator,
      title: "Calculate Your Footprint",
      description: "Get detailed insights into your carbon emissions across travel, energy, food, and shopping.",
    },
    {
      icon: TrendingDown,
      title: "Track Progress",
      description: "Monitor your carbon reduction journey with detailed analytics and progress tracking.",
    },
    {
      icon: Leaf,
      title: "Smart Recommendations",
      description: "Receive personalized tips and challenges to reduce your environmental impact.",
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Join thousands of users making a difference together for our planet.",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Enthusiast",
      content: "Sapphire helped me reduce my carbon footprint by 40% in just 6 months!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "Sustainability Manager",
      content: "The gamification aspect makes reducing emissions fun and engaging.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Climate Activist",
      content: "Finally, a platform that makes carbon tracking simple and actionable.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800 mb-4">
              🌱 Join the Green Revolution
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Track and Reduce Your
              <span className="text-green-600 block">Carbon Footprint</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Make a real impact on climate change with personalized insights, smart recommendations, and a supportive
              community of eco-warriors.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/calculator">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                <Calculator className="mr-2 h-5 w-5" />
                Calculate My Footprint
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3 bg-transparent"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          {/* Global Stats */}
          <Card className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border-green-200">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{communityStats.toLocaleString()} kg</h3>
              <p className="text-green-600 font-medium">Total CO₂ Saved by Community</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How Sapphire Works</h2>
            <p className="text-xl text-gray-600">Simple steps to start your carbon reduction journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow border-green-100">
                <CardContent className="p-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-20 px-4 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied eco-warriors</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sapphire */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Sapphire?</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comprehensive Tracking</h3>
                    <p className="text-gray-600">Monitor all aspects of your carbon footprint in one place</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Personalized Insights</h3>
                    <p className="text-gray-600">Get tailored recommendations based on your lifestyle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Gamified Experience</h3>
                    <p className="text-gray-600">Earn badges and compete with friends to stay motivated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Community Support</h3>
                    <p className="text-gray-600">Connect with like-minded individuals on the same journey</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-green-100 border-green-200">
                <CardContent className="p-6 text-center">
                  <Car className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">2.5M</h3>
                  <p className="text-green-700">Miles Tracked</p>
                </CardContent>
              </Card>
              <Card className="bg-blue-100 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Zap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">15K</h3>
                  <p className="text-blue-700">kWh Saved</p>
                </CardContent>
              </Card>
              <Card className="bg-yellow-100 border-yellow-200">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">50K</h3>
                  <p className="text-yellow-700">Trees Equivalent</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-100 border-purple-200">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
                  <p className="text-purple-700">Active Users</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-green-100">
            Join thousands of users who are already reducing their carbon footprint with Sapphire.
          </p>
          <Link href="/calculator">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 px-8 py-3">
              Start Your Journey Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
