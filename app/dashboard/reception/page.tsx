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
import { useToast } from "@/components/ui/use-toast"
import { UserRound, FileText, Printer, Plus, Search, Filter } from "lucide-react"

export default function ReceptionPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("register")

  const handleRegisterPatient = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Patient Registered",
      description: "Patient has been successfully registered.",
    })
  }

  const handleGenerateReceipt = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Receipt Generated",
      description: "Receipt has been generated and is ready for printing.",
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reception</h1>
        <p className="text-muted-foreground">Manage patient registration and fee collection</p>
      </div>

      <Tabs defaultValue="register" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="register" className="flex items-center gap-2">
            <UserRound className="h-4 w-4" />
            <span>Register Patient</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Reports</span>
          </TabsTrigger>
          <TabsTrigger value="fees" className="flex items-center gap-2">
            <Printer className="h-4 w-4" />
            <span>Fee Receipt</span>
          </TabsTrigger>
        </TabsList>

        {/* Patient Registration Tab */}
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Patient Registration</CardTitle>
              <CardDescription>Register new patients and their partners/spouses</CardDescription>
            </CardHeader>
            <form onSubmit={handleRegisterPatient}>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="patientName">Full Name</Label>
                      <Input id="patientName" placeholder="Enter patient name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAadhar">Aadhar Number</Label>
                      <Input id="patientAadhar" placeholder="XXXX-XXXX-XXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientPhone">Phone Number</Label>
                      <Input id="patientPhone" placeholder="+91 XXXXX XXXXX" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientGender">Gender</Label>
                      <Select>
                        <SelectTrigger id="patientGender">
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAge">Age</Label>
                      <Input id="patientAge" type="number" placeholder="Enter age" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="patientAddress">Address</Label>
                      <Input id="patientAddress" placeholder="Enter address" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Partner/Spouse Information</h3>
                    <Button type="button" variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Partner
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partnerName">Full Name</Label>
                      <Input id="partnerName" placeholder="Enter partner name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnerAadhar">Aadhar Number</Label>
                      <Input id="partnerAadhar" placeholder="XXXX-XXXX-XXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="partnerPhone">Phone Number</Label>
                      <Input id="partnerPhone" placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select>
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spouse">Spouse</SelectItem>
                          <SelectItem value="partner">Partner</SelectItem>
                          <SelectItem value="relative">Relative</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Register Patient</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Patient Reports</CardTitle>
              <CardDescription>Manage and categorize patient reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search reports..." className="pl-8" />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </Button>
                  <Button size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Report</span>
                  </Button>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient ID</TableHead>
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
                      <TableCell>P-{1000 + i}</TableCell>
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
                          {i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Completed" : "In Progress"}
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

        {/* Fee Receipt Tab */}
        <TabsContent value="fees">
          <Card>
            <CardHeader>
              <CardTitle>Fee Receipt</CardTitle>
              <CardDescription>Generate and print fee receipts</CardDescription>
            </CardHeader>
            <form onSubmit={handleGenerateReceipt}>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="receiptPatientId">Patient ID</Label>
                    <Input id="receiptPatientId" placeholder="Enter patient ID" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptPatientName">Patient Name</Label>
                    <Input id="receiptPatientName" placeholder="Enter patient name" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptDate">Date</Label>
                    <Input
                      id="receiptDate"
                      type="date"
                      defaultValue={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="receiptType">Receipt Type</Label>
                    <Select>
                      <SelectTrigger id="receiptType">
                        <SelectValue placeholder="Select receipt type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="consultation">Consultation</SelectItem>
                        <SelectItem value="test">Medical Test</SelectItem>
                        <SelectItem value="procedure">Medical Procedure</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Fee Details</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Rate (₹)</TableHead>
                        <TableHead className="text-right">Amount (₹)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Input placeholder="Enter description" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue="1" min="1" />
                        </TableCell>
                        <TableCell>
                          <Input type="number" defaultValue="500" min="0" />
                        </TableCell>
                        <TableCell className="text-right">₹500.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">₹500.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">
                          Tax (18%)
                        </TableCell>
                        <TableCell className="text-right">₹90.00</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-bold">
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">₹590.00</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="card">Card</SelectItem>
                      <SelectItem value="upi">UPI</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button type="submit">Generate Receipt</Button>
                <Button type="button" variant="outline" className="flex items-center gap-2">
                  <Printer className="h-4 w-4" />
                  <span>Print Receipt</span>
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

