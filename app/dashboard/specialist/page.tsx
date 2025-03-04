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
import { Search, Filter, CheckCircle, AlertCircle, FileCheck, FilePlus } from "lucide-react"

export default function SpecialistPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("check-reports")

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Report Created",
      description: "Report has been successfully created and sent to the doctor.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Specialist</h1>
        <p className="text-muted-foreground">Check reports and create analysis for doctors</p>
      </div>

      <Tabs defaultValue="check-reports" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="check-reports" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span>Check Reports</span>
          </TabsTrigger>
          <TabsTrigger value="create-report" className="flex items-center gap-2">
            <FilePlus className="h-4 w-4" />
            <span>Create Report</span>
          </TabsTrigger>
        </TabsList>

        {/* Check Reports Tab */}
        <TabsContent value="check-reports">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Review and analyze patient reports</CardDescription>
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
                    <TableHead>Report ID</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Report Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <TableRow key={i}>
                      <TableCell>R-{2000 + i}</TableCell>
                      <TableCell>Patient {i}</TableCell>
                      <TableCell>{["Blood Test", "X-Ray", "MRI", "CT Scan", "Ultrasound"][i - 1]}</TableCell>
                      <TableCell>{new Date().toLocaleDateString()}</TableCell>
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
                          {i % 3 === 0 ? "Pending Analysis" : i % 2 === 0 ? "Analyzed" : "In Progress"}
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

        {/* Create Report Tab */}
        <TabsContent value="create-report">
          <Card>
            <CardHeader>
              <CardTitle>Create Report Analysis</CardTitle>
              <CardDescription>Analyze reports and provide insights for doctors</CardDescription>
            </CardHeader>
            <form onSubmit={handleCreateReport}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportId">Report ID</Label>
                    <Input id="reportId" placeholder="Enter report ID" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientId">Patient ID</Label>
                    <Input id="patientId" placeholder="Enter patient ID" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input id="patientName" placeholder="Enter patient name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reportType">Report Type</Label>
                    <Select>
                      <SelectTrigger id="reportType">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blood">Blood Test</SelectItem>
                        <SelectItem value="xray">X-Ray</SelectItem>
                        <SelectItem value="mri">MRI</SelectItem>
                        <SelectItem value="ct">CT Scan</SelectItem>
                        <SelectItem value="ultrasound">Ultrasound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportFindings">Report Findings</Label>
                  <Textarea
                    id="reportFindings"
                    placeholder="Enter detailed findings from the report"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reportAnalysis">Analysis & Interpretation</Label>
                  <Textarea
                    id="reportAnalysis"
                    placeholder="Provide your professional analysis and interpretation of the findings"
                    rows={4}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identifiedIssues">Identified Issues</Label>
                  <Textarea
                    id="identifiedIssues"
                    placeholder="List any medical issues identified from the report"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="suggestedTests">Suggested Additional Tests</Label>
                  <Textarea id="suggestedTests" placeholder="Recommend any additional tests if necessary" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctorNotes">Notes for Doctor</Label>
                  <Textarea id="doctorNotes" placeholder="Add any additional notes for the doctor" rows={3} />
                </div>

                <div className="space-y-2">
                  <Label>Report Status</Label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="statusNormal"
                        name="reportStatus"
                        value="normal"
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="statusNormal" className="text-sm font-normal cursor-pointer">
                        Normal
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="statusAbnormal"
                        name="reportStatus"
                        value="abnormal"
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="statusAbnormal" className="text-sm font-normal cursor-pointer">
                        Abnormal
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        id="statusCritical"
                        name="reportStatus"
                        value="critical"
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor="statusCritical" className="text-sm font-normal cursor-pointer">
                        Critical
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit" className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Submit Analysis</span>
                </Button>
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  <span>Flag for Review</span>
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

