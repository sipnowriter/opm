"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { UserRound, FileText, Plus, Trash } from "lucide-react"

type Report = {
  label: string
  file: File | null
}

type Patient = {
  id: string
  name: string
  aadhar: string
  phone: string
  gender: string
  reports: Report[]
}

let patientIdCounter = 1

export default function ReceptionPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("register")
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    aadhar: "",
    phone: "",
    gender: "",
    reports: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (value: string) => {
    setPatient({ ...patient, gender: value })
  }

  const handleAddReport = () => {
    setPatient({
      ...patient,
      reports: [...patient.reports, { label: "", file: null }],
    })
  }

  const handleReportChange = (index: number, field: keyof Report, value: string | File | null) => {
    if (field === "file" && value instanceof File) {
      const validTypes = ["application/pdf", "image/jpeg", "image/png"]
      if (!validTypes.includes(value.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF, JPEG, or PNG file.",
          variant: "destructive",
        })
        return
      }
    }
    const updatedReports = patient.reports.map((report, i) => (i === index ? { ...report, [field]: value } : report))
    setPatient({ ...patient, reports: updatedReports })
  }

  const handleRemoveReport = (index: number) => {
    const updatedReports = patient.reports.filter((_, i) => i !== index)
    setPatient({ ...patient, reports: updatedReports })
  }

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault()
    const newPatientId = `P${String(patientIdCounter).padStart(3, "0")}`
    patientIdCounter++

    console.log("Registering patient:", { ...patient, id: newPatientId })

    toast({
      title: "Patient Registered",
      description: `Patient ${patient.name} has been successfully registered with ID ${newPatientId}.`,
    })
    setPatient({
      id: "",
      name: "",
      aadhar: "",
      phone: "",
      gender: "",
      reports: [],
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reception</h1>
        <p className="text-muted-foreground">Register new patients and manage their reports</p>
      </div>

      <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="register" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Register Patient</span>
          </TabsTrigger>
          <TabsTrigger value="view" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>View Patients</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Patient Registration</CardTitle>
              <CardDescription>Register new patients and their reports</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterPatient}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={patient.name}
                      onChange={handleInputChange}
                      placeholder="Enter patient name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aadhar">Aadhar Number</Label>
                    <Input
                      id="aadhar"
                      name="aadhar"
                      value={patient.aadhar}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={patient.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select onValueChange={handleSelectChange} value={patient.gender}>
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Patient Reports</h3>
                  {patient.reports.map((report, index) => (
                    <div key={index} className="space-y-2 p-4 border rounded-md">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Report {index + 1}</h4>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveReport(index)}>
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`reportLabel-${index}`}>Report Label</Label>
                        <Input
                          id={`reportLabel-${index}`}
                          value={report.label}
                          onChange={(e) => handleReportChange(index, "label", e.target.value)}
                          placeholder="Enter report label"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`reportFile-${index}`}>Upload Report</Label>
                        <Input
                          id={`reportFile-${index}`}
                          type="file"
                          onChange={(e) => handleReportChange(index, "file", e.target.files?.[0] || null)}
                          accept=".pdf,.jpg,.jpeg,.png"
                          required
                        />
                        <p className="text-sm text-muted-foreground">Accepted file types: PDF, JPEG, PNG</p>
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={handleAddReport} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Report
                  </Button>
                </div>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Report Summary</h3>
                  {patient.reports.length > 0 ? (
                    <ul className="list-disc pl-5">
                      {patient.reports.map((report, index) => (
                        <li key={index}>
                          {report.label} - {report.file ? report.file.name : "No file uploaded"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No reports added yet.</p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Register Patient</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="view">
          <Card>
            <CardHeader>
              <CardTitle>View Patients</CardTitle>
              <CardDescription>This feature is not implemented in this demo.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                In a full implementation, this section would display a list or table of registered patients with options
                to view their details and reports.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

