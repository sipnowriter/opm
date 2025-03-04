import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, ClipboardList, FileText, UserRound, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">Hexancare</h1>
          </div>
          <Link href="/dashboard">
            <Button>
              Login
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Outpatient Management System</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive solution for managing outpatient services, patient records, and medical reports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <UserRound className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Reception Module</CardTitle>
              <CardDescription>Patient registration and fee management</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-gray-600 space-y-2 mb-6 text-left">
                <li>• Patient registration</li>
                <li>• Partner/spouse details</li>
                <li>• Report categorization</li>
                <li>• Fee receipt generation</li>
              </ul>
              <Link href="/dashboard/reception">
                <Button variant="outline" className="w-full">
                  Access Module
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Specialist Module</CardTitle>
              <CardDescription>Report analysis and test recommendations</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-gray-600 space-y-2 mb-6 text-left">
                <li>• Check patient reports</li>
                <li>• Create doctor reports</li>
                <li>• Identify medical issues</li>
                <li>• Suggest additional tests</li>
              </ul>
              <Link href="/dashboard/specialist">
                <Button variant="outline" className="w-full">
                  Access Module
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <FileText className="w-12 h-12 mx-auto text-primary mb-2" />
              <CardTitle>Doctor Module</CardTitle>
              <CardDescription>Prescription management</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="text-gray-600 space-y-2 mb-6 text-left">
                <li>• Review patient history</li>
                <li>• Check specialist reports</li>
                <li>• Write prescriptions</li>
                <li>• Schedule follow-ups</li>
              </ul>
              <Link href="/dashboard/doctor">
                <Button variant="outline" className="w-full">
                  Access Module
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="bg-gray-50 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© 2024 Hexancare Outpatient Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

