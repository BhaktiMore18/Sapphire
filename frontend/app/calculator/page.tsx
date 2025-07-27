"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Car, Zap, Utensils, ShoppingBag, ArrowLeft, ArrowRight, Calculator } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

export default function CalculatorPage() {
  type BreakdownItem = { name: string; value: number; color: string }
  type ResultType = { total: number; breakdown: BreakdownItem[] } | { error: string }
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Travel
    carKmWeek: 100,
    flightHours: 10,
    bikeKmWeek: 20,
    // Energy
    electricityKwh: 300,
    gasUsage: 150,
    // Food
    dietType: "",
    // Shopping
    monthlySpend: 5000,
  })
  const [result, setResult] = useState<ResultType | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const steps = [
    { id: 1, title: "Travel Habits", icon: Car },
    { id: 2, title: "Energy Usage", icon: Zap },
    { id: 3, title: "Food Consumption", icon: Utensils },
    { id: 4, title: "Shopping Habits", icon: ShoppingBag },
  ]

  const calculateFootprint = async () => {
    setIsLoading(true)
    try {
      // Encode dietType for backend
      let dietTypeEncoded = 3; // Default: omnivore
      if (formData.dietType === "vegan") dietTypeEncoded = 0;
      else if (formData.dietType === "vegetarian") dietTypeEncoded = 1;
      else if (formData.dietType === "pescatarian") dietTypeEncoded = 2;

      const payload = { ...formData, dietType: dietTypeEncoded };
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      // Calculate breakdown locally for chart (optional, can be improved with backend)
      const travelEmissions = formData.carKmWeek * 52 * 0.2 + formData.flightHours * 250;
      const energyEmissions = formData.electricityKwh * 12 * 0.5 + formData.gasUsage * 12 * 2.3;
      const foodEmissions =
        formData.dietType === "vegan"
          ? 1500
          : formData.dietType === "vegetarian"
            ? 2500
            : formData.dietType === "pescatarian"
              ? 2000
              : 3500;
      const shoppingEmissions = formData.monthlySpend * 12 * 0.1;
      const breakdown: BreakdownItem[] = [
        { name: "Travel", value: Math.round(travelEmissions), color: "#ef4444" },
        { name: "Energy", value: Math.round(energyEmissions), color: "#f59e0b" },
        { name: "Food", value: Math.round(foodEmissions), color: "#10b981" },
        { name: "Shopping", value: Math.round(shoppingEmissions), color: "#8b5cf6" },
      ];

      setResult({ total: Math.round(data.carbon_footprint), breakdown });
    } catch (err) {
      setResult({ error: "Prediction failed" });
    } finally {
      setIsLoading(false);
    }
  } // End calculateFootprint

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    } else {
      calculateFootprint()
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const updateFormData = (field: keyof typeof formData, value: number | string) => {
    setFormData((prev: typeof formData) => ({ ...prev, [field]: value }))
  }

  if (result && 'total' in result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Carbon Footprint Results</h1>
            <p className="text-xl text-gray-600">Here's your environmental impact breakdown</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="bg-white shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-gray-900">Annual CO₂ Emissions</CardTitle>
                <div className="text-5xl font-bold text-red-600 mt-4">
                  {result.total.toLocaleString()}
                  <span className="text-2xl text-gray-600 ml-2">kg/year</span>
                </div>
                <div className="mt-2 bg-red-100 text-red-700 rounded px-2 py-1 inline-block">
                  <Badge>Above Global Average (4,800 kg)</Badge>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 text-center mb-4">Emissions Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={result.breakdown} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                      {result.breakdown.map((entry: BreakdownItem, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => [`${value} kg`, "CO₂ Emissions"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 grid md:grid-cols-4 gap-4">
            {result.breakdown.map((category: BreakdownItem, index: number) => (
              <Card key={index} className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold" style={{ color: category.color }}>
                    {category.value} kg
                  </div>
                  <div className="text-sm text-gray-600">{category.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button onClick={() => setResult(null)} variant="outline" className="mr-4">
              Recalculate
            </Button>
            <Button className="bg-green-600 hover:bg-green-700">View Recommendations</Button>
          </div>
        </div>
      </div>
    )
  }

  if (result && 'error' in result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-lg text-gray-700 mb-4">{result.error}</p>
          <Button onClick={() => setResult(null)} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Carbon Footprint Calculator</h1>
          <p className="text-xl text-gray-600">Answer a few questions to calculate your environmental impact</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => {
              const IconComponent = step.icon
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      currentStep >= step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <span className="text-sm mt-2 text-center">{step.title}</span>
                </div>
              )
            })}
          </div>
          <Progress value={(currentStep / 4) * 100} className="h-2" />
        </div>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900 flex items-center gap-2">
              {(() => {
                const IconComponent = steps[currentStep - 1].icon
                return <IconComponent className="h-6 w-6 text-green-600" />
              })()}
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Car usage (km per week)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[formData.carKmWeek]}
                      onValueChange={(value) => updateFormData("carKmWeek", value[0])}
                      max={500}
                      step={10}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>0 km</span>
                      <span className="font-medium">{formData.carKmWeek} km/week</span>
                      <span>500 km</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Flight hours per year</Label>
                  <Input
                    type="number"
                    value={formData.flightHours}
                    onChange={(e) => updateFormData("flightHours", Number.parseInt(e.target.value) || 0)}
                    className="mt-2"
                    placeholder="Enter flight hours"
                  />
                </div>

                <div>
                  <Label className="text-base font-medium">Bike/Walk (km per week)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[formData.bikeKmWeek]}
                      onValueChange={(value) => updateFormData("bikeKmWeek", value[0])}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>0 km</span>
                      <span className="font-medium">{formData.bikeKmWeek} km/week</span>
                      <span>100 km</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Monthly electricity usage (kWh)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[formData.electricityKwh]}
                      onValueChange={(value) => updateFormData("electricityKwh", value[0])}
                      max={1000}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>0 kWh</span>
                      <span className="font-medium">{formData.electricityKwh} kWh/month</span>
                      <span>1000 kWh</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Monthly gas usage (cubic meters)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[formData.gasUsage]}
                      onValueChange={(value) => updateFormData("gasUsage", value[0])}
                      max={500}
                      step={25}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>0 m³</span>
                      <span className="font-medium">{formData.gasUsage} m³/month</span>
                      <span>500 m³</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Diet Type</Label>
                  <Select value={formData.dietType} onValueChange={(value) => updateFormData("dietType", value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select your diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vegan">Vegan (Plant-based only)</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian (No meat)</SelectItem>
                      <SelectItem value="pescatarian">Pescatarian (Fish only)</SelectItem>
                      <SelectItem value="omnivore">Omnivore (Everything)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Monthly shopping spend (₹)</Label>
                  <div className="mt-2">
                    <Slider
                      value={[formData.monthlySpend]}
                      onValueChange={(value) => updateFormData("monthlySpend", value[0])}
                      max={20000}
                      step={500}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>₹0</span>
                      <span className="font-medium">₹{formData.monthlySpend.toLocaleString()}/month</span>
                      <span>₹20,000</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-between mt-8">
          <Button
            onClick={prevStep}
            disabled={currentStep === 1}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button onClick={nextStep} className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
            {currentStep === 4 ? (
              <>
                <Calculator className="h-4 w-4" />
                Calculate
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
