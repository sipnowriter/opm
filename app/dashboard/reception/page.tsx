"use client"
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash } from "lucide-react"
import Modal from "@/components/ui/modal/modal"
import "./ReceptionPage.css"

type Report = {
  label: string
  file: File | null
}

type Patient = {
  id: string
  name: string
  aadhar: string
  phone: string
  partnerName: string
  partnerAadhar: string
  partnerPhone: string
  dateOfCreation: string
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
    partnerName: "",
    partnerAadhar: "",
    partnerPhone: "",
    dateOfCreation: "",
    reports: []
  })
  const [reports, setReports] = useState<Report[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  const handleAddReport = () => {
    setReports([...reports, { label: "", file: null }])
  }

  const handleRemoveReport = (index: number) => {
    const newReports = reports.filter((_, i) => i !== index)
    setReports(newReports)
  }

  const handleReportChange = (index: number, field: keyof Report, value: any) => {
    const newReports = [...reports]
    newReports[index][field] = value
    setReports(newReports)
  }

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault()
    if (!patient.name || !patient.aadhar || !patient.phone || !patient.partnerName || !patient.partnerAadhar || !patient.partnerPhone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields."
      })
      return
    }
    const newPatient = {
      ...patient,
      id: `P${patientIdCounter++}`,
      dateOfCreation: new Date().toISOString(),
      reports
    }
    setPatients([...patients, newPatient])
    toast({
      title: "Patient Registered",
      description: "Patient has been successfully registered.",
    })
    // Reset form
    setPatient({
      id: "",
      name: "",
      aadhar: "",
      phone: "",
      partnerName: "",
      partnerAadhar: "",
      partnerPhone: "",
      dateOfCreation: "",
      reports: []
    })
    setReports([])
  }

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.aadhar.includes(searchTerm) ||
    patient.phone.includes(searchTerm)
  )

  return (
    <div className="reception-page">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="register">Register</TabsTrigger>
          <TabsTrigger value="patients">Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterPatient} className="form">
                <div className="form-group">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={patient.name} onChange={(e) => setPatient({ ...patient, name: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label htmlFor="aadhar">Aadhar</Label>
                  <Input id="aadhar" value={patient.aadhar} onChange={(e) => setPatient({ ...patient, aadhar: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={patient.phone} onChange={(e) => setPatient({ ...patient, phone: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label htmlFor="partnerName">Partner/Husband Name</Label>
                  <Input id="partnerName" value={patient.partnerName} onChange={(e) => setPatient({ ...patient, partnerName: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label htmlFor="partnerAadhar">Partner/Husband Aadhar</Label>
                  <Input id="partnerAadhar" value={patient.partnerAadhar} onChange={(e) => setPatient({ ...patient, partnerAadhar: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label htmlFor="partnerPhone">Partner/Husband Phone</Label>
                  <Input id="partnerPhone" value={patient.partnerPhone} onChange={(e) => setPatient({ ...patient, partnerPhone: e.target.value })} required />
                </div>
                <div className="form-group">
                  <Label>Reports</Label>
                  {reports.map((report, index) => (
                    <div key={index} className="report-item">
                      <Input
                        placeholder="Report Label"
                        value={report.label}
                        onChange={(e) => handleReportChange(index, "label", e.target.value)}
                        required
                      />
                      <Input
                        type="file"
                        onChange={(e) => handleReportChange(index, "file", e.target.files ? e.target.files[0] : null)}
                        required
                      />
                      <Button type="button" onClick={() => handleRemoveReport(index)} className="remove-report-button">
                        <Trash />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" onClick={handleAddReport} className="add-report-button">
                    <Plus /> Add Report
                  </Button>
                </div>
                <Button type="submit" className="submit-button">Register</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="patients">
          <Card>
            <CardHeader>
              <CardTitle>Registered Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {filteredPatients.length === 0 ? (
                <p>No patients found.</p>
              ) : (
                <div className="patient-list">
                  {filteredPatients.map((patient) => (
                    <Card key={patient.id} className="patient-card" onClick={() => setSelectedPatient(patient)}>
                      <CardContent>
                        <p><strong>Name:</strong> {patient.name}</p>
                        <p><strong>Aadhar:</strong> {patient.aadhar}</p>
                        <p><strong>Phone:</strong> {patient.phone}</p>
                        <p><strong>Partner/Husband Name:</strong> {patient.partnerName}</p>
                        <p><strong>Partner/Husband Aadhar:</strong> {patient.partnerAadhar}</p>
                        <p><strong>Partner/Husband Phone:</strong> {patient.partnerPhone}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {selectedPatient && (
        <Modal onClose={() => setSelectedPatient(null)}>
          <Card>
            <CardHeader>
              <CardTitle>Patient Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>ID:</strong> {selectedPatient.id}</p>
              <p><strong>Name:</strong> {selectedPatient.name}</p>
              <p><strong>Aadhar:</strong> {selectedPatient.aadhar}</p>
              <p><strong>Phone:</strong> {selectedPatient.phone}</p>
              <p><strong>Partner/Husband Name:</strong> {selectedPatient.partnerName}</p>
              <p><strong>Partner/Husband Aadhar:</strong> {selectedPatient.partnerAadhar}</p>
              <p><strong>Partner/Husband Phone:</strong> {selectedPatient.partnerPhone}</p>
              <p><strong>Date of Creation:</strong> {new Date(selectedPatient.dateOfCreation).toLocaleString()}</p>
              <p><strong>Reports:</strong></p>
              <ul>
                {selectedPatient.reports.map((report, index) => (
                  <li key={index}>{report.label}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Modal>
      )}
    </div>
  )
}