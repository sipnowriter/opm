"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Search, Filter, Plus, CheckCircle, Printer, ClipboardList, FileCheck } from "lucide-react"

export default function DoctorPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("patient-reports")

  const handleCreatePrescription = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Prescription Created",
      description: "Prescription has been successfully created and is ready for printing.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Doctor</h1>
        <p className="text-muted-foreground">Review reports and write prescriptions</p>
      </div>

      <Tabs defaultValue="patient-reports" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="patient-reports" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Patient Reports</span>
          </TabsTrigger>
          <TabsTrigger value="prescription" className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4" />
            <span>Prescription</span>
          </TabsTrigger>
        </TabsList>

        {/* Patient Reports Tab */}
        <TabsContent value="patient-reports">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Review specialist reports and patient history</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search patient reports..." className="pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Specialist</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>P-{1000 + i}</TableCell>
                      <TableCell>Patient {i}</TableCell>
                      <TableCell>{["Blood Test", "X-Ray", "MRI", "CT Scan", "Ultrasound"][i - 1]}</TableCell>
                      <TableCell>Dr. {["Johnson", "Smith", "Williams", "Brown", "Jones"][i - 1]}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            i % 3 === 0
                              ? "bg-yellow-100 text-yellow-800"
                              : i % 2 === 0
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {i % 3 === 0 ? "Pending Review" : i % 2 === 0 ? "Reviewed" : "Needs Attention"}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prescription Tab */}
        <TabsContent value="prescription">
          <Card>
            <CardHeader>
              <CardTitle>Write Prescription</CardTitle>
              <CardDescription>Create a prescription for the patient</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreatePrescription}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionPatientId">Patient ID</Label>
                    <Input id="prescriptionPatientId" placeholder="Enter patient ID" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionPatientName">Patient Name</Label>
                    <Input id="prescriptionPatientName" placeholder="Enter patient name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionDate">Date</Label>
                    <Input
                      id="prescriptionDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prescriptionAge">Age</Label>
                    <Input id="prescriptionAge" type="number" placeholder="Enter age" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Textarea id="diagnosis" placeholder="Enter diagnosis" rows={2} required />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Medications</h3>
                    <Button type="button" variant="outline" size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Medication</span>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="p-4 border rounded-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`medication${i}`}>Medication Name</Label>
                            <Input id={`medication${i}`} placeholder="Enter medication name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`dosage${i}`}>Dosage</Label>
                            <Input id={`dosage${i}`} placeholder="Enter dosage" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`frequency${i}`}>Frequency</Label>
                            <Select>
                              <SelectTrigger id={`frequency${i}`}>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="once">Once daily</SelectItem>
                                <SelectItem value="twice">Twice daily</SelectItem>
                                <SelectItem value="thrice">Thrice daily</SelectItem>
                                <SelectItem value="four">Four times daily</SelectItem>
                                <SelectItem value="sos">SOS (as needed)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`duration${i}`}>Duration</Label>
                            <div className="flex gap-2">
                              <Input id={`duration${i}`} type="number" placeholder="Enter number" required />
                              <Select>
                                <SelectTrigger id={`durationUnit${i}`}>
                                  <SelectValue placeholder="Unit" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="days">Days</SelectItem>
                                  <SelectItem value="weeks">Weeks</SelectItem>
                                  <SelectItem value="months">Months</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <Label htmlFor={`instructions${i}`}>Special Instructions</Label>
                          <Textarea
                            id={`instructions${i}`}
                            placeholder="Enter any special instructions (e.g., take after meals)"
                            rows={2}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="advice">General Advice</Label>
                  <Textarea id="advice" placeholder="Enter general advice for the patient" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="followUp">Follow-up</Label>
                  <div className="flex gap-2">
                    <Input id="followUp" type="number" placeholder="Enter number" />
                    <Select>
                      <SelectTrigger id="followUpUnit">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="days">Days</SelectItem>
                        <SelectItem value="weeks">Weeks</SelectItem>
                        <SelectItem value="months">Months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Save Prescription</span>
                </Button>
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  <span>Print Prescription</span>
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

